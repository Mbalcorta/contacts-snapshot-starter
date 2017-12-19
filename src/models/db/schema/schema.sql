DROP TABLE IF EXISTS contacts CASCADE;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id serial primary key, 
  email varchar(1255) unique NOT NULL,
  encrypted_password varchar(255) NOT NULL,
  role varchar(255) NOT NULL
);