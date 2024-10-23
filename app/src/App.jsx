import { useState } from 'react';
import ClassList from './ClassList.jsx';
import StudentList from './student/StudentList.jsx';
import StudentForm from './student/StudentForm.jsx';
import GradeList from './GradeList.jsx';
import GradeForm from './GradeForm.jsx';
import StudentAvarage from './student/StudentAvarage.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshAll = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-13 mb-4 top-left">
                    <div className="card h-100">
                        <div className="card-body">
                            <ClassList onSelectClass={setSelectedClass} selectedClassId={selectedClass} />
                        </div>
                    </div>
                </div>
                <div className="col-13 mb-4 top-right">
                    {selectedClass && (
                        <div className="card h-100">
                            <div className="card-body">
                                <StudentList key={refreshKey} classId={selectedClass} onSelectStudent={setSelectedStudent} selectedStudentId={selectedStudent} onStudentDeleted={refreshAll} />
                            </div>
                        </div>
                    )}
                    {selectedClass && (
                        <div className="card h-100 mt-4">
                            <div className="card-body">
                                <StudentForm classId={selectedClass} onStudentAdded={refreshAll} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {selectedStudent && (
                <div className="row justify-content-center mt-4">
                    <div className="col-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <GradeList key={refreshKey} studentId={selectedStudent} onGradeDeleted={refreshAll} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card h-100">
                            <div className="card-body">
                                <GradeForm studentId={selectedStudent} onGradeAdded={refreshAll} />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 mt-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <StudentAvarage key={refreshKey} studentId={selectedStudent} refreshKey={refreshKey} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;