"""Test

Revision ID: ad9662cefec2
Revises: c366ad02ffdb
Create Date: 2023-03-17 14:02:51.718542

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ad9662cefec2'
down_revision = 'c366ad02ffdb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_note_id'), ['id'])
        #batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('list_id')

    with op.batch_alter_table('taskList', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_taskList_id'), ['id'])
        #batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('author')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_users_id'), ['id'])
        batch_op.create_unique_constraint(batch_op.f('uq_users_username'), ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_users_username'), type_='unique')
        batch_op.drop_constraint(batch_op.f('uq_users_id'), type_='unique')

    with op.batch_alter_table('taskList', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author', sa.VARCHAR(length=32), nullable=True))
        #batch_op.create_foreign_key(None, 'users', ['author'], ['id'])
        batch_op.drop_constraint(batch_op.f('uq_taskList_id'), type_='unique')

    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.add_column(sa.Column('list_id', sa.INTEGER(), nullable=True))
        #batch_op.create_foreign_key(None, 'taskList', ['list_id'], ['id'])
        batch_op.drop_constraint(batch_op.f('uq_note_id'), type_='unique')

    # ### end Alembic commands ###
