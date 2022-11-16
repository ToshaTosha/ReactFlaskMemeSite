import os
import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///blog.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = 'img/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text())
    url = db.Column(db.Text())
    likes = db.Column(db.Integer, default = 0)
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, description, url):
        self.description = description
        self.url = url

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'description', 'url', 'likes', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

# Инициализация базы данных
# Даже если blog.db был удалён, это восстановит его
with app.app_context():
    db.create_all()

@app.route("/get", methods = ['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)
    #return jsonify({"Hello":"World"})


@app.route("/add", methods = ['POST'])
def add_article():
    description = request.form['description']

    url = None

    if 'file' in request.files:
        file = request.files['file']

        if file.filename.split(".")[-1] not in ALLOWED_EXTENSIONS:
            return "Bad extension", 500

        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    articles = Articles(description, url)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route("/like/<id>/", methods = ['PUT']) 
def like_article(id):
    article = Articles.query.get(id)
    
    article.likes = article.likes + 1
    
    db.session.commit()
    return article_schema.jsonify(article)


if __name__ == "__main__":
    app.run(debug=True)
