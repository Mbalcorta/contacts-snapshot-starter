DROP TABLE IF EXISTS contacts CASCADE;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id serial primary key, 
  login varchar(12) unique NOT NULL,
  password varchar(15) NOT NULL
);