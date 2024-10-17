import { pool } from '../config/database.js';

// Get all feature groups
export const getAllFeatureGroups = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feature_groups');
    res.json(result.rows);
  } catch (err) {
    console.error('⚠️ Error fetching feature groups', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a feature group by ID
export const getFeatureGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM feature_groups WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Feature group not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('⚠️ Error fetching feature group by ID', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
