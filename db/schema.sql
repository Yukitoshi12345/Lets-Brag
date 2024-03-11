-- Checking if a database named "brag_db" already exists and drops it if so. 
-- This prevents error if trying to create a database
DROP DATABASE IF EXISTS brag_db;

-- Creates a new database named "brag_db"
-- This establishes the database to store development tracker information
CREATE DATABASE brag_db;