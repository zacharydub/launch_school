CREATE TABLE expenses (
  id serial PRIMARY KEY,
  amount numeric(6,2) NOT NULL,
  memo text NOT NULL,
  created_on date NOT NULL
);

-- then in terminal create database name 'expenses' and execute this file within it by running psql -d expenses < schema.sql

