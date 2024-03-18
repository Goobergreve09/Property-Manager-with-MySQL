DROP DATABASE IF EXISTS property_manager_db;
CREATE DATABASE property_manager_db;

USE property_manager_db;

CREATE TABLE State (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  property_tax_percentage DECIMAL(4,2)
);

CREATE TABLE City (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  state_id INT,
  PropertyCost INT NOT NULL DEFAULT 40000,
  FOREIGN KEY (state_id) REFERENCES State(id)
);

CREATE TABLE PropertyType (
  id INT AUTO_INCREMENT PRIMARY KEY,
  TypeName VARCHAR(30) NOT NULL
);

CREATE TABLE Property (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Address VARCHAR(30) NOT NULL,
  zip_code VARCHAR(30) NOT NULL,
  city_id INT,
  state_id INT,
  type_id INT,
  PropertyCost INT NOT NULL DEFAULT 40000,
  property_tax_cost DECIMAL(10, 2),
  annual_mortgage_cost DECIMAL(10, 2),
  annual_income DECIMAL(10, 2),
  total_revenue DECIMAL(10, 2),
  FOREIGN KEY (city_id) REFERENCES City(id), 
  FOREIGN KEY (state_id) REFERENCES State(id),
  FOREIGN KEY (type_id) REFERENCES PropertyType(id)
);





