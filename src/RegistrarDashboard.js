import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardIcon,
  LogoutIcon,
  UserGroupIcon,
  BookOpenIcon,
  GraduationCapIcon,
  PrinterIcon,
  CalendarIcon,
  ChevronRightIcon,
} from './Icons';
import dianaPrinceAvatar from './assets/diana-prince-avatar.jpg';
import alexJohnsonAvatar from './assets/alex-johnson-avatar.jpg';
import brendaSmithAvatar from './assets/brenda-smith-avatar.jpg';
import carlosGomezAvatar from './assets/carlos-gomez-avatar.jpg';

// Mock Data
const registrarUser = {
  name: 'Eleanor Vance',
  avatarUrl: dianaPrinceAvatar,
};

const stats = {
  totalStudents: 4320,
  newEnrollments: 152,
  pendingVerifications: 18,
  coursesOffered: 256,
};

const allStudents = [
  { id: 'S001', name: 'Alex Johnson', avatar: alexJohnsonAvatar, program: 'B.Tech CSE', status: 'Active', joinDate: '2021-08-15' },
  { id: 'S002', name: 'Brenda Smith', avatar: brendaSmithAvatar, program: 'B.A. English', status: 'Active', joinDate: '2022-08-20' },
  { id: 'S003', name: 'Carlos Gomez', avatar: carlosGomezAvatar, program: 'M.Sc. Physics', status: 'Graduated', joinDate: '2020-08-10' },
  { id: 'S004', name: 'Diana Prince', avatar: dianaPrinceAvatar, program: 'B.Tech ME', status: 'Withdrawn', joinDate: '2021-09-01' },
  { id: 'S005', name: 'Ethan Hunt', avatar: alexJohnsonAvatar, program: 'B.Tech CSE', status: 'Active', joinDate: '2023-08-18' },
  { id: 'S006', name: 'Fiona Glenanne', avatar: brendaSmithAvatar, program: 'B.Com', status: 'On Leave', joinDate: '2022-09-01' },
];

const courses = [
  { id: 'CS101', name: 'Introduction to Computer Science', department: 'Computer Science', credits: 3, semester: 1 },
  { id: 'MA203', name: 'Linear Algebra', department: 'Mathematics', credits: 4, semester: 2 },
  { id: 'PY101', name: 'Classical Mechanics', department: 'Physics', credits: 4, semester: 1 },
  { id: 'EN205', name: 'Shakespearean Literature', department: 'English', credits: 3, semester: 3 },
  { id: 'CS305', name: 'Data Structures', department: 'Computer Science', credits: 4, semester: 3 },
];

const documentRequests = [
  { id: 'D001', student: 'Alex Johnson', studentId: 'S001', documentType: 'Official Transcript', status: 'Pending', requestDate: '2024-05-18' },
  { id: 'D002', student: 'Brenda Smith', studentId: 'S002', documentType: 'Enrollment Verification', status: 'Generated', requestDate: '2024-05-17' },
  { id: 'D003', student: 'Ethan Hunt', studentId: 'S005', documentType: 'Bonafide Certificate', status: 'Pending', requestDate: '2024-05-19' },
  { id: 'D004', student: 'Carlos Gomez', studentId: 'S003', documentType: 'Degree Certificate', status: 'Generated', requestDate: '2024-05-15' },
];

export default function RegistrarDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'Active': return 'text-green-400 bg-green-400/10';
      case 'Generated': return 'text-sky-400 bg-sky-400/10';
      case 'Graduated': return 'text-purple-400 bg-purple-400/10';
      case 'Withdrawn': return 'text-red-400 bg-red-400/10';
      case 'On Leave': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView stats={stats} />;
      case 'studentRecords':
        return <StudentRecordsView students={allStudents} getStatusColor={getStatusColor} />;
      case 'courseCatalog':
        return <CourseCatalogView courses={courses} />;
      case 'graduationAudit':
        return <GraduationAuditView />;
      case 'documentGeneration':
        return <DocumentGenerationView requests={documentRequests} getStatusColor={getStatusColor} />;
      case 'academicCalendar':
        return <AcademicCalendarView />;
      default:
        return <DashboardView stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 font-sans flex">
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
          <SidebarButton icon={<DashboardIcon />} label="Dashboard" view="dashboard" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<UserGroupIcon />} label="Student Records" view="studentRecords" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<BookOpenIcon />} label="Course Catalog" view="courseCatalog" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<GraduationCapIcon />} label="Graduation Audit" view="graduationAudit" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<PrinterIcon />} label="Documents" view="documentGeneration" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<CalendarIcon />} label="Academic Calendar" view="academicCalendar" currentView={currentView} setCurrentView={setCurrentView} />
        </nav>

        <div>
          <Link to="/erp/login" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300">
            <LogoutIcon /> Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative">
        <header className="bg-black/10 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">{currentView.replace(/([A-Z])/g, ' $1')}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{registrarUser.name}</p>
              <p className="text-sm text-gray-400">Registrar</p>
            </div>
            <img src={registrarUser.avatarUrl} alt="Registrar Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto bg-black/10">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

