-- Checking if a database named "[name]_db" already exists and drops it if so. 
-- This prevents error if trying to create a database
DROP DATABASE IF EXISTS [name]_db;

-- Creates a new database named "[name]_db"
-- This establishes the database to store [name] tracker information
CREATE DATABASE [name]_db;