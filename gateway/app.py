import os
from pathlib import Path

import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://frosted_admin:frosted_secure_pass@localhost:5432/frostedbites")

app = Flask(__name__, static_folder=str(PROJECT_ROOT), static_url_path="")
CORS(app)


def get_connection():
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)


def ensure_database_initialized():
    sql_path = PROJECT_ROOT / "db" / "init.sql"
    sql = sql_path.read_text(encoding="utf-8")
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql)
        conn.commit()


def serialize_user(row):
    return {"username": row["username"], "email": row["email"], "role": row["role"]}


def serialize_menu_item(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "category": row["category"],
        "price": float(row["price"]),
        "rating": float(row["rating"]),
        "description": row["description"],
        "restaurant": row["restaurant"],
        "address": row["address"],
        "image": row["image"],
        "bestSeller": row["best_seller"],
    }


def serialize_order(row, items):
    return {
        "id": row["id"],
        "userEmail": row["user_email"],
        "username": row["username"],
        "status": row["status"],
        "total": float(row["total"]),
        "createdAt": row["created_at"],
        "items": [{"name": item["item_name"], "quantity": item["quantity"]} for item in items],
    }


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "frosted-bites"})


@app.post("/api/auth/register")
def register():
    payload = request.get_json(force=True)
    email = payload.get("email", "").strip().lower()
    role = payload.get("role", "customer").strip().lower()
    username = payload.get("username", "").strip()
    password = payload.get("password", "").strip()

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM users WHERE email = %s AND role = %s", (email, role))
            if cur.fetchone():
                return jsonify({"error": "User already exists"}), 409
            cur.execute(
                """
                INSERT INTO users (username, email, password_hash, role)
                VALUES (%s, %s, %s, %s)
                RETURNING username, email, role
                """,
                (username, email, generate_password_hash(password), role),
            )
            user = cur.fetchone()
        conn.commit()
    return jsonify({"message": "Account created", "user": serialize_user(user)}), 201


@app.post("/api/auth/login")
def login():
    payload = request.get_json(force=True)
    email = payload.get("email", "").strip().lower()
    role = payload.get("role", "customer").strip().lower()
    username = payload.get("username", "").strip()
    password = payload.get("password", "").strip()

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT username, email, role, password_hash
                FROM users
                WHERE email = %s AND role = %s AND username = %s
                """,
                (email, role, username),
            )
            user = cur.fetchone()

    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Invalid credentials"}), 401
    return jsonify({"message": "Login successful", "user": serialize_user(user)})


@app.get("/api/menu/items")
def list_menu_items():
    category = request.args.get("category")
    with get_connection() as conn:
        with conn.cursor() as cur:
            if category and category.lower() != "all":
                cur.execute("SELECT * FROM menu_items WHERE LOWER(category) = LOWER(%s) ORDER BY created_at DESC", (category,))
            else:
                cur.execute("SELECT * FROM menu_items ORDER BY created_at DESC")
            items = cur.fetchall()
    return jsonify([serialize_menu_item(item) for item in items])


@app.get("/api/menu/categories")
def list_categories():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT DISTINCT category FROM menu_items ORDER BY category ASC")
            rows = cur.fetchall()
    return jsonify([row["category"] for row in rows])


@app.post("/api/admin/menu")
def admin_add_menu_item():
    payload = request.get_json(force=True)
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO menu_items (id, name, category, price, rating, description, restaurant, address, image, best_seller)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
                """,
                (
                    payload["id"],
                    payload["name"],
                    payload["category"],
                    payload["price"],
                    payload["rating"],
                    payload["description"],
                    payload["restaurant"],
                    payload["address"],
                    payload["image"],
                    payload.get("bestSeller", False),
                ),
            )
            item = cur.fetchone()
        conn.commit()
    return jsonify({"message": "Item added", "item": serialize_menu_item(item)}), 201


@app.delete("/api/admin/menu/<item_id>")
def admin_delete_menu_item(item_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM menu_items WHERE id = %s", (item_id,))
        conn.commit()
    return jsonify({"message": "Item deleted", "deletedId": item_id})


@app.get("/api/orders/orders")
def list_orders():
    user_email = request.args.get("userEmail")
    with get_connection() as conn:
        with conn.cursor() as cur:
            if user_email:
                cur.execute("SELECT * FROM orders WHERE user_email = %s ORDER BY created_at DESC", (user_email,))
            else:
                cur.execute("SELECT * FROM orders ORDER BY created_at DESC")
            orders = cur.fetchall()
            result = []
            for order in orders:
                cur.execute("SELECT item_name, quantity FROM order_items WHERE order_id = %s ORDER BY id ASC", (order["id"],))
                items = cur.fetchall()
                result.append(serialize_order(order, items))
    return jsonify(result)


@app.post("/api/orders/orders")
def create_order():
    payload = request.get_json(force=True)
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO orders (id, user_email, username, status, total, created_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (
                    payload["id"],
                    payload["userEmail"],
                    payload["username"],
                    payload["status"],
                    payload["total"],
                    payload["createdAt"],
                ),
            )
            for item in payload.get("items", []):
                cur.execute(
                    "INSERT INTO order_items (order_id, item_name, quantity) VALUES (%s, %s, %s)",
                    (payload["id"], item["name"], item["quantity"]),
                )
        conn.commit()
    return jsonify({"message": "Order placed", "order": payload}), 201


@app.patch("/api/admin/orders/<order_id>")
def admin_update_order(order_id):
    payload = request.get_json(force=True)
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("UPDATE orders SET status = %s WHERE id = %s RETURNING *", (payload.get("status"), order_id))
            order = cur.fetchone()
            if not order:
                return jsonify({"error": "Order not found"}), 404
            cur.execute("SELECT item_name, quantity FROM order_items WHERE order_id = %s ORDER BY id ASC", (order_id,))
            items = cur.fetchall()
        conn.commit()
    return jsonify({"message": "Order updated", "order": serialize_order(order, items)})


@app.get("/")
def serve_home():
    return send_from_directory(PROJECT_ROOT, "index.html")


@app.get("/<path:path>")
def serve_assets(path):
    target = PROJECT_ROOT / path
    if target.exists() and target.is_file():
        return send_from_directory(PROJECT_ROOT, path)
    return send_from_directory(PROJECT_ROOT, "index.html")


if __name__ == "__main__":
    ensure_database_initialized()
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")), debug=False)
