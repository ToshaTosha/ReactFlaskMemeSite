import os
import datetime
from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SESSION_TYPE'] = 'filesystem'

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///blog.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = 'img/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
server_session = Session(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text())
    url = db.Column(db.Text())
    likes = db.Column(db.Integer, default = 0)
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, description, url):
        self.description = description
        self.url = url

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text(), nullable=False)

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'description', 'url', 'likes', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

# Инициализация базы данных
# Даже если blog.db был удалён, это восстановит его
with app.app_context():
    db.create_all()

@app.route("/@me")
def get_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error":"Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first() 

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/register", methods = ['POST'])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exist = User.query.filter_by(email=email).first() is not None

    if user_exist:
        return jsonify({"error":"This user already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods = ['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first() 

    if user is None:
        return jsonify({"error":"Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":"Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/get", methods = ['GET'])
def get_articles():
    all_articles = Articles.query.order_by( Articles.id.desc() ).limit(20).all()
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

        path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(path)

        url = path

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
