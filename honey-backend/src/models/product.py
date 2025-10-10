from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    harvest_season = db.Column(db.String(50), nullable=False)
    quality = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(200), nullable=True)
    barcode = db.Column(db.String(100), unique=True, nullable=True)
    nft_token_id = db.Column(db.String(100), nullable=True)
    in_stock = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'origin': self.origin,
            'harvest_season': self.harvest_season,
            'quality': self.quality,
            'description': self.description,
            'image_url': self.image_url,
            'barcode': self.barcode,
            'nft_token_id': self.nft_token_id,
            'in_stock': self.in_stock,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Certificate(db.Model):
    __tablename__ = 'certificates'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    certificate_id = db.Column(db.String(100), unique=True, nullable=False)
    batch_number = db.Column(db.String(50), nullable=False)
    harvest_date = db.Column(db.Date, nullable=False)
    expiry_date = db.Column(db.Date, nullable=True)
    quality_tests = db.Column(db.JSON, nullable=True)  # Store test results as JSON
    beekeeper_signature = db.Column(db.String(200), nullable=True)
    blockchain_hash = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    product = db.relationship('Product', backref=db.backref('certificates', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'certificate_id': self.certificate_id,
            'batch_number': self.batch_number,
            'harvest_date': self.harvest_date.isoformat() if self.harvest_date else None,
            'expiry_date': self.expiry_date.isoformat() if self.expiry_date else None,
            'quality_tests': self.quality_tests,
            'beekeeper_signature': self.beekeeper_signature,
            'blockchain_hash': self.blockchain_hash,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    wallet_address = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'wallet_address': self.wallet_address,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

