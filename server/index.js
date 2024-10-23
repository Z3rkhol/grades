const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sadílek',
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.get('/classes', (req, res) => {
    const query = 'SELECT * FROM classes';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Failed to fetch classes');
        }
        res.status(200).json(results);
    });
});

app.post('/students', (req, res) => {
    const { name, class_id } = req.body;
    const query = 'INSERT INTO students (name, class_id) VALUES (?, ?)';
    db.query(query, [name, class_id], (err, results) => {
        if (err) {
            return res.status(500).send('Failed to add student');
        }
        res.status(200).send('Student added successfully');
    });
});

app.post('/grades', (req, res) => {
    const { student_id, grade, weight, description, subject } = req.body;
    const query = 'INSERT INTO grades (student_id, grade, weight, description, subject) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [student_id, grade, weight, description, subject], (err, results) => {
        if (err) {
            return res.status(500).send('Failed to add grade');
        }
        res.status(200).send('Grade added successfully');
    });
});

app.get('/classes/:class_id/students', (req, res) => {
    const class_id = req.params.class_id;
    const query = 'SELECT * FROM students WHERE class_id = ?';
    db.query(query, [class_id], (err, results) => {
        if (err) {
            return res.status(500).send('Failed to fetch students');
        }
        res.status(200).json(results);
    });
});

app.get('/grades/:student_id', (req, res) => {
    const student_id = req.params.student_id;
    const query = 'SELECT * FROM grades WHERE student_id = ?';
    db.query(query, [student_id], (err, results) => {
        if (err) {
            return res.status(500).send('Failed to fetch grades');
        }
        res.status(200).json(results);
    });
});

app.get('/grades/:subject', (req, res) => {
    const subject = req.params.subject;
    const query = 'SELECT * FROM grades WHERE subject = ?';
    db.query(query, [subject], (err, results) => {
        if (err) {
            return res.status(500).send('Failed to fetch grades');
        }
        res.status(200).json(results);
    });
});

//DELETE GRADE
app.delete('/grades/:id', (req, res) => {
    const gradeId = req.params.id;
    const query = 'DELETE FROM grades WHERE id = ?';
    db.query(query, [gradeId], (err, results) => {
        if (err) {
            return res.status(500).send('Failed to delete grade');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Grade not found');
        }
        res.status(200).send('Grade deleted successfully');
    });
});

//DELETE STUDENT
app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).send('Failed to delete student');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Student not found');
        }
        res.status(200).send('Student deleted successfully');
    });
});


//CALCULATE AVARAGE
app.post('/students/:student_id/avarage', (req, res) => {
    const studentId = req.params.student_id;
    const query = 'SELECT grade, weight FROM grades WHERE student_id = ?';
    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Failed to fetch grades:', err);
            return res.status(500).send('Failed to fetch grades');
        }
        if (results.length === 0) {
            return res.status(404).send('No grades found for this student');
        }
        const totalWeight = results.reduce((sum, grade) => sum + grade.weight, 0);
        const weightedSum = results.reduce((sum, grade) => sum + (grade.grade * grade.weight), 0);
        const avarage = totalWeight === 0 ? 0 : weightedSum / totalWeight;

        const updateQuery = 'UPDATE students SET avarage = ? WHERE id = ?';
        db.query(updateQuery, [avarage, studentId], (updateErr) => {
            if (updateErr) {
                console.error('Failed to update avarage grade:', updateErr);
                return res.status(500).send('Failed to update avarage grade');
            }
            res.status(200).json({ avarage });
        });
    });
});