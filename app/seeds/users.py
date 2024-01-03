from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.book import Book


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    test_book = Book(
        title='Test book',
        author='Test Author',
        genre='Fantasy',
        pages=500,
        is_finished=True,
        reflections='Great book',
        month='January',
        user=1
    )

    db.session.add(demo)
    db.session.commit()

    db.session.add(test_book)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
