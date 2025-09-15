import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DashboardIcon,
  LogoutIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  ChartBarIcon,
  ChevronRightIcon,
  DocumentReportIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  MegaphoneIcon,
} from './components/Icons.js';
import dianaPrinceAvatar from './assets/diana-prince-avatar.jpg';
import alexJohnsonAvatar from './assets/alex-johnson-avatar.jpg';
import brendaSmithAvatar from './assets/brenda-smith-avatar.jpg';
import carlosGomezAvatar from './assets/carlos-gomez-avatar.jpg';

// Mock Data
const hrManager = {
  name: "Diana Prince",
  avatarUrl: dianaPrinceAvatar,
};

const stats = {
  totalEmployees: 124,
  openPositions: 5,
  pendingLeaves: 8,
};

const employees = [
  { id: 'E001', name: 'Dr. Mohd. Parvej', avatar: alexJohnsonAvatar, department: 'Computer Science', role: 'Professor', status: 'Active', joinDate: '2018-08-01', email: 'parvej@example.com', phone: '123-456-7890' },
  { id: 'E002', name: 'Brenda Smith', avatar: brendaSmithAvatar, department: 'Library', role: 'Librarian', status: 'Active', joinDate: '2020-01-15', email: 'brenda@example.com', phone: '123-456-7891' },
  { id: 'E003', name: 'Carlos Gomez', avatar: carlosGomezAvatar, department: 'Finance', role: 'Accountant', status: 'On Leave', joinDate: '2019-11-20', email: 'carlos@example.com', phone: '123-456-7892' },
  { id: 'E004', name: 'Amit Kumar', avatar: dianaPrinceAvatar, department: 'Mechanical Eng.', role: 'Associate Professor', status: 'Active', joinDate: '2021-02-10', email: 'amit@example.com', phone: '123-456-7893' },
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

const initialAnnouncements = [
  { id: 'A01', title: 'Annual Performance Review Cycle Kick-off', content: 'The annual performance review cycle for 2024 will commence from June 1st. All department heads are requested to schedule meetings with their teams.', date: '2024-05-15', author: 'Diana Prince' },
  { id: 'A02', title: 'Holiday Calendar for 2024-25 Released', content: 'The official holiday calendar for the upcoming academic year has been published on the portal. Please review it for your vacation planning.', date: '2024-05-10', author: 'Diana Prince' },
];

const payrollData = [
  { id: 'E001', name: 'Dr. Mohd. Parvej', baseSalary: 85000, allowances: 15000, deductions: 5000, netSalary: 95000 },
  { id: 'E002', name: 'Brenda Smith', baseSalary: 45000, allowances: 5000, deductions: 2000, netSalary: 48000 },
  { id: 'E003', name: 'Carlos Gomez', baseSalary: 55000, allowances: 6000, deductions: 2500, netSalary: 58500 },
  { id: 'E004', name: 'Amit Kumar', baseSalary: 70000, allowances: 12000, deductions: 4000, netSalary: 78000 },
];

export default function HRDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleLeaveAction = (id, newStatus) => {
    setLeaveRequests(
      leaveRequests.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView('employeeProfile');
  };

  const handlePostAnnouncement = (announcement) => {
    const newAnnouncement = { ...announcement, id: `A${Date.now()}`, date: new Date().toISOString().split('T')[0], author: hrManager.name };
    setAnnouncements([newAnnouncement, ...announcements]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'Approved': return 'text-green-400 bg-green-400/10';
      case 'Rejected': return 'text-red-400 bg-red-400/10';
      case 'On Leave': return 'text-sky-400 bg-sky-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView stats={stats} />;
      case 'employees':
        return <EmployeesView employees={employees} getStatusColor={getStatusColor} onViewEmployee={handleViewEmployee} />;
      case 'employeeProfile':
        return <EmployeeProfileView employee={selectedEmployee} getStatusColor={getStatusColor} onBack={() => setCurrentView('employees')} />;
      case 'recruitment':
        return <RecruitmentView />;
      case 'leave':
        return <LeaveRequestsView leaveRequests={leaveRequests} handleLeaveAction={handleLeaveAction} getStatusColor={getStatusColor} />;
      case 'payroll':
        return <PayrollView payrollData={payrollData} />;
      case 'announcements':
        return <AnnouncementsView announcements={announcements} onPostAnnouncement={handlePostAnnouncement} />;
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
          <SidebarButton icon={<UserGroupIcon />} label="Employees" view="employees" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<BriefcaseIcon />} label="Recruitment" view="recruitment" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<ClipboardListIcon />} label="Leave Requests" view="leave" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<CurrencyDollarIcon />} label="Payroll" view="payroll" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<MegaphoneIcon />} label="Announcements" view="announcements" currentView={currentView} setCurrentView={setCurrentView} />
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
          <h2 className="text-2xl font-bold capitalize">
            {currentView === 'employeeProfile' ? `Employee Profile: ${selectedEmployee?.name}` : currentView.replace(/([A-Z])/g, ' $1')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{hrManager.name}</p>
              <p className="text-sm text-gray-400">HR Manager</p>
            </div>
            <img src={hrManager.avatarUrl} alt="HR Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto bg-black/10">
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

const DashboardView = ({ stats }) => (
  <>
    <section className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/20 border border-white/10">
      <h3 className="text-3xl font-bold">Welcome, {hrManager.name.split(' ')[0]}!</h3>
      <p className="text-gray-300 mt-1">Here's your department's overview.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <StatCard label="Total Employees" value={stats.totalEmployees} />
        <StatCard label="Open Positions" value={stats.openPositions} />
        <StatCard label="Pending Leaves" value={stats.pendingLeaves} />
      </div>
    </section>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <h4 className="text-xl font-semibold mb-4">Employees by Department</h4>
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
          <p className="text-center text-gray-400">(Chart placeholder: A bar chart showing employee counts per department)</p>
          <div className="mt-4 space-y-3">
            <DepartmentBar name="Computer Science" count={45} total={124} color="bg-purple-500" />
            <DepartmentBar name="Mechanical Eng." count={30} total={124} color="bg-pink-500" />
            <DepartmentBar name="Administration" count={25} total={124} color="bg-sky-500" />
            <DepartmentBar name="Finance" count={14} total={124} color="bg-green-500" />
            <DepartmentBar name="Library" count={10} total={124} color="bg-yellow-500" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <h4 className="text-xl font-semibold mb-4">Recent Activity</h4>
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10 space-y-4">
          <ActivityItem text="You approved Carlos Gomez's sick leave." time="2 hours ago" />
          <ActivityItem text="A new application was received for Lab Technician." time="8 hours ago" />
          <ActivityItem text="Payroll for April 2024 was successfully processed." time="2 days ago" />
          <ActivityItem text="Posted new job opening: Assistant Professor, Physics." time="3 days ago" />
        </div>
      </div>
    </div>
  </>
);

const DepartmentBar = ({ name, count, total, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1 text-sm">
      <span className="font-semibold">{name}</span>
      <span className="text-gray-400">{count} Employees</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full`} style={{ width: `${(count / total) * 100}%` }}></div>
    </div>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div className="text-sm">
    <p className="text-gray-200">{text}</p>
    <p className="text-xs text-gray-500">{time}</p>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white/5 p-4 rounded-lg">
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const EmployeesView = ({ employees, getStatusColor, onViewEmployee }) => (
  <section>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">Employee Directory</h3>
      <div className="flex gap-2">
        <input type="search" placeholder="Search employees..." className="shadow-inner appearance-none border border-gray-700 rounded-lg py-2 px-4 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold">Search</button>
      </div>
    </div>
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
      <div className="grid grid-cols-6 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
        <div className="col-span-2">Employee Name</div>
        <div>Department</div>
        <div>Role</div>
        <div className="text-center">Status</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="space-y-2">
        {employees.map(emp => (
          <div key={emp.id} className="grid grid-cols-6 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-lg">
            <div className="col-span-2 flex items-center gap-3">
              <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{emp.name}</p>
                <p className="text-xs text-gray-400">{emp.id}</p>
              </div>
            </div>
            <div className="text-gray-300">{emp.department}</div>
            <div className="text-gray-300">{emp.role}</div>
            <div className="text-center">
              <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(emp.status)}`}>{emp.status}</span>
            </div>
            <div className="text-right">
              <button onClick={() => onViewEmployee(emp)} className="px-3 py-1 text-sm rounded-md bg-purple-600 hover:bg-purple-500 transition">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EmployeeProfileView = ({ employee, getStatusColor, onBack }) => (
  <section>
    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Back to Employee Directory</span>
    </button>
    <div className="bg-black/20 p-8 rounded-2xl border border-white/10 text-center">
      <p className="text-gray-400">Detailed employee profile view is under construction.</p>
      <p className="text-gray-300 mt-4">This section will display comprehensive details for <span className="font-bold text-purple-300">{employee.name}</span>, including personal information, contact details, job history, performance reviews, and assigned assets.</p>
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
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
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
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
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

const PayrollView = ({ payrollData }) => (
  <section>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">Payroll Management</h3>
      <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
        Run Payroll for May 2024
      </button>
    </div>
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
      <div className="grid grid-cols-6 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
        <div className="col-span-2">Employee Name</div>
        <div className="text-right">Base Salary</div>
        <div className="text-right">Allowances</div>
        <div className="text-right">Deductions</div>
        <div className="text-right">Net Salary</div>
      </div>
      <div className="space-y-2">
        {payrollData.map(p => (
          <div key={p.id} className="grid grid-cols-6 gap-4 items-center bg-white/5 px-4 py-3 rounded-lg">
            <div className="col-span-2 font-semibold">{p.name}</div>
            <div className="text-right text-gray-300">${p.baseSalary.toLocaleString()}</div>
            <div className="text-right text-green-400">+${p.allowances.toLocaleString()}</div>
            <div className="text-right text-red-400">-${p.deductions.toLocaleString()}</div>
            <div className="text-right font-bold text-lg">${p.netSalary.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AnnouncementsView = ({ announcements, onPostAnnouncement }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onPostAnnouncement({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">Internal Announcements</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {announcements.map(a => (
            <div key={a.id} className="bg-black/20 p-6 rounded-2xl border border-white/10">
              <h4 className="font-bold text-lg text-purple-300">{a.title}</h4>
              <p className="text-xs text-gray-500 mb-3">Posted by {a.author} on {a.date}</p>
              <p className="text-gray-300">{a.content}</p>
            </div>
          ))}
        </div>
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10 h-fit">
          <h4 className="text-xl font-semibold mb-4">Post New Announcement</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="shadow-inner w-full py-2 px-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <textarea placeholder="Content..." value={content} onChange={e => setContent(e.target.value)} required rows="5" className="shadow-inner w-full py-2 px-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            <button type="submit" className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold transition">Post</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ReportsView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">HR Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportCard title="Headcount Report" description="Department-wise employee distribution." />
            <ReportCard title="Payroll Summary" description="Generate monthly and annual payroll summaries." />
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




// I've added the DocumentReportIcon here as it was not in the provided Icons.js file.
// For better organization, you should move this and other new icons to your central `src/components/Icons.js` file.
