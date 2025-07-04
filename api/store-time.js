import mysql from 'mysql2/promise';




export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { time, activity, timestamp } = req.body;

  if (typeof time !== 'number' || !activity || !timestamp) {
    return res.status(400).json({ error: 'Invalid data' });
  }


  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.execute(
      'INSERT INTO timeallocation (activity, elapsed_time, timestamp) VALUES (?, ?, ?)',
      [activity, time, timestamp]
    );

    await connection.end();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message || 'Database error, yo wtf?' });
  }
}
