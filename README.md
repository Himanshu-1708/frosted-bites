# Frosted Bites

Frosted Bites is a luxury food ordering and delivery mini project designed for a cloud architecture and microservices submission. It includes:

- A premium frontend with customer and admin flows
- A Python Flask API gateway
- Independent microservices for auth, menu, orders, and admin operations
- PostgreSQL database integration
- Docker Compose setup for local cloud-style deployment
- Report-ready documentation mapped to the lab manual

## Project structure

- `index.html`, `menu.html`, `auth.html`, `cart.html`, `payment.html`, `profile.html`, `admin.html`: frontend pages
- `styles.css`, `app.js`: shared frontend styling and behavior
- `db/`: PostgreSQL schema and seed data
- `gateway/`: API gateway and static app server
- `services/auth-service/`: registration and login service
- `services/menu-service/`: menu catalog service
- `services/order-service/`: order creation and status tracking
- `services/admin-service/`: admin orchestration service
- `docs/`: architecture, deployment, and report support

## Recommended architecture for your mini project

1. Frontend served through the gateway
2. API gateway routes requests to microservices
3. Independent services handle auth, menu, order, and admin tasks
4. PostgreSQL stores users, menu items, orders, and order line items
5. Docker containers simulate cloud deployment

## Required downloads

You only need these to run the full project locally:

1. Docker Desktop
2. Git
3. A browser

You do not need Node.js or a separate PostgreSQL install because Docker handles both the services and the database.

## Quick start

1. Install Docker Desktop
2. Open this folder in terminal
3. Run `docker compose up --build`
4. Open `http://localhost:8000`

If you want to reset the seeded database, run `docker compose down -v` and then start the stack again.

## Running services

- Frontend and gateway: `http://localhost:8000`
- Auth service: `http://localhost:5001`
- Menu service: `http://localhost:5002`
- Order service: `http://localhost:5003`
- Admin service: `http://localhost:5004`
- PostgreSQL: `localhost:5432`

## Default admin login

- Username: `admin`
- Email: `admin@frostedbites.com`
- Password: `admin123`

## Demo customer login

- Username: `demo_customer`
- Email: `customer@frostedbites.com`
- Password: `customer123`

## Report help

Use these docs while writing your submission:

- `docs/architecture.md`
- `docs/report-template.md`
- `docs/deployment-notes.md`
