import datetime

from flask_sqlalchemy import SQLAlchemy, Model
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import relationship

db = SQLAlchemy()
ma = Marshmallow()


class ProblemMedia(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    ProblemMedia = db.Column(db.String(1000), nullable=False)
    ProblemId = db.Column(db.Integer, db.ForeignKey('problem.Id'), nullable=False)

    def __init__(self, ProblemId=None, ProblemMedia=None):
        self.ProblemId = ProblemId
        self.ProblemMedia = ProblemMedia

    def __repr__(self):
        return '<ProblemMedia %r>' % self.ProblemMedia


class ProblemMediaSchema(ma.ModelSchema):
    class Meta:
        model = ProblemMedia


class LikeDislike(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Like = db.Column(db.Boolean, nullable=False)
    Problem = db.Column(db.Integer, db.ForeignKey('problem.Id'), nullable=False)
    User = db.Column(db.Integer, db.ForeignKey('user.Id'), nullable=False)

    def __init__(self, Like=False, LikeUser=None):
        self.Like = Like
        self.LikeUser = LikeUser

    def __repr__(self):
        return '<Liked %r>' % self.Like


class LikeDislikeSchema(ma.ModelSchema):
    class Meta:
        model = LikeDislike


class ProblemSolution(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Solution = db.Column(db.Text, nullable=False)
    Problem = db.Column(db.Integer, db.ForeignKey('problem.Id'))
    User = db.Column(db.Integer, db.ForeignKey('user.Id'))

    def __init__(self, Solution=None):
        self.Solution = Solution


class ProblemSolutionSchema(ma.ModelSchema):
    class Meta:
        model = ProblemSolution


class Comments(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Comment = db.Column(db.Text)
    User = db.Column(db.Integer, db.ForeignKey('user.Id'))
    Problem = db.Column(db.Integer, db.ForeignKey('problem.Id'))


class Problem(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    ProblemTitle = db.Column(db.String(500), nullable=False)
    ProblemDescription = db.Column(db.Text, nullable=True)
    ProblemType = db.Column(db.String(250), nullable=False)
    ProblemCity = db.Column(db.String(500), nullable=False)
    ProblemState = db.Column(db.String(500), nullable=False)
    ProblemZip = db.Column(db.Integer, nullable=False)
    TwitterHandles = db.Column(db.Text)
    TargetEmails = db.Column(db.Text)
    ListingUser = db.Column(db.Integer, db.ForeignKey('user.Id'), nullable=False)
    Media = relationship('ProblemMedia', backref='problem', lazy=True)
    Likes = db.relationship('LikeDislike', backref='problem', lazy=True)
    Solutions = db.relationship('ProblemSolution', backref='problem', lazy=True)
    Comments = db.relationship('Comments', backref='problem', lazy=True)

    def __init__(self, ProblemTitle=None, ProblemDescription=None, ProblemType=None, ProblemCity=None, ProblemState=None, ProblemZip=None,
                 TwitterHandles=None, TargetEmails=None, ListingUser=None):
        self.ProblemTitle = ProblemTitle,
        self.ListingDescription = ProblemDescription
        self.ProblemType = ProblemType
        self.ProblemCity = ProblemCity
        self.ProblemState = ProblemState
        self.ProblemZip = ProblemZip
        self.TwitterHandles = TwitterHandles
        self.TargetEmails = TargetEmails
        self.ListingUser = ListingUser

    def __repr__(self):
        return '<Problem %r>' % self.ProblemTitle


class ProblemSchema(ma.ModelSchema):
    class Meta:
        model = Problem


class User(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(250), nullable=False)
    LastName = db.Column(db.String(250), nullable=False)
    Email = db.Column(db.String(250), unique=True, nullable=False)
    Password = db.Column(db.String(250), nullable=False)
    Agreement = db.Column(db.Boolean, nullable=False)
    DateCreated = db.Column(db.DateTime, default=datetime.date.today(), nullable=False)
    Comments = db.relationship('Comments', backref='user', lazy=True)
    Problems = db.relationship('Problem', backref='user', lazy=True)
    Solutions = db.relationship('ProblemSolution', backref='user', lazy=True)
    Likes = db.relationship('LikeDislike', backref='user', lazy=True)

    def __init__(self, FirstName=None, LastName=None, Email=None, Password=None, Agreement=None, DateCreated=None):
        self.FirstName = FirstName
        self.LastName = LastName
        self.Email = Email
        self.Password = Password
        self.Agreement = Agreement
        self.DateCreated = DateCreated

    def __repr__(self):
        return '<User %r>' % self.FirstName


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
