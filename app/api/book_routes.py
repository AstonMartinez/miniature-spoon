from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.book import Book
from app.forms.book_form import BookForm
from app.models import db
from sqlalchemy import and_

book_routes = Blueprint('books', __name__)

@book_routes.route('/stats/<int:userId>', methods=["GET"])
def get_user_stats(userId):
    result = {
        'pages': 0,
        'numBooks': 0,
        'byMonth': { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 }
    }
    books = Book.query.filter(and_(Book.user == userId, Book.is_finished == True))
    if books:
        for book in books:
            result['numBooks'] += 1
            result['pages'] += book.pages
            result['byMonth'][book.month] += 1

    return result


@book_routes.route('/<int:userID>', methods=["GET"])
def get_user_books(userID):
    """
    Returns all books a user has added to their log.
    """
    result = {}

    books = Book.query.filter(Book.user == userID)
    if books:
        for book in books:
            result[book.id] = book.to_dict()
    return result

@book_routes.route('/<int:id>', methods=["GET"])
def get_one_book(id):
    """
    Returns a single book.
    """
    book = Book.query.get(id)
    if book:
        return book.to_dict()
    return { 'error': 'Book not found.' }

@book_routes.route('/new', methods=["POST"])
def add_user_book():
    """
    Creates and returns a new book.
    """
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = request.json['title']
        author = request.json['author']
        genre = request.json['genre']
        pages = request.json['pages']
        date_finished = request.json['date_finished']
        is_finished = request.json['is_finished']
        reflections = request.json['reflections']
        month = request.json['month']
        user = current_user.id

        new_book = Book(
            title=title,
            author=author,
            genre=genre,
            pages=pages,
            date_finished=date_finished,
            is_finished=is_finished,
            reflections=reflections,
            month=month,
            user=user
        )

        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict()
    return { 'error': 'An error occured while creating new book' }

@book_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_book(id):
    """
    Deletes and returns a book.
    """
    book = Book.query.get(id)
    if book:
        book_dict = book.to_dict()
        db.session.delete(book)
        db.session.commit()
        return book_dict
    return { 'error': 'Book not found.' }

@book_routes.route('/<int:id>/update', methods=["PUT"])
def update_book(id):
    """
    Updates and returns a book.
    """
    book = Book.query.get(id)

    if book:
        book.title = request.json['title']
        book.author = request.json['author']
        book.genre = request.json['genre']
        book.pages = request.json['pages']
        book.date_finished = request.json['date_finished']
        book.reflections = request.json['reflections']
        book.month = request.json['month']

        if request.json['is_finished'] == "false":
            book.is_finished = False
        else:
            book.is_finished = True

        db.session.commit()
        return book.to_dict()
    return { 'error': 'Book not found.' }
