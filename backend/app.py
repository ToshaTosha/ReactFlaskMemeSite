import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///blog.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = 'C:/test__react/FlaskReactMemes/backend/img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

db = SQLAlchemy(app)

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text())

    def __init__(self, description):
        self.description = description

@app.route("/get", methods = ['GET'])
def get_articles():
    session = db.session.connection()
    results = session.execute("select * from articles").mappings().all()
    row_as_dict = [dict(row) for row in results]
    return jsonify(row_as_dict)


@app.route("/add", methods = ['POST'])
def add_article():
    session = db.session.connection()
    description = request.json['description']
    results = session.execute("insert into articles values (NULL, :desc)", {'desc': description})

    return jsonify( {'description': description} )


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
