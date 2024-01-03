from .db import db, environment, SCHEMA, add_prefix_for_prod

class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    pages = db.Column(db.Integer)
    date_finished = db.Column(db.String(255))
    is_finished = db.Column(db.Boolean, nullable=False)
    reflections = db.Column(db.String(5000))
    month = db.Column(db.String, nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'genre': self.genre,
            'pages': self.pages,
            'date_finished': self.date_finished,
            'is_finished': self.is_finished,
            'reflections': self.reflections,
            'month': self.month,
            'user': self.user
        }
