CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email, role)
);

CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    rating NUMERIC(2,1) NOT NULL,
    description TEXT NOT NULL,
    restaurant VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    best_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(60) PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    created_at VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(60) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO users (username, email, password_hash, role)
VALUES
('admin', 'admin@frostedbites.com', 'scrypt:32768:8:1$ldQEKpHKVaL3UpF5$c39d84c372f4ecfa543f68c01e830a8fda0ebf4fe7e12487dced159838603da66720ed13b6d3b31c5b479bbd11e534e6ea2f3c1fb111b1f1bb1c6337c390c058', 'admin'),
('demo_customer', 'customer@frostedbites.com', 'scrypt:32768:8:1$N3farYCN3Hh55FbZ$11c2564f10e053cd6f2e1a72afd6cc3c7c4c8b0ae0456d7f1eb1914e836a4ea08d7078d36e356c007312d798550cc94e165a7460115fd1bf6643e3bdfc0ed5ad', 'customer')
ON CONFLICT (email, role) DO NOTHING;

INSERT INTO menu_items (id, name, category, price, rating, description, restaurant, address, image, best_seller)
VALUES
('dish-1', 'Black Truffle Burrata Tartine', 'Sandwich', 545, 4.9, 'Artisan sourdough layered with burrata, truffle cream, basil oil, and peppered greens.', 'Maison Crave', 'Bandra West, Mumbai', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-2', 'Ember Smoke Luxe Burger', 'Burger', 499, 4.8, 'Flame-grilled patty, caramelized onions, smoked cheddar, and house aioli on a brioche bun.', 'Coal & Crumb', 'Indiranagar, Bengaluru', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-3', 'Velvet Fire Pizza', 'Pizza', 625, 4.9, 'Wood-fired pizza with roasted peppers, buffalo mozzarella, confit garlic, and chili honey.', 'Pomodoro Atelier', 'GK II, Delhi', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-4', 'Citrus Tonic Cooler', 'Drinks', 215, 4.6, 'Sparkling citrus cooler with basil seeds, yuzu syrup, and fresh mint over ice.', 'Velvet Sip', 'Jubilee Hills, Hyderabad', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80', FALSE),
('dish-5', 'Midnight Cocoa Dome', 'Dessert', 325, 4.7, 'Glossy dark chocolate mousse dome with praline crunch and warm ganache center.', 'Noir Patisserie', 'Koregaon Park, Pune', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80', FALSE),
('dish-6', 'Smoked Herb Chicken Bowl', 'All Day', 575, 4.8, 'Herb chicken, charred vegetables, saffron rice, and creamy pepper drizzle.', 'Table 82', 'Anna Nagar, Chennai', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-7', 'Royal Paneer Tikka Platter', 'Indian', 459, 4.8, 'Chargrilled paneer tikka served with mint chutney, onion salad, and saffron-spiced glaze.', 'Zafran Courtyard', 'Andheri East, Mumbai', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-8', 'Lucknowi Galouti Sliders', 'Indian', 525, 4.7, 'Soft saffron buns filled with melt-in-the-mouth galouti kebabs and smoked onion relish.', 'Nawab Street Social', 'Hazratganj, Lucknow', 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-9', 'Butter Chicken Kulcha Melt', 'Indian', 485, 4.9, 'Creamy butter chicken tucked inside a flaky stuffed kulcha with charred capsicum and herbs.', 'Punjab Press Kitchen', 'Rajouri Garden, Delhi', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-10', 'Hyderabadi Dum Biryani', 'Indian', 539, 4.9, 'Long-grain fragrant biryani layered with marinated chicken, caramelized onions, and raita.', 'Deccan Copper Pot', 'Banjara Hills, Hyderabad', 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80', TRUE),
('dish-11', 'Masala Chai Tres Leches', 'Dessert', 295, 4.6, 'A soft fusion dessert infused with cardamom chai, cream, and toasted pistachios.', 'Sugar Bazaar', 'Powai, Mumbai', 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=900&q=80', FALSE),
('dish-12', 'Rose Falooda Fizz', 'Drinks', 245, 4.7, 'A chilled rose milk cooler finished with basil seeds, vermicelli, and vanilla espuma.', 'Sherbet Stories', 'T. Nagar, Chennai', 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80', FALSE)
ON CONFLICT (id) DO NOTHING;
