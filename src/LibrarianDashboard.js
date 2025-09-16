import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardIcon,
  LogoutIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  SearchIcon,
  CogIcon,
  BellIcon,
  DocumentReportIcon,
} from './components/Icons';
import brendaSmithAvatar from './assets/brenda-smith-avatar.jpg';

// Mock Data
const librarianUser = {
  name: 'Brenda Smith',
  avatarUrl: brendaSmithAvatar,
};

const stats = {
  totalBooks: 15230,
  booksIssued: 256,
  overdueBooks: 18,
  newMembers: 42,
};

const notifications = [
  { id: 1, text: 'New batch of 50 Computer Science books received.', time: '2 hours ago' },
  { id:2, text: 'Request for "Advanced Quantum Mechanics" approved.', time: '1 day ago' },
  { id: 3, text: 'Reminder: Library audit scheduled for next week.', time: '3 days ago' },
];

const SidebarButton = ({ icon, label, view, currentView, setCurrentView }) => (
  <button
    onClick={() => setCurrentView(view)}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
      currentView === view
        ? 'bg-white/10 text-white font-semibold'
        : 'hover:bg-white/5 text-gray-300'
    }`}
  >
    {React.cloneElement(icon, { className: 'h-5 w-5' })} {label}
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

const DashboardCard = ({ title, children }) => (
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
        <h4 className="text-xl font-semibold mb-4">{title}</h4>
        {children}
    </div>
);


export default function LibrarianDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    // For now, all views render the main dashboard content.
    // This can be expanded with specific components for each view.
    return <DashboardView />;
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
          <SidebarButton icon={<UserGroupIcon />} label="User Management" view="userManagement" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<BookOpenIcon />} label="Books & Resources" view="books" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<ChartBarIcon />} label="Circulation" view="circulation" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<SearchIcon />} label="Search & Catalog" view="search" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<DocumentReportIcon />} label="Analytics & Reports" view="reports" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<CogIcon />} label="Admin" view="admin" currentView={currentView} setCurrentView={setCurrentView} />
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
          <div className="flex items-center gap-6">
            <div className="relative group">
                <BellIcon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 border border-white/10 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-4 font-semibold border-b border-white/10">Notifications</div>
                    <div className="p-2 space-y-1">
                        {notifications.map(n => (
                            <div key={n.id} className="p-2 rounded-lg hover:bg-white/5">
                                <p className="text-sm text-gray-200">{n.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{librarianUser.name}</p>
                <p className="text-sm text-gray-400">Librarian</p>
              </div>
              <img src={librarianUser.avatarUrl} alt="Librarian Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto bg-black/10">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

const DashboardView = () => (
    <>
        <section className="mb-8">
            <h3 className="text-3xl font-bold">Welcome, {librarianUser.name.split(' ')[0]}!</h3>
            <p className="text-gray-300 mt-1">Here is the summary of library activities.</p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Books" value={stats.totalBooks.toLocaleString()} icon={<BookOpenIcon />} />
            <StatCard label="Books Issued" value={stats.booksIssued} icon={<ChartBarIcon />} />
            <StatCard label="Overdue Books" value={stats.overdueBooks} icon={<BellIcon />} />
            <StatCard label="New Members (This Month)" value={stats.newMembers} icon={<UserGroupIcon />} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <DashboardCard title="Circulation Statistics">
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        (Chart placeholder: Books issued vs. returned over the last 30 days)
                    </div>
                </DashboardCard>
            </div>
            <div>
                <DashboardCard title="Quick Actions">
                    <div className="flex flex-col gap-4">
                        <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition font-semibold">Issue a Book</button>
                        <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition font-semibold">Return a Book</button>
                        <button className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition font-semibold">Add New Member</button>
                    </div>
                </DashboardCard>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <DashboardCard title="User Management">
                <p className="text-gray-400">Manage student and faculty library accounts, permissions, and borrowing history.</p>
                <button className="mt-4 text-sm font-semibold text-purple-300 hover:underline">Go to User Management</button>
            </DashboardCard>
            <DashboardCard title="Book & Resources">
                <p className="text-gray-400">Add, edit, or remove books, journals, and digital resources from the library catalog.</p>
                <button className="mt-4 text-sm font-semibold text-purple-300 hover:underline">Manage Resources</button>
            </DashboardCard>
            <DashboardCard title="Search & Catalog">
                <p className="text-gray-400">Perform advanced searches, manage catalog metadata, and view resource availability.</p>
                <button className="mt-4 text-sm font-semibold text-purple-300 hover:underline">Open Catalog</button>
            </DashboardCard>
            <DashboardCard title="Analytics & Reports">
                <p className="text-gray-400">Generate reports on circulation, popular books, user activity, and overdue fines.</p>
                <button className="mt-4 text-sm font-semibold text-purple-300 hover:underline">View Reports</button>
            </DashboardCard>
        </div>
    </>
);
