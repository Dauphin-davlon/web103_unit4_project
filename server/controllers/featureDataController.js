import { pool } from '../config/database.js';

// Get all feature data
export const getAllFeatureData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feature_data');
    res.json(result.rows);
  } catch (err) {
    console.error('⚠️ Error fetching feature data', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get feature data by ID
export const getFeatureDataById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM feature_data WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('⚠️ Error fetching feature data by ID', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// In your featureController.js

// Get features by feature group ID
export const getFeaturesByGroupId = async (req, res) => {
    const { groupId } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM feature_data WHERE feature_group_id = $1', [groupId]); // Adjust your database query as needed
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No features found for this group' });
      }
  
      res.json(result.rows);
    } catch (err) {
      console.error('⚠️ Error fetching features by group ID', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
