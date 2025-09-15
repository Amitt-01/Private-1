import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardIcon,
  AttendanceIcon,
  GradesIcon,
  LogoutIcon,
  FeeIcon,
  CalendarIcon,
} from './Icons';
import brendaSmithAvatar from './assets/brenda-smith-avatar.jpg';

// Mock Data for Student
const student = {
  name: 'Ajay Tomar',
  avatarUrl: brendaSmithAvatar,
  rollNo: 'S002',
  class: 'Grade 11 - Section C',
  stats: {
    attendance: '92%',
    gpa: '3.8',
    overdueFees: '$0',
  },
};

const attendanceRecords = [
  { id: 1, subject: 'MA203: JAVA', total: 40, attended: 38, percentage: 95 },
  { id: 2, subject: 'CS101: PYTHON', total: 45, attended: 40, percentage: 89 },
  { id: 3, subject: 'PH201: DBMS', total: 38, attended: 35, percentage: 92 },
  { id: 4, subject: 'EN101: SPM', total: 35, attended: 34, percentage: 97 },
];

const gradeRecords = [
  { id: 1, subject: 'MA203: JAVA', exam: 'Mid-Term', score: 88, total: 100, grade: 'A-' },
  { id: 2, subject: 'CS101: PYTHON', exam: 'Mid-Term', score: 92, total: 100, grade: 'A' },
  { id: 3, subject: 'PH201: DBMS', exam: 'Quiz 1', score: 18, total: 20, grade: 'A' },
  { id: 4, subject: 'EN101: SPM', exam: 'Assignment 1', score: 24, total: 25, grade: 'A+' },
  { id: 5, subject: 'MA203: JAVA', exam: 'Quiz 1', score: 19, total: 20, grade: 'A+' },
];

const feeDetails = {
  total: 5000,
  paid: 5000,
  due: 0,
  history: [
    { id: 'T001', date: '2023-08-01', amount: 2500, method: 'Online Transfer', status: 'Paid' },
    { id: 'T002', date: '2023-07-15', amount: 2500, method: 'Credit Card', status: 'Paid' },
  ],
};

const calendarEvents = {
  '2024-05-20': [{ type: 'exam', title: 'Mid-Term Exams Start' }],
  '2024-05-28': [{ type: 'exam', title: 'Mid-Term Exams End' }],
  '2024-06-10': [{ type: 'holiday', title: 'Summer Break Starts' }],
  '2024-07-10': [{ type: 'event', title: 'Science Fair' }],
};

