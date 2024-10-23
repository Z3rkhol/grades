import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const StudentSelector = ({ classId, onSelectStudent }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (classId) {
            axios.get(`http://localhost:5000/classes/${classId}/students`)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setStudents(response.data);
                    } else {
                        console.error('Expected an array of students');
                    }
                })
                .catch(error => console.error(error));
        }
    }, [classId]);

    return (
        <select onChange={(e) => onSelectStudent(e.target.value)}>
            <option value="">Select a student</option>
            {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
            ))}
        </select>
    );
};

StudentSelector.propTypes = {
    classId: PropTypes.string.isRequired,
    onSelectStudent: PropTypes.func.isRequired,
};

export default StudentSelector;