import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.product import db
from src.routes.user import user_bp
from src.routes.barcode import barcode_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(barcode_bp, url_prefix='/api/barcode')

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize database and seed sample data
with app.app_context():
    db.create_all()
    
    # Seed sample products if none exist
    from src.models.product import Product
    if Product.query.count() == 0:
        sample_products = [
            Product(
                name="Mint Blossom Honey",
                price=25.0,
                origin="Al Dhafra Apiary",
                harvest_season="Spring 2024",
                quality="Organic",
                description="Refreshing minty flavor with delicate floral notes. Perfect for tea and desserts.",
                image_url="/src/assets/anNLvZ16TeG7.jpg",
                in_stock=True
            ),
            Product(
                name="Acacia Honey",
                price=30.0,
                origin="Bee Farm #5",
                harvest_season="Summer 2024",
                quality="Grade A",
                description="Delicate, lightly sweet taste with subtle floral undertones.",
                image_url="/src/assets/D5ZGzxW0P3i3.jpg",
                in_stock=True
            ),
            Product(
                name="Raw Honeycomb",
                price=40.0,
                origin="Al Dhafra Apiary",
                harvest_season="Spring 2024",
                quality="Premium",
                description="Rich floral aroma with natural caramel notes. Straight from the hive.",
                image_url="/src/assets/UmwNcmqldblm.jpg",
                in_stock=True
            )
        ]
        
        for product in sample_products:
            db.session.add(product)
        db.session.commit()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
