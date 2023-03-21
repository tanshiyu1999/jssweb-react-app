CREATE DATABASE jssweb_database;

-- \c into jssweb_database;

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    event_title varchar(100),
    event_type varchar(50),
    event_description text,
    event_date date,
    event_link text,
    event_img text
);

CREATE TABLE logistic (
    logistic_id SERIAL PRIMARY KEY,
    logistic_name VARCHAR(100),
    logistic_type VARCHAR(50),
    logistic_description TEXT,
    logistic_location TEXT,
    logistic_quantity INT,
    logistic_status TEXT,
    logistic_borrowed_by VARCHAR(100),
    logistic_borrow_from DATE,
    logistic_borrow_to DATE,
    logistic_img TEXT
);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
 

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE subclubs (
    subclub_id SERIAL PRIMARY KEY,
    subclub_name VARCHAR(255) NOT NULL,
    subclub_url VARCHAR(255),
    subclub_desc TEXT,
    subclub_img TEXT
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henry@gmail.com', 'henry123');

DELETE FROM subclubs WHERE subclub_name = 'Test';

-- Updating Table
UPDATE subclubs 
SET subclub_name = new test name,
subclub_url = new url name,
subclub_desc = new desc,
subclub_img = new image,
WHERE subclub_img = the weird link id


