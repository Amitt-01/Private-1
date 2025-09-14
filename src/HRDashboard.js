import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DashboardIcon,
  StudentsIcon,
  LogoutIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  ChartBarIcon,
  AttendanceIcon,
  ChevronRightIcon,
} from './components/Icons'; // Assuming new icons are added here
import dianaPrinceAvatar from './assets/diana-prince-avatar.jpg';
import alexJohnsonAvatar from './assets/alex-johnson-avatar.jpg';
import brendaSmithAvatar from './assets/brenda-smith-avatar.jpg';
import carlosGomezAvatar from './assets/carlos-gomez-avatar.jpg';

// Mock Data
const hrUser = {
  name: "Diana Prince",
  avatarUrl: dianaPrinceAvatar,
};

const stats = {
  totalEmployees: 124,
  openPositions: 5,
  pendingLeaves: 8,
};

const employees = [
  { id: 'E001', name: 'Dr. Mohd. Parvej', avatar: alexJohnsonAvatar, role: 'Professor, CS', status: 'Active' },
  { id: 'E002', name: 'Brenda Smith', avatar: brendaSmithAvatar, role: 'Librarian', status: 'Active' },
  { id: 'E003', name: 'Carlos Gomez', avatar: carlosGomezAvatar, role: 'Accountant', status: 'On Leave' },
  { id: 'E004', name: 'Amit Kumar', avatar: dianaPrinceAvatar, role: 'Associate Professor, ME', status: 'Active' },
];

const jobOpenings = [
  { id: 'J01', title: 'Assistant Professor, Physics', department: 'Science', status: 'Open', applications: 12 },
  { id: 'J02', title: 'Lab Technician', department: 'Chemistry', status: 'Open', applications: 25 },
  { id: 'J03', title: 'Senior Accountant', department: 'Finance', status: 'Closed', applications: 42 },
];

const initialLeaveRequests = [
  { id: 'L001', employee: 'Dr. Mohd. Parvej', type: 'Casual Leave', from: '2024-05-20', to: '2024-05-21', reason: 'Personal work', status: 'Pending' },
  { id: 'L002', employee: 'Carlos Gomez', type: 'Sick Leave', from: '2024-05-18', to: '2024-05-22', reason: 'Fever', status: 'Approved' },
  { id: 'L003', employee: 'Brenda Smith', type: 'Privilege Leave', from: '2024-06-10', to: '2024-06-15', reason: 'Family vacation', status: 'Pending' },
  { id: 'L004', employee: 'Amit Kumar', type: 'Casual Leave', from: '2024-05-19', to: '2024-05-19', reason: 'Bank work', status: 'Rejected' },
];

const performanceReviews = [
    { id: 'P01', employee: 'Dr. Mohd. Parvej', date: '2024-04-15', rating: 4.5, summary: 'Exceeded expectations in research publications.' },
    { id: 'P02', employee: 'Brenda Smith', date: '2024-04-10', rating: 4.0, summary: 'Met all targets for library digitization.' },
];

export default function HRDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  const handleLeaveAction = (id, newStatus) => {
    setLeaveRequests(
      leaveRequests.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'Approved': return 'text-green-400 bg-green-400/10';
      case 'Rejected': return 'text-red-400 bg-red-400/10';
      case 'On Leave': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'employees':
        return <EmployeesView />;
      case 'recruitment':
        return <RecruitmentView />;
      case 'leave':
        return <LeaveRequestsView leaveRequests={leaveRequests} handleLeaveAction={handleLeaveAction} getStatusColor={getStatusColor} />;
      case 'attendance':
        return <AttendanceView />;
      case 'performance':
        return <PerformanceView getStatusColor={getStatusColor} />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
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
          <SidebarButton icon={<DashboardIcon />} label="Dashboard" view="dashboard" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<StudentsIcon />} label="Employees" view="employees" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<BriefcaseIcon />} label="Recruitment" view="recruitment" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<ClipboardListIcon />} label="Leave Requests" view="leave" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<AttendanceIcon />} label="Attendance" view="attendance" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<ChartBarIcon />} label="Performance" view="performance" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<DocumentReportIcon />} label="Reports" view="reports" currentView={currentView} setCurrentView={setCurrentView} />
        </nav>

        <div>
          <Link to="/erp/login" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300">
            <LogoutIcon /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="bg-black/10 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">{currentView.replace(/([A-Z])/g, ' $1')}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{hrUser.name}</p>
              <p className="text-sm text-gray-400">HR Manager</p>
            </div>
            <img src={hrUser.avatarUrl} alt="HR Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

