import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const StudentAvarage = ({ studentId, refreshKey }) => {
    const [avarage, setAvarage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setAvarage(null);
        setError(null);

        if (studentId) {
            axios.post(`http://localhost:5000/students/${studentId}/avarage`)
                .then(response => setAvarage(response.data.avarage))
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        setError('No grades found for this student');
                    } else {
                        console.error(error);
                        setError('Failed to fetch avarage grade');
                    }
                });
        }
    }, [studentId, refreshKey]);

    return (
        <div className="student-avarage-card">
            {error && <div className="alert alert-danger">{error}</div>}
            {avarage !== null ? <p>Avarage Grade: {avarage.toFixed(2)}</p> : <p>No grades available.</p>}
        </div>
    );
};

StudentAvarage.propTypes = {
    studentId: PropTypes.number.isRequired,
    refreshKey: PropTypes.number.isRequired,
};

export default StudentAvarage;