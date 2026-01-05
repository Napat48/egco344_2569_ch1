const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data with departments
const students = [
    {
        id: 'ENG001',
        name: 'John Smith',
        department: 'Computer Science',
        gpa: 3.85
    },
    {
        id: 'ENG002',
        name: 'Sarah Johnson',
        department: 'Computer Science',
        gpa: 3.92
    },
    {
        id: 'ENG003',
        name: 'Mike Chen',
        department: 'Civil Engineering',
        gpa: 3.45
    },
    {
        id: 'ENG004',
        name: 'Emma Wilson',
        department: 'Civil Engineering',
        gpa: 3.78
    },
    {
        id: 'ENG005',
        name: 'David Brown',
        department: 'Mechanical Engineering',
        gpa: 3.62
    },
    {
        id: 'ENG006',
        name: 'Lisa Garcia',
        department: 'Mechanical Engineering',
        gpa: 3.88
    },
    {
        id: 'ENG007',
        name: 'James Lee',
        department: 'Electrical Engineering',
        gpa: 3.71
    },
    {
        id: 'ENG008',
        name: 'Anna Martinez',
        department: 'Electrical Engineering',
        gpa: 3.95
    }
];

// API 1: Get all students with GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const grouped = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        success: true,
        data: grouped
    });
});

// API 2: Get individual student GPA by student ID
app.get('/api/students/:studentId/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${req.params.studentId} not found`
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GET /api/students/gpa - Get all students GPA by department`);
    console.log(`GET /api/students/:studentId/gpa - Get individual student GPA`);
});