const SidebarButton = ({ icon, label, view, currentView, setCurrentView }) => (
  <button onClick={() => setCurrentView(view)} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${currentView === view ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/5 text-gray-300'}`}>
    {icon} {label}
  </button>
);

// --- Views ---

const DashboardView = () => (
  <>
    <section className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/20 border border-white/10">
      <h3 className="text-3xl font-bold">Welcome, {hrUser.name.split(' ')[0]}!</h3>
      <p className="text-gray-300 mt-1">Here's your department's overview.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <StatCard label="Total Employees" value={stats.totalEmployees} />
        <StatCard label="Open Positions" value={stats.openPositions} />
        <StatCard label="Pending Leaves" value={stats.pendingLeaves} />
      </div>
    </section>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <section>
                <h4 className="text-xl font-semibold mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <QuickActionButton label="Add Employee" />
                    <QuickActionButton label="Post New Job" />
                    <QuickActionButton label="Generate Report" />
                </div>
            </section>
            <section>
                <h4 className="text-xl font-semibold mb-4">Upcoming Onboardings</h4>
                <div className="bg-black/10 p-6 rounded-xl text-center text-gray-400">
                    <p>No upcoming onboardings scheduled.</p>
                </div>
            </section>
        </div>
        <div className="space-y-8">
            <section>
                <h4 className="text-xl font-semibold mb-4">Recent Activity</h4>
                <ul className="space-y-3">
                    <li className="text-sm text-gray-300">You approved <span className="font-semibold text-white">Carlos Gomez's</span> sick leave.</li>
                    <li className="text-sm text-gray-300">A new application was received for <span className="font-semibold text-white">Lab Technician</span>.</li>
                    <li className="text-sm text-gray-300">Posted new job opening: <span className="font-semibold text-white">Assistant Professor, Physics</span>.</li>
                </ul>
            </section>
        </div>
    </div>
  </>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white/5 p-4 rounded-lg">
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const QuickActionButton = ({ label }) => (
    <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition">
        <p className="font-semibold">{label}</p>
    </button>
);

const EmployeesView = ({ getStatusColor }) => (
  <section>
    <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Employee Directory</h3>
        <div className="flex gap-2">
            <input type="search" placeholder="Search employees..." className="shadow-inner appearance-none border border-gray-700 rounded-lg py-2 px-4 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold">Search</button>
        </div>
    </div>
    <div className="bg-black/10 p-6 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
            <img src={emp.avatar} alt={emp.name} className="w-14 h-14 rounded-full" />
            <div>
              <p className="font-semibold text-lg">{emp.name}</p>
              <p className="text-sm text-gray-400">{emp.role}</p>
              <p className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-full inline-block ${getStatusColor ? getStatusColor(emp.status) : ''}`}>{emp.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RecruitmentView = () => (
    <section>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Recruitment Pipeline</h3>
            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
                Post New Job
            </button>
        </div>
        <div className="bg-black/10 p-6 rounded-2xl">
            <h4 className="text-xl font-semibold mb-4">Current Openings</h4>
            <div className="space-y-4">
                {jobOpenings.map(job => (
                    <div key={job.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-lg">{job.title}</p>
                            <p className="text-sm text-gray-400">{job.department}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <p className="font-bold text-xl">{job.applications}</p>
                                <p className="text-xs text-gray-400">Applications</p>
                            </div>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${job.status === 'Open' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                                {job.status}
                            </span>
                            <a href="#" className="p-2 rounded-md hover:bg-white/10">
                                <ChevronRightIcon />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const LeaveRequestsView = ({ leaveRequests, handleLeaveAction, getStatusColor }) => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Leave Management</h3>
        <div className="bg-black/10 p-6 rounded-2xl">
            <div className="grid grid-cols-6 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
                <div>Employee</div>
                <div>Leave Type</div>
                <div>From</div>
                <div>To</div>
                <div className="text-center">Status</div>
                <div className="text-right">Actions</div>
            </div>
            <div className="space-y-2">
                {leaveRequests.map(req => (
                    <div key={req.id} className="grid grid-cols-6 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
                        <div className="font-semibold">{req.employee}</div>
                        <div className="text-gray-300">{req.type}</div>
                        <div className="text-gray-300">{req.from}</div>
                        <div className="text-gray-300">{req.to}</div>
                        <div className="text-center">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(req.status)}`}>
                                {req.status}
                            </span>
                        </div>
                        <div className="flex gap-2 justify-end">
                            {req.status === 'Pending' ? (
                                <>
                                    <button onClick={() => handleLeaveAction(req.id, 'Approved')} className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-500 transition">Approve</button>
                                    <button onClick={() => handleLeaveAction(req.id, 'Rejected')} className="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-500 transition">Reject</button>
                                </>
                            ) : (
                                <p className="text-sm text-gray-500">Handled</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const AttendanceView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Employee Attendance</h3>
        <div className="bg-black/10 p-8 rounded-2xl text-center">
            <p className="text-gray-400">Full-featured attendance tracking and reporting is under development.</p>
            <p className="text-gray-400 mt-2">This section will include daily logs, monthly summaries, and anomaly detection.</p>
        </div>
    </section>
);

const PerformanceView = ({ getStatusColor }) => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Performance Reviews</h3>
        <div className="bg-black/10 p-6 rounded-2xl">
            <h4 className="text-xl font-semibold mb-4">Recent Reviews</h4>
            <div className="space-y-4">
                {performanceReviews.map(review => (
                    <div key={review.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-lg">{review.employee}</p>
                                <p className="text-sm text-gray-400">Reviewed on: {review.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-300">Rating</p>
                                <p className="font-bold text-2xl text-purple-300">{review.rating} / 5</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-300 text-sm">
                            <span className="font-semibold text-gray-200">Summary:</span> {review.summary}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ReportsView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">HR Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportCard title="Headcount Report" description="Department-wise employee distribution." />
            <ReportCard title="Salary-slip" description="Generate Salary-slip of all employees." />
            <ReportCard title="Leave Balance Report" description="Annual leave balances for all staff." />
            <ReportCard title="Recruitment Funnel" description="Effectiveness of hiring channels." />
            <ReportCard title="Attendance Summary" description="Monthly attendance and absenteeism rates." />
            <ReportCard title="Employee Turnover" description="Quarterly and annual turnover rates." />
        </div>
    </section>
);

const ReportCard = ({ title, description }) => (
    <div className="bg-black/10 p-6 rounded-2xl border border-white/10 hover:bg-black/20 transition-colors cursor-pointer">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-400 mt-2">{description}</p>
        <button className="mt-4 text-sm font-semibold text-purple-300 hover:underline">Generate Report</button>
    </div>
);


/**
 * Note on "Pages vs. Views"
 * 
 * For this HR Dashboard, I've created different "views" (Dashboard, Employees, etc.) that are managed by
 * component state within the single `HRDashboard.js` file. This is a common and efficient pattern for 
 * Single Page Applications (SPAs) as it provides a seamless experience without full page reloads.
 * 
 * If your project requires each of these sections to be a distinct page with its own URL 
 * (e.g., `/hr/employees`, `/hr/recruitment`), the structure can be refactored to use nested routing 
 * with `react-router-dom`. For now, this single-component approach provides the requested functionality 
 * while maintaining a user-friendly, contained dashboard environment.
 */

const DocumentReportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


// I've added the DocumentReportIcon here as it was not in the provided Icons.js file.
// For better organization, you should move this and other new icons to your central `src/components/Icons.js` file.


















































































































































































































































































































































































