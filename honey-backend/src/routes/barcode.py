from flask import Blueprint, request, jsonify, send_file
from ..models.product import Product, db
import barcode
from barcode.writer import ImageWriter
import qrcode
import uuid
import os

barcode_bp = Blueprint("barcode", __name__)

# Directory to save generated barcodes and QR codes
CODE_DIR = os.path.join(os.path.dirname(__file__), "..", "static", "codes")
if not os.path.exists(CODE_DIR):
    os.makedirs(CODE_DIR)

@barcode_bp.route("/generate", methods=["POST"])
def generate_barcode():
    data = request.get_json()
    product_id = data.get("product_id")

    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Generate a unique barcode value
    barcode_value = str(uuid.uuid4())
    product.barcode = barcode_value
    db.session.commit()

    # Generate barcode image
    ean = barcode.get("ean13", barcode_value[:12], writer=ImageWriter())
    barcode_path = os.path.join(CODE_DIR, f"{barcode_value}_barcode.png")
    ean.write(barcode_path)

    # Generate QR code containing verification URL
    verification_url = f"https://beesure.com/verify?barcode={barcode_value}"
    qr_img = qrcode.make(verification_url)
    qr_path = os.path.join(CODE_DIR, f"{barcode_value}_qr.png")
    qr_img.save(qr_path)

    return jsonify({
        "message": "Barcode and QR code generated successfully",
        "barcode_value": barcode_value,
        "barcode_image_url": f"/static/codes/{barcode_value}_barcode.png",
        "qr_code_image_url": f"/static/codes/{barcode_value}_qr.png",
        "verification_url": verification_url
    }), 201

@barcode_bp.route("/verify", methods=["GET"])
def verify_barcode():
    barcode_value = request.args.get("barcode")

    if not barcode_value:
        return jsonify({"error": "Barcode is required"}), 400

    product = Product.query.filter_by(barcode=barcode_value).first()

    if not product:
        return jsonify({"error": "Invalid or unregistered barcode"}), 404

    return jsonify({
        "success": True,
        "product": {
            "id": product.id,
            "name": product.name,
            "origin": product.origin,
            "harvest_season": product.harvest_season,
            "quality": product.quality,
            "description": product.description
        }
    }), 200

@barcode_bp.route("/qr/<barcode_value>")
def get_qr_code(barcode_value):
    qr_path = os.path.join(CODE_DIR, f"{barcode_value}_qr.png")
    if os.path.exists(qr_path):
        return send_file(qr_path, mimetype=\"image/png\")
    return jsonify({"error": "QR code not found"}), 404


