from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import DataRequired

class BookForm(FlaskForm):
    title = StringField('Title')
    author = StringField('Author')
    genre = StringField('Genre')
    pages = IntegerField('Pages')
    date_finished = StringField('Date Finished')
    is_finished = BooleanField('Is Finished?')
    reflections = TextAreaField('Reflections')
    month = StringField('Month')