const SidebarButton = ({ icon, label, view, currentView, setCurrentView }) => (
  <button onClick={() => setCurrentView(view)} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === view ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
    {React.cloneElement(icon, { className: "h-5 w-5" })} {label}
  </button>
);

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white/5 p-5 rounded-xl flex items-center gap-4">
    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">{icon}</div>
    <div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </div>
);

const DashboardView = ({ stats }) => (
  <>
    <section className="mb-8">
      <h3 className="text-3xl font-bold">Welcome, {registrarUser.name.split(' ')[0]}!</h3>
      <p className="text-gray-300 mt-1">Here is the summary of the student registry.</p>
    </section>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard label="Total Students" value={stats.totalStudents} icon={<UserGroupIcon />} />
      <StatCard label="New Enrollments (Term)" value={stats.newEnrollments} icon={<UserGroupIcon />} />
      <StatCard label="Pending Verifications" value={stats.pendingVerifications} icon={<PrinterIcon />} />
      <StatCard label="Courses Offered" value={stats.coursesOffered} icon={<BookOpenIcon />} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
        <h4 className="text-xl font-semibold mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition font-semibold">Register New Student</button>
          <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition font-semibold">Add New Course</button>
          <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition font-semibold">Generate Transcript</button>
          <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition font-semibold">View Academic Calendar</button>
        </div>
      </div>
      <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
        <h4 className="text-xl font-semibold mb-4">Recent Document Requests</h4>
        <div className="space-y-3">
          {documentRequests.slice(0, 3).map(req => (
            <div key={req.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
              <div>
                <p className="font-semibold">{req.student}</p>
                <p className="text-sm text-gray-400">{req.documentType}</p>
              </div>
              <p className="text-sm font-bold text-yellow-400">{req.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

const StudentRecordsView = ({ students, getStatusColor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredStudents = useMemo(() =>
    students.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.program.toLowerCase().includes(searchTerm.toLowerCase())
    ), [students, searchTerm]);

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Student Records</h3>
        <input type="search" placeholder="Search by name, ID, or program..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-1/3 shadow-inner appearance-none border border-gray-700 rounded-lg py-2 px-4 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
        <div className="grid grid-cols-5 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
          <div className="col-span-2">Student Name</div>
          <div>Program</div>
          <div className="text-center">Status</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="space-y-2">
          {filteredStudents.map(student => (
            <div key={student.id} className="grid grid-cols-5 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-lg">
              <div className="col-span-2 flex items-center gap-3">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-xs text-gray-400">{student.id}</p>
                </div>
              </div>
              <div className="text-gray-300">{student.program}</div>
              <div className="text-center">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(student.status)}`}>{student.status}</span>
              </div>
              <div className="text-right">
                <button className="px-3 py-1 text-sm rounded-md bg-purple-600 hover:bg-purple-500 transition">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CourseCatalogView = ({ courses }) => (
  <section>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">Course Catalog</h3>
      <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">Add New Course</button>
    </div>
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
      <div className="grid grid-cols-5 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
        <div>Course ID</div>
        <div className="col-span-2">Course Name</div>
        <div>Department</div>
        <div className="text-right">Credits</div>
      </div>
      <div className="space-y-2">
        {courses.map(course => (
          <div key={course.id} className="grid grid-cols-5 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
            <div className="font-mono text-sm text-gray-400">{course.id}</div>
            <div className="col-span-2 font-semibold">{course.name}</div>
            <div className="text-gray-300">{course.department}</div>
            <div className="text-right font-bold text-lg">{course.credits}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DocumentGenerationView = ({ requests, getStatusColor }) => (
  <section>
    <h3 className="text-2xl font-bold mb-6">Document Requests</h3>
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
      <div className="grid grid-cols-5 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
        <div className="col-span-2">Student</div>
        <div>Document Type</div>
        <div className="text-center">Status</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="space-y-2">
        {requests.map(req => (
          <div key={req.id} className="grid grid-cols-5 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
            <div className="col-span-2 font-semibold">{req.student} <span className="text-gray-400 font-normal">({req.studentId})</span></div>
            <div className="text-gray-300">{req.documentType}</div>
            <div className="text-center">
              <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(req.status)}`}>{req.status}</span>
            </div>
            <div className="flex gap-2 justify-end">
              {req.status === 'Pending' ? (
                <button className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-500 transition">Generate</button>
              ) : (
                <button className="px-3 py-1 text-sm rounded-md bg-sky-600 hover:bg-sky-500 transition">Download</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PlaceholderView = ({ title, message }) => (
  <section>
    <h3 className="text-2xl font-bold mb-6">{title}</h3>
    <div className="bg-black/20 p-12 rounded-2xl border border-white/10 text-center">
      <p className="text-gray-400">{message}</p>
    </div>
  </section>
);

const GraduationAuditView = () => (
  <PlaceholderView
    title="Graduation Audit"
    message="This module is under construction. It will allow auditing student records against degree requirements to determine graduation eligibility."
  />
);

const AcademicCalendarView = () => (
  <PlaceholderView
    title="Academic Calendar"
    message="This module is under construction. It will display and manage key academic dates, holidays, and deadlines."
  />
);