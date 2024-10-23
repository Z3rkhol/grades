import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ClassList = ({ onSelectClass, selectedClassId }) => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/classes')
            .then(response => setClasses(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Classes</h2>
            <ul className="list-group d-flex flex-column">
                {classes.map(cls => (
                    <li
                        key={cls.id}
                        className={`list-group-item ${cls.id === selectedClassId ? 'selected' : ''}`}
                        onClick={() => onSelectClass(cls.id)}
                    >
                        {cls.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ClassList.propTypes = {
    onSelectClass: PropTypes.func.isRequired,
    selectedClassId: PropTypes.number,
};

export default ClassList;