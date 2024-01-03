"""empty message

Revision ID: fdfab7da10c3
Revises: 
Create Date: 2024-01-02 12:41:23.464999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fdfab7da10c3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('author', sa.String(length=255), nullable=False),
    sa.Column('genre', sa.String(length=255), nullable=False),
    sa.Column('pages', sa.Integer(), nullable=True),
    sa.Column('date_finished', sa.String(length=255), nullable=True),
    sa.Column('is_finished', sa.Boolean(), nullable=False),
    sa.Column('reflections', sa.String(length=5000), nullable=True),
    sa.Column('month', sa.String(), nullable=False),
    sa.Column('user', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('books')
    op.drop_table('users')
    # ### end Alembic commands ###