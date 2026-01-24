-- =========================================
-- Assignment 2 SQL File
-- Complete: Types, Tables, Sample Data, Task 1 CRUD Queries
-- =========================================

-- ==========================
-- Step 0: Drop tables/types if they exist (for rebuild)
-- ==========================
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TYPE IF EXISTS account_type;

-- ==========================
-- Step 1: Create ENUM Type
-- ==========================
CREATE TYPE account_type AS ENUM ('Client', 'Employee', 'Admin');

-- ==========================
-- Step 2: Create Tables
-- ==========================

-- Classification Table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL
);

-- Inventory Table
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(50),
    description TEXT,
    classification_id INT REFERENCES classification(classification_id),
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255)
);

-- Account Table
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    account_type account_type DEFAULT 'Client'
);

-- ==========================
-- Step 3: Insert Sample Data
-- ==========================

-- Insert classifications
INSERT INTO classification (classification_name)
VALUES 
('Sport'),
('Luxury'),
('Truck');

-- Insert inventory items
INSERT INTO inventory (make, model, description, classification_id, inv_image, inv_thumbnail)
VALUES
('GM', 'Hummer', 'A truck with small interiors', 3, '/images/hummer.png', '/images/hummer_thumb.png'),
('Ferrari', '488', 'A fast sports car', 1, '/images/ferrari.png', '/images/ferrari_thumb.png'),
('Lamborghini', 'Aventador', 'Luxury sports car', 2, '/images/lamborghini.png', '/images/lamborghini_thumb.png');

-- Insert accounts
INSERT INTO account (first_name, last_name, email, password, account_type)
VALUES
('Bruce', 'Wayne', 'bruce@wayneenterprises.com', 'Batm@n123', 'Client'),
('Clark', 'Kent', 'clark@dailyplanet.com', 'Sup3rman', 'Employee');

-- ==========================
-- Step 4: Task 1 CRUD Queries
-- ==========================

-- 1️⃣ Insert Tony Stark into the account table
INSERT INTO account (first_name, last_name, email, password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2️⃣ Update Tony Stark's account_type to 'Admin'
UPDATE account
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';

-- 3️⃣ Delete Tony Stark record
DELETE FROM account
WHERE email = 'tony@starkent.com';

-- 4️⃣ Update the "GM Hummer" description
UPDATE inventory
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';

-- 5️⃣ Select with INNER JOIN for items in "Sport" category
SELECT i.make, i.model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6️⃣ Update inv_image and inv_thumbnail paths to include "/vehicles/"
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
