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
app.config["UPLOAD_FOLDER"] = 'C:/test__react/FlaskReactMemes/backend/img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text())
    likes = db.Column(db.Integer, default = 0)
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, description):
        self.description = description

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'description', 'likes', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

@app.route("/get", methods = ['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)
    #return jsonify({"Hello":"World"})


@app.route("/add", methods = ['POST'])
def add_article():
    description = request.json['description']

    articles = Articles(description)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route("/like/<id>/", methods = ['PUT']) 
def like_article(id):
    article = Articles.query.get(id)
    
    article.likes = article.likes + 1
    
    db.session.commit()
    return article_schema.jsonify(article)


@app.route("/upload", methods = ['POST'])
def add_image():
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    #articles = Articles(description)
    #db.session.add(articles)
    #db.session.commit()
    return "OK"

if __name__ == "__main__":
    app.run(debug=True)
