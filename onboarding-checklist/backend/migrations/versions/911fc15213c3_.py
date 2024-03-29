"""empty message

Revision ID: 911fc15213c3
Revises: ad9662cefec2
Create Date: 2023-03-17 14:38:15.938707

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '911fc15213c3'
down_revision = 'ad9662cefec2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tasklist_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_note_tasklist_id_taskList'), 'taskList', ['tasklist_id'], ['id'])

    with op.batch_alter_table('taskList', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.String(length=32), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_taskList_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('taskList', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_taskList_user_id_users'), type_='foreignkey')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_note_tasklist_id_taskList'), type_='foreignkey')
        batch_op.drop_column('tasklist_id')

    # ### end Alembic commands ###
