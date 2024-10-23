import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const GradeForm = ({ studentId, onGradeAdded }) => {
    const [grade, setGrade] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/grades`, {
            student_id: studentId,
            grade,
            weight,
            description,
            subject
        })
            .then(() => {
                onGradeAdded();
                setGrade('');
                setWeight('');
                setDescription('');
                setSubject('');
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Subject</label>
                <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Grade</label>
                <input type="number" className="form-control" value={grade} onChange={(e) => setGrade(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Weight</label>
                <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button id="hel" type="submit" className="btn btn-primary">Add Grade</button>
        </form>
    );
};

GradeForm.propTypes = {
    studentId: PropTypes.number.isRequired,
    onGradeAdded: PropTypes.func.isRequired,
};

export default GradeForm;