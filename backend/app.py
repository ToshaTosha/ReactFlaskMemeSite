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

    def __init__(self, description):
        self.description = description

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('add', 'description')

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


if __name__ == "__main__":
    app.run(debug=True)