export default function StudentDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    return 'text-red-400';
  };

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
          <button onClick={() => setCurrentView('attendance')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'attendance' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <AttendanceIcon /> Attendance
          </button>
          <button onClick={() => setCurrentView('grades')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'grades' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <GradesIcon /> Grades
          </button>
          <button onClick={() => setCurrentView('fees')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'fees' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <FeeIcon /> Fees
          </button>
          <button onClick={() => setCurrentView('calendar')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === 'calendar' ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
            <CalendarIcon /> Calendar
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
          <h2 className="text-2xl font-bold capitalize">{currentView}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-gray-400">Student</p>
            </div>
            <img src={student.avatarUrl} alt="Student Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
          </div>
        </header>

        {/* Page Content */}
        {currentView === 'dashboard' && (
          <main className="flex-1 p-8 overflow-y-auto">
            <section className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/20 border border-white/10">
              <h3 className="text-3xl font-bold">Welcome, {student.name.split(' ')[0]}!</h3>
              <p className="text-gray-300 mt-1">Here's your academic snapshot.</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-3xl font-bold">{student.stats.attendance}</p>
                  <p className="text-sm text-gray-400">Overall Attendance</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-3xl font-bold">{student.stats.gpa}</p>
                  <p className="text-sm text-gray-400">Current GPA</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-green-400">{student.stats.overdueFees}</p>
                  <p className="text-sm text-gray-400">Overdue Fees</p>
                </div>
              </div>
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section>
                    <h4 className="text-xl font-semibold mb-4">Recent Grades</h4>
                    <div className="space-y-3">
                        {gradeRecords.slice(0, 3).map(record => (
                            <div key={record.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{record.subject}</p>
                                    <p className="text-sm text-gray-400">{record.exam}</p>
                                </div>
                                <p className={`text-xl font-bold ${getGradeColor(record.grade)}`}>{record.grade}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h4 className="text-xl font-semibold mb-4">Attendance Summary</h4>
                    <div className="space-y-3">
                        {attendanceRecords.slice(0, 3).map(record => (
                            <div key={record.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-semibold">{record.subject}</p>
                                    <p className={`font-bold ${getAttendanceColor(record.percentage)}`}>{record.percentage}%</p>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${record.percentage}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
          </main>
        )}

        {currentView === 'attendance' && (
          <main className="flex-1 p-8 overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Attendance Details</h3>
            <div className="bg-black/10 p-6 rounded-2xl">
                <div className="grid grid-cols-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10">
                    <div>Subject</div>
                    <div className="text-center">Attended</div>
                    <div className="text-center">Total Classes</div>
                    <div className="text-right">Percentage</div>
                </div>
                <div className="space-y-2 mt-2">
                    {attendanceRecords.map(record => (
                        <div key={record.id} className="grid grid-cols-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
                            <div className="font-semibold">{record.subject}</div>
                            <div className="text-center text-gray-300">{record.attended}</div>
                            <div className="text-center text-gray-300">{record.total}</div>
                            <div className={`text-right font-bold ${getAttendanceColor(record.percentage)}`}>{record.percentage}%</div>
                        </div>
                    ))}
                </div>
            </div>
          </main>
        )}

        {currentView === 'grades' && (
          <main className="flex-1 p-8 overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Grades & Marks</h3>
            <div className="bg-black/10 p-6 rounded-2xl">
                <div className="grid grid-cols-5 font-semibold text-gray-400 px-4 py-2 border-b border-white/10">
                    <div>Subject</div>
                    <div>Exam/Assignment</div>
                    <div className="text-center">Score</div>
                    <div className="text-center">Total</div>
                    <div className="text-right">Grade</div>
                </div>
                <div className="space-y-2 mt-2">
                    {gradeRecords.map(record => (
                        <div key={record.id} className="grid grid-cols-5 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
                            <div className="font-semibold">{record.subject}</div>
                            <div className="text-gray-300">{record.exam}</div>
                            <div className="text-center text-gray-300">{record.score}</div>
                            <div className="text-center text-gray-300">{record.total}</div>
                            <div className={`text-right font-bold ${getGradeColor(record.grade)}`}>{record.grade}</div>
                        </div>
                    ))}
                </div>
            </div>
          </main>
        )}

        {currentView === 'fees' && (
          <main className="flex-1 p-8 overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Fee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/20 p-6 rounded-2xl text-center">
                    <p className="text-gray-400 text-sm">Total Fees</p>
                    <p className="text-3xl font-bold">${feeDetails.total.toLocaleString()}</p>
                </div>
                <div className="bg-black/20 p-6 rounded-2xl text-center">
                    <p className="text-gray-400 text-sm">Paid</p>
                    <p className="text-3xl font-bold text-green-400">${feeDetails.paid.toLocaleString()}</p>
                </div>
                <div className="bg-black/20 p-6 rounded-2xl text-center">
                    <p className="text-gray-400 text-sm">Amount Due</p>
                    <p className={`text-3xl font-bold ${feeDetails.due > 0 ? 'text-red-400' : 'text-gray-100'}`}>${feeDetails.due.toLocaleString()}</p>
                </div>
            </div>
            <h4 className="text-xl font-semibold mb-4">Payment History</h4>
            <div className="bg-black/10 p-6 rounded-2xl">
                <div className="grid grid-cols-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10">
                    <div>Transaction ID</div>
                    <div>Date</div>
                    <div className="text-center">Method</div>
                    <div className="text-right">Amount</div>
                </div>
                <div className="space-y-2 mt-2">
                    {feeDetails.history.map(item => (
                        <div key={item.id} className="grid grid-cols-4 items-center bg-white/5 px-4 py-3 rounded-lg">
                            <div className="font-mono text-sm text-gray-400">{item.id}</div>
                            <div className="text-gray-300">{item.date}</div>
                            <div className="text-center text-gray-300">{item.method}</div>
                            <div className="text-right font-semibold">${item.amount.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </div>
          </main>
        )}

        {currentView === 'calendar' && (
          <main className="flex-1 p-8 overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Academic Calendar</h3>
            <div className="bg-black/10 p-6 rounded-2xl">
                <p className="text-center text-gray-400">This is a placeholder for a full calendar component.</p>
                <div className="mt-6 space-y-4">
                    {Object.entries(calendarEvents).map(([date, events]) => (
                        <div key={date}>
                            <p className="font-semibold text-purple-300">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <div className="pl-4 border-l-2 border-purple-500/30 ml-2 mt-2 space-y-2">
                                {events.map((event, index) => (
                                    <div key={index} className="bg-white/5 p-3 rounded-lg">
                                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full mr-2 ${event.type === 'exam' ? 'bg-red-500/30 text-red-200' : event.type === 'holiday' ? 'bg-green-500/30 text-green-200' : 'bg-blue-500/30 text-blue-200'}`}>{event.type}</span>
                                        <span>{event.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </main>
        )}

      </div>
    </div>
  );
}