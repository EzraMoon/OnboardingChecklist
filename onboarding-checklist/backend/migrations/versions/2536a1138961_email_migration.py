"""Email migration

Revision ID: 2536a1138961
Revises: a7e5862a1a30
Create Date: 2023-03-07 10:30:22.552862

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2536a1138961'
down_revision = 'a7e5862a1a30'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(length=345), nullable=True))
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.VARCHAR(length=345), nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('email')

    # ### end Alembic commands ###
