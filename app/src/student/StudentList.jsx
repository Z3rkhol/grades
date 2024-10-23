import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const StudentList = ({ classId, onSelectStudent, selectedStudentId, onStudentDeleted }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (classId) {
            axios.get(`http://localhost:5000/classes/${classId}/students`)
                .then(response => setStudents(response.data))
                .catch(error => console.error(error));
        }
    }, [classId]);

    const handleDelete = (studentId) => {
        axios.delete(`http://localhost:5000/students/${studentId}`)
            .then(() => {
                onStudentDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <ul className="list-group">
            {students.map(student => (
                <li
                    key={student.id}
                    className={`list-group-item ${selectedStudentId === student.id ? 'selected' : ''}`}
                    onClick={() => onSelectStudent(student.id)}
                >
                    {student.name}
                    <button onClick={() => handleDelete(student.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                </li>
            ))}
        </ul>
    );
};

StudentList.propTypes = {
    classId: PropTypes.number.isRequired,
    onSelectStudent: PropTypes.func.isRequired,
    selectedStudentId: PropTypes.number,
    onStudentDeleted: PropTypes.func.isRequired,
};

export default StudentList;