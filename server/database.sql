CREATE DATABASE jssweb_database;

-- \c into jssweb_database;

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    event_title varchar(100),
    event_type varchar(50),
    event_descryption text,
    event_date date,
    event_link text,
    event_img text
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
SET subclub_name = new test name
SET subclub_url = new url name
SET subclub_desc = new desc
SET subclub_img = new image
WHERE subclub_img = the weird link id


