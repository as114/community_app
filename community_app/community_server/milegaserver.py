import os
import time

from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.utils import secure_filename
from utils.config import generate_key

from instance.database_instance import community_db
from database.database_models import db, ma, User, UserSchema, ProblemSchema, Problem, ProblemMedia

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = community_db['db_uri']
app.config['SQLALCHEMY_ECHO'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOADED_PHOTOS_DEST'] = os.path.basename('assets') + '/images'


CORS(app, resources={r"/*": {"origins": "*"}})
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.secret_key = generate_key()

with app.app_context():
    db.init_app(app)
    ma.init_app(app)
    db.create_all()


@app.route("/")
def get_all_problems():
    problems = ProblemSchema(many=True)
    all_problems = problems.dumps(db.Problems.query.all())
    return jsonify(all_problems), 200


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json(silent=True)
        print(data)
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        password = data.get('password')
        agreement = data.get('agreement')
        user = User(FirstName=first_name, LastName=last_name, Email=email, Password=generate_password_hash(password),
                    Agreement=agreement)
        print (user.Email)
        try:
            check_user = User.query.filter_by(Email=email).first()
            if check_user is not None:
                return jsonify({'data': 'exists'}), 200
            else:
                db.session.add(user)
                db.session.commit()
                return jsonify({'data': 'success'}), 200
        except SQLAlchemyError:
            return jsonify({'error': 'Database error while adding new user.'}), 500


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json(silent=True)
        user = User.query.filter_by(Email=data.get('username')).first()
        try:
            if user is None:
                return jsonify({'valid': 'does not exist'}), 200
            if user is not None and check_password_hash(user.Password, data.get('password')):
                return jsonify({'valid': 1,
                                'userName': user.FirstName + " " + user.LastName,
                                'userEmail': user.Email,
                                'token': app.secret_key
                                }), 200
            if user is not None and not check_password_hash(user.Password, data.get('password')):
                return jsonify({'valid': 0}), 200
        except SQLAlchemyError:
            print (SQLAlchemyError.message)
            return jsonify({'error': 'Database error while adding new user.'}), 500


@app.route("/new_problem", methods=['GET', 'POST'])
def add_new_problem():
    if request.method == 'POST':
        title = request.form['requestTitle']
        description = request.form['description']
        problem_type = request.form['problemType']
        city = request.form['city']
        state = request.form['state']
        zip = request.form['zip']
        twitter_handles = request.form['twitterHandles']
        target_emails = request.form['targetEmails']
        listing_media = request.files.getlist("file[]")
    try:
        problem = Problem(ProblemTitle=title, ProblemDescription=description, ProblemType=problem_type, ProblemCity=city,
                         ProblemState=state, ProblemZip=zip, TwitterHandles=twitter_handles, target_emails=target_emails)

        db.session.add(problem)
        db.session.commit()
        problem_id = problem.Id
        if len(listing_media) > 0:
            for image in listing_media:
                image_name = secure_filename(image.filename)
                image_path = os.path.join(app.config['UPLOADED_PHOTOS_DEST'],
                              (str(round(time.time() * 1000)) + "_" + image_name))
                image.save(image_path)
                image_url = image_path
                problem_media = ProblemMedia(ProblemId=problem_id, ProblemMedia=image_url)
                db.session.add(problem_media)
                db.session.commit()
        return jsonify({'add_new': 1}), 200
    except SQLAlchemyError:
        return jsonify({'add_new': 0}), 500


if __name__ == "__main__":
    app.run(debug=True)
