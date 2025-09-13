import React, { useState } from "react";
import { Link } from "react-router-dom";

// Placeholder icons - in a real app, these would be from a library like heroicons
const DashboardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
);
const StudentsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const AttendanceIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
);
const GradesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const TimetableIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const SettingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);
const ChevronRightIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

// Mock data
const teacher = {
  name: "Dr. Mohd. Parvej",
  avatarUrl: "https://i.pravatar.cc/100?u=evelynreed",
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
  { id: "S001", name: "Alex Johnson", avatar: "https://i.pravatar.cc/100?u=alex", lastGrade: "A" },
  { id: "S002", name: "Brenda Smith", avatar: "https://i.pravatar.cc/100?u=brenda", lastGrade: "B+" },
  { id: "S003", name: "Carlos Gomez", avatar: "https://i.pravatar.cc/100?u=carlos", lastGrade: "A-" },
  { id: "S004", name: "Diana Prince", avatar: "https://i.pravatar.cc/100?u=diana", lastGrade: "C" },
];

export default function TeacherDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

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
          <button onClick={() => {}} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left hover:bg-white/5 text-gray-300">
            <StudentsIcon /> My Students
          </button>
          <button onClick={() => setCurrentView('attendance')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'attendance' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <AttendanceIcon /> Attendance
          </button>
          <button onClick={() => {}} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left hover:bg-white/5 text-gray-300">
            <GradesIcon /> Grades & Exams
          </button>
          <button onClick={() => {}} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left hover:bg-white/5 text-gray-300">
            <TimetableIcon /> Timetable
          </button>
        </nav>

        <div className="space-y-2">
          <button onClick={() => {}} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left hover:bg-white/5 text-gray-300">
            <SettingsIcon /> Settings
          </button>
          <Link to="/erp/login" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300">
            <LogoutIcon /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/10 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">{currentView}</h2>
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

                {/* My Students */}
                <section>
                  <h4 className="text-xl font-semibold mb-4">My Students</h4>
                  <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-white/10">
                        <tr>
                          <th className="p-3 font-semibold">Name</th>
                          <th className="p-3 font-semibold">Student ID</th>
                          <th className="p-3 font-semibold">Last Grade</th>
                          <th className="p-3 font-semibold"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((s, i) => (
                          <tr key={s.id} className="border-t border-white/10">
                            <td className="p-3 flex items-center gap-3">
                              <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full" />
                              {s.name}
                            </td>
                            <td className="p-3 text-gray-400">{s.id}</td>
                            <td className="p-3 font-mono">{s.lastGrade}</td>
                            <td className="p-3 text-right">
                              <a href="#" className="text-purple-400 hover:underline text-sm">View Profile</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <section>
                  <h4 className="text-xl font-semibold mb-4">Quick Actions</h4>
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 h-64 flex items-center justify-center text-gray-400">
                    Announcement
                  </div>
                  <div className="space-y-2 space-x-2">

                    <a href="#" className="block p-4 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition">
                      Send 
                    </a>
                  </div>
                </section>

                {/* Grade Distribution */}
                <section>
                  
                  
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
      </div>
    </div>
  );
}
