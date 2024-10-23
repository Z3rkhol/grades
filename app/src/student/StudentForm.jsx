import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const StudentForm = ({ classId, onStudentAdded }) => {
    const [name, setName] = useState('');
    const [class_id, setClassId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/students', { name, class_id })
            .then(() => {
                setName('');
                if (onStudentAdded) {
                    onStudentAdded();
                }
            })
            .catch(error => {
                console.error('There was an error adding the student:', error);
            });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (typeof value === 'string') {
            setName(value);
            setClassId(classId);
        } else {
            console.error('Expected a string but got:', value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Student Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Add Student</button>
        </form>
    );
};

StudentForm.propTypes = {
    classId: PropTypes.number.isRequired,
    onStudentAdded: PropTypes.func,
};

export default StudentForm;