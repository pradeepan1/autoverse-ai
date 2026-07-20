"""Add search_logs and car variants

Revision ID: 986ffd3896c1
Revises: b46e049969f5
Create Date: 2026-07-20 11:56:10.474225

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '986ffd3896c1'
down_revision: Union[str, Sequence[str], None] = 'b46e049969f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add variant and seating_capacity to cars
    op.add_column('cars', sa.Column('variant', sa.String(length=100), nullable=True))
    op.add_column('cars', sa.Column('seating_capacity', sa.Integer(), nullable=True))
    
    # Create search_logs table
    op.create_table('search_logs',
    sa.Column('query', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.String(length=36), nullable=True),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_search_logs_id'), 'search_logs', ['id'], unique=False)
    op.create_index(op.f('ix_search_logs_query'), 'search_logs', ['query'], unique=False)
    op.create_index(op.f('ix_search_logs_user_id'), 'search_logs', ['user_id'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f('ix_search_logs_user_id'), table_name='search_logs')
    op.drop_index(op.f('ix_search_logs_query'), table_name='search_logs')
    op.drop_index(op.f('ix_search_logs_id'), table_name='search_logs')
    op.drop_table('search_logs')
    op.drop_column('cars', 'seating_capacity')
    op.drop_column('cars', 'variant')
