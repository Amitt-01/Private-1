import React from 'react';
import { Link } from 'react-router-dom';

const RegistrarDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Registrar Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Admission - Register New Student */}
        <div className="bg-white shadow rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Admissions</h2>
          <p className="text-gray-600 mb-2">Register a new student and generate College ID.</p>
          <Link to="/register-student" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register Student
          </Link>
        </div>

        {/* Employee Registration */}
        <div className="bg-white shadow rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Employee Registration</h2>
          <p className="text-gray-600 mb-2">Register a new employee and generate Employee ID.</p>
          <Link to="/register-employee" className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register Employee
          </Link>
        </div>

        {/* Edit Profiles */}
        <div className="bg-white shadow rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Edit Profiles</h2>
          <p className="text-gray-600 mb-2">Edit profiles of students, employees, and other members.</p>
          <Link to="/edit-profiles" className="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Edit Profiles
          </Link>
        </div>

        {/* Course Management */}
         <div className="bg-white shadow rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Course Management</h2>
          <p className="text-gray-600 mb-2">Add, update, or remove courses.</p>
          <Link to="/course-management" className="inline-block bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Manage Courses
          </Link>
        </div>

        {/* Generate Reports */}
        <div className="bg-white shadow rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Generate Reports</h2>
          <p className="text-gray-600 mb-2">Generate various reports related to students and employees.</p>
          <Link to="/generate-reports" className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Generate Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrarDashboard;