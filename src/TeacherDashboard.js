import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DashboardIcon,
  StudentsIcon,
  AttendanceIcon,
  GradesIcon,
  TimetableIcon,
  LogoutIcon,
  ChevronRightIcon,
} from './Icons'; // Centralized icons
import teacherAvatar from './assets/teacher-mohd-parvej-avatar.jpg';
import alexJohnsonAvatar from './assets/alex-johnson-avatar.jpg';
import brendaSmithAvatar from './assets/brenda-smith-avatar.jpg';
import carlosGomezAvatar from './assets/carlos-gomez-avatar.jpg';
import dianaPrinceAvatar from './assets/diana-prince-avatar.jpg';

// Mock data
const teacher = {
  name: "Dr. Mohd. Parvej",
  avatarUrl:  teacherAvatar,
  stats: {
    students: 84,
    courses: 4,
    avgGrade: "B+",
  },
};

const upcomingClasses = [
  { time: "10:00 AM", course: "CS101: Intro to Computer Science", room: "A-101", duration: "50m" },
  { time: "11:00 AM", course: "MA203: Linear Algebra", room: "C-204", duration: "50m" },
  { time: "02:00 PM", course: "CS305: Data Structures", room: "Lab 3", duration: "1h 45m" },
];

const students = [
  { id: "S001", name: "Alex Johnson", avatar: alexJohnsonAvatar, lastGrade: "A" },
  { id: "S002", name: "Brenda Smith", avatar: brendaSmithAvatar, lastGrade: "B+" },
  { id: "S003", name: "Carlos Gomez", avatar: carlosGomezAvatar, lastGrade: "A-" },
  { id: "S004", name: "Diana Prince", avatar: dianaPrinceAvatar, lastGrade: "C" },
];

const assignedClassrooms = [
  { id: "C101", name: "Grade 10 - Section A", subject: "CS101: Intro to Computer Science", studentCount: 28 },
  { id: "C203", name: "Grade 11 - Section C", subject: "MA203: Linear Algebra", studentCount: 32 },
  { id: "C305", name: "Grade 12 - Section A", subject: "CS305: Data Structures", studentCount: 24 },
];

const examTypes = ["Mid-Term", "Final Exam", "Quiz 1", "Quiz 2", "Assignment 1"];

const weeklyTimetable = {
  Monday: [
    { time: "10:00 - 10:50", course: "CS101: Intro to CS", room: "A-101", class: "Grade 10 - A" },
    { time: "11:00 - 11:50", course: "MA203: Linear Algebra", room: "C-204", class: "Grade 11 - C" },
  ],
  Tuesday: [
    { time: "09:00 - 09:50", course: "CS305: Data Structures", room: "Lab 3", class: "Grade 12 - A" },
    { time: "11:00 - 11:50", course: "CS101: Intro to CS", room: "A-101", class: "Grade 10 - A" },
    { time: "14:00 - 15:45", course: "CS305: Data Structures Lab", room: "Lab 3", class: "Grade 12 - A" },
  ],
  Wednesday: [
    { time: "10:00 - 10:50", course: "CS101: Intro to CS", room: "A-101", class: "Grade 10 - A" },
    { time: "11:00 - 11:50", course: "MA203: Linear Algebra", room: "C-204", class: "Grade 11 - C" },
  ],
  Thursday: [
    { time: "09:00 - 09:50", course: "CS305: Data Structures", room: "Lab 3", class: "Grade 12 - A" },
    { time: "14:00 - 15:45", course: "CS305: Data Structures Lab", room: "Lab 3", class: "Grade 12 - A" },
  ],
  Friday: [ { time: "11:00 - 11:50", course: "MA203: Linear Algebra", room: "C-204", class: "Grade 11 - C" } ],
  Saturday: [],
};

export default function TeacherDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [announcement, setAnnouncement] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // State for classroom management
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  // State for adding a student
  const [studentIdToSearch, setStudentIdToSearch] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [studentAdded, setStudentAdded] = useState(false);
  // State for Classroom View
  const [classroomView, setClassroomView] = useState('view'); // 'view' or 'create'
  const [newClassroomName, setNewClassroomName] = useState('');
  const [newClassroomSubject, setNewClassroomSubject] = useState('');

  // State for Upload Marks View
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [marks, setMarks] = useState('');
  const [examType, setExamType] = useState(examTypes[0]);
  const [submittedMarks, setSubmittedMarks] = useState([]);
  const [showMarksConfirmation, setShowMarksConfirmation] = useState(false);
  // State for Attendance View
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [attendanceData, setAttendanceData] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = 'unmarked';
      return acc;
    }, {})
  );

  const handleMarkAttendance = (status) => {
    const student = students[currentStudentIndex];
    setAttendanceData(prevData => ({
        ...prevData,
        [student.id]: status
    }));
    handleNextStudent();
  };

  const handleNextStudent = () => {
      if (currentStudentIndex < students.length - 1) {
          setCurrentStudentIndex(currentStudentIndex + 1);
      } else {
          setCurrentStudentIndex(students.length); // Completion state
      }
  };

  const resetAttendance = () => {
      setCurrentStudentIndex(0);
      setAttendanceData(students.reduce((acc, student) => { acc[student.id] = 'unmarked'; return acc; }, {}));
  };

  const handleManageClassroom = (classroom) => {
    setSelectedClassroom(classroom);
    setCurrentView('manageClassroom');
  };

  const handleSearchStudent = (e) => {
    e.preventDefault();
    setSearchError('');
    setSearchedStudent(null);
    setStudentAdded(false);

    // Simulate finding a student from the mock data
    const foundStudent = students.find(s => s.id.toLowerCase() === studentIdToSearch.toLowerCase());

    if (foundStudent) {
      setSearchedStudent(foundStudent);
    } else {
      setSearchError(`Student with ID "${studentIdToSearch}" not found.`);
    }
  };

  const handleAddStudentToClass = () => {
    // In a real app, you'd make an API call to add `searchedStudent.id` to `selectedClassroom.id`
    console.log(`Adding student ${searchedStudent.name} (${searchedStudent.id}) to classroom ${selectedClassroom.name}`);
    setStudentAdded(true);
    setSearchedStudent(null);
    setStudentIdToSearch('');
    setTimeout(() => {
      setStudentAdded(false);
    }, 3000);
  };

  const handleSendAnnouncement = () => {
    if (announcement.trim() === '') return;

    // In a real app, you'd send this to a server.
    console.log("Sending announcement:", announcement);

    setShowConfirmation(true);
    setAnnouncement('');

    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const handleCreateClassroom = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a server
    console.log("Creating new classroom:", { name: newClassroomName, subject: newClassroomSubject });
    // For now, just log it, reset fields, and switch back to the view tab
    setNewClassroomName('');
    setNewClassroomSubject('');
    setClassroomView('view');
  };

  const handleUploadMarks = (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedStudentId || marks.trim() === '') return;

    const student = students.find(s => s.id === selectedStudentId);
    const classroom = assignedClassrooms.find(c => c.id === selectedClass);

    const newSubmission = {
        id: `M${Date.now()}`,
        classroomName: classroom.name,
        studentName: student.name,
        examType,
        marks,
        timestamp: new Date(),
    };

    console.log("Uploading marks:", newSubmission);
    setSubmittedMarks(prev => [newSubmission, ...prev].slice(0, 5)); // Keep last 5
    
    setSelectedStudentId('');
    setMarks('');

    setShowMarksConfirmation(true);
    setTimeout(() => setShowMarksConfirmation(false), 3000);
  };

  const currentStudent = students[currentStudentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/20 p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-lg">ERP</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">ARPANAP</h1>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'dashboard' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <DashboardIcon /> Dashboard
          </button>
          <button onClick={() => setCurrentView('classroom')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'classroom' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <StudentsIcon /> Classroom
          </button>
          <button onClick={() => setCurrentView('attendance')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'attendance' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <AttendanceIcon /> Attendance
          </button>
          <button onClick={() => setCurrentView('uploadMarks')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'uploadMarks' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <GradesIcon /> Upload Marks
          </button>
          <button onClick={() => setCurrentView('timetable')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'timetable' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <TimetableIcon /> Timetable
          </button>
        </nav>

        <div className="space-y-2">
          
          <Link to="/erp/login" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300">
            <LogoutIcon /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="bg-black/10 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">
            {currentView === 'manageClassroom' ? `Manage: ${selectedClassroom?.name}`
            : currentView === 'addStudent' ? `Add Student to ${selectedClassroom?.name}`
            : currentView === 'uploadMarks' ? 'Upload Marks'
            : currentView}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{teacher.name}</p>
              <p className="text-sm text-gray-400">Teacher</p>
            </div>
            <img src={teacher.avatarUrl} alt="Teacher Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
          </div>
        </header>

        {/* Page Content */}
        {currentView === 'dashboard' && (
          <main className="flex-1 p-8 overflow-y-auto">
            {/* Welcome & Stats */}
            <section className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/20 border border-white/10">
              <h3 className="text-3xl font-bold">Welcome back, {teacher.name.split(' ')[1]}!</h3>
              <p className="text-gray-300 mt-1">Here's what's happening today.</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-3xl font-bold">{teacher.stats.students}</p>
                  <p className="text-sm text-gray-400">Total Students</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-3xl font-bold">{teacher.stats.courses}</p>
                  <p className="text-sm text-gray-400">Assigned Courses</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-3xl font-bold">{teacher.stats.avgGrade}</p>
                  <p className="text-sm text-gray-400">Average Grade</p>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Classes */}
                <section>
                  <h4 className="text-xl font-semibold mb-4">Upcoming Classes</h4>
                  <div className="space-y-4">
                    {upcomingClasses.map((c, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center w-16">
                            <p className="font-bold text-lg">{c.time.split(' ')[0]}</p>
                            <p className="text-xs text-gray-400">{c.time.split(' ')[1]}</p>
                          </div>
                          <div className="border-l border-gray-600 pl-4">
                            <p className="font-semibold">{c.course}</p>
                            <p className="text-sm text-gray-400">Room: {c.room} &middot; Duration: {c.duration}</p>
                          </div>
                        </div>
                        <a href="#" className="p-2 rounded-md hover:bg-white/10">
                          <ChevronRightIcon />
                        </a>
                      </div>
                    ))}
                  </div>
                </section>

               
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <section>
                  <h4 className="text-xl font-semibold mb-4">Quick Actions</h4>
                  <div className="space-y-4">
                    <textarea
                      className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-gray-100 placeholder-gray-400"
                      placeholder="Type your announcement here..."
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                    />
                    <button
                      onClick={handleSendAnnouncement}
                      disabled={!announcement.trim()}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Announcement
                    </button>
                  </div>
                </section>

                {/* Grade Distribution */}
                <section>
                  
                  
                </section>
              </div>
            </div>
          </main>
        )}

        {currentView === 'classroom' && (
          <main className="flex-1 p-8 flex gap-8">
            {/* Sub-sidebar for classroom management */}
            <aside className="w-1/4 max-w-xs bg-black/10 p-6 rounded-2xl flex flex-col">
              <h4 className="text-lg font-semibold mb-6">Classroom Tools</h4>
              <nav className="space-y-2">
                <button
                  onClick={() => setClassroomView('view')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${classroomView === 'view' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  View Assigned
                </button>
                <button
                  onClick={() => setClassroomView('create')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${classroomView === 'create' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  Create New
                </button>
              </nav>
            </aside>

            {/* Classroom content area */}
            <section className="flex-1 bg-black/10 p-8 rounded-2xl">
              {classroomView === 'view' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Assigned Classrooms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {assignedClassrooms.map(classroom => (
                      <div key={classroom.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all transform hover:-translate-y-1 cursor-pointer">
                        <h5 className="text-xl font-bold text-purple-300">{classroom.name}</h5>
                        <p className="text-gray-300 mt-1 truncate">{classroom.subject}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <p className="text-sm text-gray-400">{classroom.studentCount} Students</p>
                          <button onClick={() => handleManageClassroom(classroom)} className="px-4 py-1 text-sm rounded-md bg-purple-600 hover:bg-purple-500 transition">Manage</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {classroomView === 'create' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Create a New Classroom</h3>
                  <form onSubmit={handleCreateClassroom} className="max-w-lg space-y-6">
                    <div>
                      <label htmlFor="classroom-name" className="block text-gray-300 text-sm font-bold mb-2">Classroom Name</label>
                      <input id="classroom-name" type="text" value={newClassroomName} onChange={(e) => setNewClassroomName(e.target.value)} placeholder="e.g., Grade 10 - Section B" required className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label htmlFor="classroom-subject" className="block text-gray-300 text-sm font-bold mb-2">Subject</label>
                      <input id="classroom-subject" type="text" value={newClassroomSubject} onChange={(e) => setNewClassroomSubject(e.target.value)} placeholder="e.g., Advanced Physics" required className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <button type="submit" disabled={!newClassroomName.trim() || !newClassroomSubject.trim()} className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        Create Classroom
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </section>
          </main>
        )}

        {currentView === 'manageClassroom' && selectedClassroom && (
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <button onClick={() => setCurrentView('classroom')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Classrooms</span>
                </button>
                <h3 className="text-3xl font-bold">Manage: {selectedClassroom.name}</h3>
                <p className="text-gray-300">{selectedClassroom.subject}</p>
              </div>
              <button
                onClick={() => setCurrentView('addStudent')}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition"
              >
                Add New Student
              </button>
            </div>

            <section className="bg-black/10 p-8 rounded-2xl">
              <h4 className="text-xl font-semibold mb-6">Enrolled Students</h4>
              {/* In a real app, you would fetch students for the selectedClassroom.id */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {students.map(student => (
                  <div key={student.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
                    <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-gray-400">ID: {student.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        )}

        {currentView === 'addStudent' && selectedClassroom && (
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="mb-8">
              <button onClick={() => setCurrentView('manageClassroom')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Manage Classroom</span>
              </button>
              <h3 className="text-3xl font-bold">Add Student to {selectedClassroom.name}</h3>
            </div>

            <div className="max-w-2xl mx-auto">
              <section className="bg-black/10 p-8 rounded-2xl shadow-lg mb-8">
                <h4 className="text-xl font-semibold mb-6">Find Student by ID</h4>
                <form onSubmit={handleSearchStudent} className="flex gap-4">
                  <input
                    type="text"
                    value={studentIdToSearch}
                    onChange={(e) => setStudentIdToSearch(e.target.value)}
                    placeholder="Enter Student ID (e.g., S001)"
                    required
                    className="flex-grow shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-sm font-semibold transform hover:-translate-y-0.5 transition disabled:opacity-50"
                    disabled={!studentIdToSearch.trim()}
                  >
                    Search
                  </button>
                </form>
              </section>

              {searchError && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm rounded-lg p-4 mb-8 text-center">
                  {searchError}
                </div>
              )}

              {searchedStudent && (
                <section className="bg-black/10 p-8 rounded-2xl shadow-lg border border-white/10">
                  <h4 className="text-xl font-semibold mb-6 text-center">Student Details</h4>
                  <div className="flex flex-col items-center gap-4">
                    <img src={searchedStudent.avatar} alt={searchedStudent.name} className="w-24 h-24 rounded-full border-2 border-purple-400" />
                    <h5 className="text-2xl font-bold">{searchedStudent.name}</h5>
                    <p className="text-gray-400">ID: {searchedStudent.id}</p>
                    <p className="text-gray-300">Last Recorded Grade: <span className="font-bold text-green-400">{searchedStudent.lastGrade}</span></p>
                    {/* In a real app, more details would be shown here */}
                    <button
                      onClick={handleAddStudentToClass}
                      className="mt-4 w-full max-w-xs bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition"
                    >
                      Add to Classroom
                    </button>
                  </div>
                </section>
              )}

              {studentAdded && (
                <div className="mt-8 bg-green-500/20 border border-green-500/50 text-green-300 text-sm rounded-lg p-4 text-center">
                  Student added successfully!
                </div>
              )}
            </div>
          </main>
        )}

        {currentView === 'uploadMarks' && (
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Upload Form Section */}
              <div className="lg:col-span-3">
                <section className="bg-black/10 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">Upload Student Marks</h3>
                  <form onSubmit={handleUploadMarks} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="class-select" className="block text-gray-300 text-sm font-bold mb-2">Classroom</label>
                        <select id="class-select" value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setSelectedStudentId(''); }} required className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option value="" disabled>Select a class</option>
                          {assignedClassrooms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="exam-select" className="block text-gray-300 text-sm font-bold mb-2">Exam / Assignment</label>
                        <select id="exam-select" value={examType} onChange={e => setExamType(e.target.value)} required className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500">
                          {examTypes.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="student-select" className="block text-gray-300 text-sm font-bold mb-2">Student</label>
                        <select id="student-select" value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} required disabled={!selectedClass} className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-800/20 disabled:cursor-not-allowed">
                          <option value="" disabled>Select a student</option>
                          {/* In a real app, you'd filter students by selectedClass */}
                          {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="marks-input" className="block text-gray-300 text-sm font-bold mb-2">Marks</label>
                        <input id="marks-input" type="number" value={marks} onChange={e => setMarks(e.target.value)} placeholder="Enter marks (e.g., 85)" required disabled={!selectedStudentId} className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-800/20 disabled:cursor-not-allowed" />
                      </div>
                    </div>

                    <div>
                      <button type="submit" disabled={!marks.trim()} className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        Upload Marks
                      </button>
                    </div>
                  </form>
                </section>
              </div>

              {/* Recent Uploads Section */}
              <div className="lg:col-span-2">
                <section className="bg-black/10 p-6 rounded-2xl shadow-lg h-full">
                  <h3 className="text-xl font-bold mb-4">Recent Uploads</h3>
                  {submittedMarks.length === 0 ? (
                    <div className="flex items-center justify-center h-4/5">
                      <p className="text-gray-400 text-center">No marks uploaded yet.</p>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {submittedMarks.map(sub => (
                        <li key={sub.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{sub.studentName}</p>
                              <p className="text-sm text-gray-300 truncate">{sub.classroomName}</p>
                              <p className="text-xs text-gray-400 mt-1">{sub.examType}</p>
                            </div>
                            <p className="text-lg font-bold text-green-400">{sub.marks}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </div>
          </main>
        )}

        {currentView === 'attendance' && (
          <main className="flex-1 p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold">Take Attendance</h3>
                <div className="flex items-center gap-3">
                  <label htmlFor="course-select" className="text-gray-400">Class:</label>
                  <select id="course-select" className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {upcomingClasses.map(c => <option key={c.course}>{c.course}</option>)}
                  </select>
                </div>
              </div>

              {currentStudentIndex >= students.length ? (
                <div className="text-center bg-black/20 p-12 rounded-2xl shadow-2xl border border-white/10">
                    <h2 className="text-3xl font-bold text-green-400 mb-4">Attendance Complete!</h2>
                    <p className="text-gray-300 mb-6">You have marked attendance for all {students.length} students.</p>
                    <button
                        onClick={resetAttendance}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg transform hover:-translate-y-0.5 transition"
                    >
                        Start Over
                    </button>
                </div>
              ) : (
                <>
                  <div className="bg-black/20 p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col items-center text-center w-full max-w-sm mx-auto">
                    <p className="text-gray-400 mb-4">Student {currentStudentIndex + 1} of {students.length}</p>
                    <img src={currentStudent.avatar} alt={currentStudent.name} className="w-32 h-32 rounded-full border-4 border-gray-700 mb-4" />
                    <h4 className="text-2xl font-bold">{currentStudent.name}</h4>
                    <p className="text-gray-400 mb-6">ID: {currentStudent.id}</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleMarkAttendance('present')}
                        className="px-8 py-3 rounded-lg bg-green-600/80 hover:bg-green-500 text-white font-semibold shadow-lg transform hover:-translate-y-0.5 transition"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance('absent')}
                        className="px-8 py-3 rounded-lg bg-red-600/80 hover:bg-red-500 text-white font-semibold shadow-lg transform hover:-translate-y-0.5 transition"
                      >
                        Absent
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleNextStudent}
                      className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-600 text-sm text-gray-200 hover:bg-gray-800 transition"
                    >
                      Skip Student
                      <ChevronRightIcon />
                    </button>
                  </div>
                </>
              )}
            </div>
          </main>
        )}

        {currentView === 'timetable' && (
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Weekly Timetable</h3>
              <button
                onClick={() => alert('Change request functionality not implemented yet.')}
                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg transform hover:-translate-y-0.5 transition"
              >
                Request Change
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {Object.entries(weeklyTimetable).map(([day, lectures]) => (
                <div key={day} className="bg-black/10 rounded-xl p-4 flex flex-col">
                  <h4 className="font-bold text-center text-lg mb-4 border-b border-white/10 pb-2">{day}</h4>
                  <div className="space-y-3 flex-grow">
                    {lectures.length > 0 ? (
                      lectures.map((lecture, index) => (
                        <div key={index} className="bg-white/5 p-3 rounded-lg border border-transparent hover:border-purple-500 transition-all cursor-default">
                          <p className="font-semibold text-sm">{lecture.time}</p>
                          <p className="text-purple-300 text-xs truncate mt-1">{lecture.course}</p>
                          <p className="text-gray-400 text-xs mt-1">{lecture.class} &middot; Room: {lecture.room}</p>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 text-sm"><p>No classes</p></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* Announcement Confirmation Popup */}
        {showConfirmation && (
          <div className="absolute bottom-8 right-8 z-10 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Announcement sent successfully!
          </div>
        )}

        {/* Marks Confirmation Popup */}
        {showMarksConfirmation && (
          <div className="absolute bottom-8 right-8 z-10 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Marks uploaded successfully!
          </div>
        )}
      </div>
    </div>
  );
}
