import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const GradeList = ({ studentId }) => {
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (studentId) {
            axios.get(`http://localhost:5000/grades/${studentId}`)
                .then(response => setGrades(response.data))
                .catch(error => console.error(error));
        }
    }, [studentId]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/grades/${id}`)
            .then(() => setGrades(grades.filter(grade => grade.id !== id)))
            .catch(error => {
                console.error(error);
                if (error.response && error.response.status === 404) {
                    setError('Grade not found. It may have already been deleted.');
                } else {
                    setError('An error occurred while deleting the grade.');
                }
            });
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {grades.map(grade => (
                    <li key={grade.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{grade.subject}</strong>: {grade.grade} (Weight: {grade.weight}) - {grade.description}
                        </div>
                        <button className="btn btn-link btn-sm text-danger" onClick={() => handleDelete(grade.id)}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

GradeList.propTypes = {
    studentId: PropTypes.number.isRequired,
};

export default GradeList;