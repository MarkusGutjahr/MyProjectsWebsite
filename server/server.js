const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;
const saltRounds = 10;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Admin',
    password: 'password',
    database: 'user_data'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// User registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log("username: ", username);
    console.log("password: ", password);

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashedPassword: ", hashedPassword);

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).json({ message: 'Error registering user' });
                return;
            }
            console.log("User registered successfully");
            res.status(200).json({ message: 'User registered successfully' });
        });

    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error hashing password' });
    }
});


// User login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';

    try {
        connection.query(sql, [username], async (err, result) => {
            if (err) {
                console.error('Error logging in:', err);
                res.status(500).json({ message: 'Error logging in' });
                return;
            }

            if (result.length === 0) {
                console.log("Invalid username or password (empty)")
                res.status(401).json({ message: 'Invalid username or password (empty)' });
                return;
            }

            console.log("Result from database query:", result);
            const user = result[0];

            console.log("user: ", user)
            console.log("password before match: ", password)
            console.log("user.password before match: ", user.password)

            const passwordMatch = await bcrypt.compare(password, user.password);

            console.log("password after match: ", password)
            console.log("user.password after match: ", user.password)
            console.log("passwordMatch: ", passwordMatch)

            if (passwordMatch) {
                console.log("Login successful")
                res.status(200).json({ message: 'Login successful' });
            } else {
                console.log("Invalid username or password (wrong password)")
                res.status(401).json({ message: 'Invalid username or password (wrong password)' });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }

});
