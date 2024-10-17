import { pool } from './database.js';
import './dotenv.js'; // Assuming you are using dotenv for environment variables
import { laptopData, featureGroupData, featureData } from '../data/data.js'; // Adjust the path based on your directory structure

// Function to create tables
const createTables = async () => {
  const createTablesQuery = `
    DROP TABLE IF EXISTS laptop_features;
    DROP TABLE IF EXISTS feature_data;
    DROP TABLE IF EXISTS feature_groups;
    DROP TABLE IF EXISTS laptops;

    CREATE TABLE IF NOT EXISTS laptops (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      brand VARCHAR(255),
      base_price DECIMAL(10, 2) NOT NULL,
      form_factor VARCHAR(255),
      display_type VARCHAR(255),
      processor_type VARCHAR(255),
      image VARCHAR(255),
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS feature_groups (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS feature_data (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      additional_cost DECIMAL(10, 2) NOT NULL,
      feature_group_id INTEGER REFERENCES feature_groups(id),
      available_for_form_factor VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS laptop_features (
      laptop_id INTEGER REFERENCES laptops(id),
      feature_id INTEGER REFERENCES feature_data(id),
      PRIMARY KEY (laptop_id, feature_id)
    );
  `;

  try {
    await pool.query(createTablesQuery);
    console.log('🎉 Tables created successfully');
  } catch (err) {
    console.error('⚠️ Error creating tables', err);
  }
};

// Function to seed laptops table
const seedLaptopsTable = async () => {
  for (const laptop of laptopData) {
    const insertLaptopQuery = {
      text: 'INSERT INTO laptops (name, brand, base_price, form_factor, display_type, processor_type, image, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [laptop.name, laptop.brand, laptop.base_price, laptop.form_factor, laptop.display_type, laptop.processor_type, laptop.image, laptop.description]
    };

    try {
      const res = await pool.query(insertLaptopQuery);
      console.log(`✅ Laptop "${laptop.name}" added successfully with ID: ${res.rows[0].id}`);
    } catch (err) {
      console.error(`⚠️ Error inserting laptop "${laptop.name}"`, err);
    }
  }
};

// Function to seed feature groups table
const seedFeatureGroupsTable = async () => {
  for (const featureGroup of featureGroupData) {
    const insertFeatureGroupQuery = {
      text: 'INSERT INTO feature_groups (name, description) VALUES ($1, $2) RETURNING id',
      values: [featureGroup.name, featureGroup.description]
    };

    try {
      const res = await pool.query(insertFeatureGroupQuery);
      console.log(`✅ Feature Group "${featureGroup.name}" added successfully with ID: ${res.rows[0].id}`);
    } catch (err) {
      console.error(`⚠️ Error inserting feature group "${featureGroup.name}"`, err);
    }
  }
};

// Function to seed feature data table
const seedFeatureDataTable = async () => {
  for (const feature of featureData) {
    const insertFeatureQuery = {
      text: 'INSERT INTO feature_data (name, description, additional_cost, feature_group_id, available_for_form_factor) VALUES ($1, $2, $3, $4, $5)',
      values: [feature.name, feature.description, feature.additional_cost, feature.feature_group_id, feature.available_for_form_factor]
    };

    try {
      await pool.query(insertFeatureQuery);
      console.log(`✅ Feature "${feature.name}" added successfully`);
    } catch (err) {
      console.error(`⚠️ Error inserting feature "${feature.name}"`, err);
    }
  }
};

// Main function to reset the database
const resetDatabase = async () => {
  await createTables();
  await seedLaptopsTable();
  await seedFeatureGroupsTable();
  await seedFeatureDataTable();
  pool.end();  // Close the pool after everything is done
};

// Execute the reset
resetDatabase();
