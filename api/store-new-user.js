import mysql from 'mysql2/promise';


export default async function handler(req, res) {

    console.log(req.method)


    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { newUsername, newPassword, newEmail } = req.body;


    try {
        const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        });

        await connection.execute(
        'INSERT INTO timeallocation_usernames (user_name, user_password, user_email) VALUES (?, ?, ?)',
        [newUsername, newPassword, newEmail]
        );

        await connection.end();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message || 'Database error, yo wtf?' });
    }
}
