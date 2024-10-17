import { pool } from '../config/database.js';

// Get all laptops
export const getAllLaptops = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM laptops');
    res.json(result.rows);
  } catch (err) {
    console.error('⚠️ Error fetching laptops', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a laptop by ID
// export const getLaptopById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const result = await pool.query(`
//             SELECT laptops.id, laptops.name, laptops.base_price,
//                    JSON_AGG(
//                        JSON_BUILD_OBJECT(
//                            'id', feature_data.id,
//                            'name', feature_data.name
//                        )
//                    ) AS features
//             FROM laptops
//             LEFT JOIN laptop_features ON laptops.id = laptop_features.laptop_id
//             LEFT JOIN feature_data ON laptop_features.feature_id = feature_data.id
//             WHERE laptops.id = $1
//             GROUP BY laptops.id;
//         `, [id]);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: 'Laptop not found' });
//         }

//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error('⚠️ Error fetching laptop by ID', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

export const getLaptopById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
            SELECT laptops.id, laptops.name, laptops.base_price,
                   JSON_AGG(
                       JSON_BUILD_OBJECT(
                           'id', feature_data.id,
                           'name', feature_data.name,
                           'groupId', feature_data.feature_group_id -- Add group_id to the JSON object
                       )
                   ) AS features
            FROM laptops
            LEFT JOIN laptop_features ON laptops.id = laptop_features.laptop_id
            LEFT JOIN feature_data ON laptop_features.feature_id = feature_data.id
            WHERE laptops.id = $1
            GROUP BY laptops.id;
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Laptop not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('⚠️ Error fetching laptop by ID', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  
  

// POST endpoint to create a new laptop
export const createLaptop = async (req, res) => {
    const { laptopName, selectedFeatures, currentPrice } = req.body;
  
    try {
      // First, insert the new laptop
      const insertLaptopQuery = {
        text: 'INSERT INTO laptops (name, base_price) VALUES ($1, $2) RETURNING id',
        values: [laptopName, currentPrice]
      };
  
      const laptopResult = await pool.query(insertLaptopQuery);
      const laptopId = laptopResult.rows[0].id;
  
      // Then, insert into laptop_features for each selected feature
      const insertFeatureQueries = selectedFeatures.map(featureId => {
        return {
          text: 'INSERT INTO laptop_features (laptop_id, feature_id) VALUES ($1, $2)',
          values: [laptopId, featureId]
        };
      });
  
      for (const query of insertFeatureQueries) {
        await pool.query(query);
      }
  
      res.status(201).json({ message: 'Laptop created successfully', laptopId });
    } catch (err) {
      console.error('⚠️ Error creating laptop:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Get all laptops with their features
export const getAllLaptopsWithFeatures = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT laptops.id, laptops.name, laptops.base_price, 
               ARRAY_AGG(feature_data.name) AS features
        FROM laptops
        LEFT JOIN laptop_features ON laptops.id = laptop_features.laptop_id
        LEFT JOIN feature_data ON laptop_features.feature_id = feature_data.id
        GROUP BY laptops.id;
      `);
      res.json(result.rows);
    } catch (err) {
      console.error('⚠️ Error fetching laptops with features', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Delete a laptop by ID
// Delete a laptop and its related features by ID
export const deleteLaptopById = async (req, res) => {
    const { id } = req.params;
    try {
      // First, delete related features
      await pool.query("DELETE FROM laptop_features WHERE laptop_id = $1", [id]);
  
      // Then, delete the laptop
      const result = await pool.query("DELETE FROM laptops WHERE id = $1", [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Laptop not found" });
      }
      res.status(204).send(); // No content
    } catch (err) {
      console.error('⚠️ Error deleting laptop', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  // Update a laptop by ID
export const updateLaptopById = async (req, res) => {
    const { id } = req.params;
    const { name, price, features } = req.body; // assuming features is an array of feature objects
  
    try {
      // Update the laptop details
      await pool.query(
        "UPDATE laptops SET name = $1, base_price = $2 WHERE id = $3",
        [name, price, id]
      );
  
      // Update laptop features (delete old features, add new ones)
      await pool.query("DELETE FROM laptop_features WHERE laptop_id = $1", [id]);
      const featureInsertPromises = features.map(feature => 
        pool.query(
          "INSERT INTO laptop_features (laptop_id, feature_id) VALUES ($1, $2)",
          [id, feature]
        )
      );
      await Promise.all(featureInsertPromises);
  
      res.status(200).json({ message: "Laptop updated successfully" });
    } catch (err) {
      console.error('⚠️ Error updating laptop', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  
  
