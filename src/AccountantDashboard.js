import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardIcon,
  LogoutIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentReportIcon,
} from './components/Icons';
import dianaPrinceAvatar from './assets/diana-prince-avatar.jpg';
import alexJohnsonAvatar from './assets/alex-johnson-avatar.jpg';
import brendaSmithAvatar from './assets/brenda-smith-avatar.jpg';
import carlosGomezAvatar from './assets/carlos-gomez-avatar.jpg';

// --- Mock Data ---
const accountantUser = {
  name: 'Arthur Curry',
  avatarUrl: dianaPrinceAvatar, // Using a placeholder avatar
};

const dashboardStats = {
  todaysRevenue: '₹1,25,000',
  todaysExpenses: '₹45,000',
  pendingFees: 28,
  upcomingPayouts: '₹18,75,000',
};

const studentPayments = [
  { id: 'S001', name: 'Alex Johnson', avatar: alexJohnsonAvatar, program: 'B.Tech CSE', totalFees: 120000, amountPaid: 120000, status: 'Paid' },
  { id: 'S002', name: 'Brenda Smith', avatar: brendaSmithAvatar, program: 'B.A. English', totalFees: 80000, amountPaid: 40000, status: 'Partially Paid' },
  { id: 'S005', name: 'Ethan Hunt', avatar: alexJohnsonAvatar, program: 'B.Tech CSE', totalFees: 120000, amountPaid: 0, status: 'Due' },
  { id: 'S006', name: 'Fiona Glenanne', avatar: brendaSmithAvatar, program: 'B.Com', totalFees: 95000, amountPaid: 0, status: 'Overdue' },
];

const employeeSalaries = [
  { id: 'E001', name: 'Dr. Mohd. Parvej', avatar: alexJohnsonAvatar, department: 'Computer Science', netSalary: 95000, status: 'Paid' },
  { id: 'E002', name: 'Brenda Smith', avatar: brendaSmithAvatar, department: 'Library', netSalary: 48000, status: 'Paid' },
  { id: 'E003', name: 'Carlos Gomez', avatar: carlosGomezAvatar, department: 'Finance', netSalary: 58500, status: 'Pending' },
  { id: 'E004', name: 'Amit Kumar', avatar: dianaPrinceAvatar, department: 'Mechanical Eng.', netSalary: 78000, status: 'Pending' },
];

const recentTransactions = [
    {id: 'T01', type: 'Fee Deposit', name: 'Brenda Smith', amount: 40000, date: '2024-05-20'},
    {id: 'T02', type: 'Salary Payout', name: 'Dr. Mohd. Parvej', amount: 95000, date: '2024-05-01'},
    {id: 'T03', type: 'Salary Payout', name: 'Brenda Smith', amount: 48000, date: '2024-05-01'},
];

const monthlyFinancials = [
  { month: 'Jan', revenue: 800000, expenses: 500000 },
  { month: 'Feb', revenue: 950000, expenses: 600000 },
  { month: 'Mar', revenue: 1100000, expenses: 700000 },
  { month: 'Apr', revenue: 1050000, expenses: 650000 },
  { month: 'May', revenue: 1200000, expenses: 800000 },
];

const expenseBreakdown = [
  { category: 'Salaries', amount: 450000, color: '#8b5cf6' },
  { category: 'Infrastructure', amount: 150000, color: '#ec4899' },
  { category: 'Utilities', amount: 80000, color: '#0ea5e9' },
  { category: 'Supplies', amount: 50000, color: '#22c55e' },
  { category: 'Other', amount: 70000, color: '#eab308' },
];

const revenueSources = [
    { source: 'Tuition Fees', amount: 900000, color: '#14b8a6' },
    { source: 'Grants', amount: 200000, color: '#6366f1' },
    { source: 'Donations', amount: 50000, color: '#f97316' },
    { source: 'Other', amount: 50000, color: '#e11d48' },
];

const generalLedger = [
    { date: '2024-05-20', account: 'Accounts Receivable', description: 'Fee from Brenda Smith', debit: 40000, credit: 0 },
    { date: '2024-05-20', account: 'Cash', description: 'Fee from Brenda Smith', debit: 0, credit: 40000 },
    { date: '2024-05-15', account: 'Office Supplies', description: 'Purchase from Supplies Inc.', debit: 15000, credit: 0 },
    { date: '2024-05-15', account: 'Accounts Payable', description: 'Bill from Supplies Inc.', debit: 0, credit: 15000 },
];

const allTransactions = [
  // Student Payments
  { personId: 'S001', type: 'Fee', date: '2023-08-15', amount: 60000, description: 'Semester 1 Fee' },
  { personId: 'S001', type: 'Fee', date: '2024-01-10', amount: 60000, description: 'Semester 2 Fee' },
  { personId: 'S002', type: 'Fee', date: '2023-08-20', amount: 40000, description: 'Semester 1 Fee (Partial)' },

  // Employee Salaries
  { personId: 'E001', type: 'Salary', date: '2024-05-01', amount: 95000, description: 'Salary for April 2024' },
  { personId: 'E001', type: 'Salary', date: '2024-04-01', amount: 95000, description: 'Salary for March 2024' },
  { personId: 'E001', type: 'Salary', date: '2024-03-01', amount: 95000, description: 'Salary for February 2024' },
  { personId: 'E002', type: 'Salary', date: '2024-05-01', amount: 48000, description: 'Salary for April 2024' },
  { personId: 'E002', type: 'Salary', date: '2024-04-01', amount: 48000, description: 'Salary for March 2024' },
];
// --- Icons (should be moved to a central Icons.js file) ---
const PaymentsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BudgetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

export default function AccountantDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-400 bg-green-400/10';
      case 'Partially Paid': return 'text-sky-400 bg-sky-400/10';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'Due': return 'text-orange-400 bg-orange-400/10';
      case 'Overdue': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView stats={dashboardStats} />;
      case 'trackPayments':
        return <TrackPaymentsView />;
      case 'feeDeposit':
        return <FeeDepositView />;
      case 'paySalary':
        return <PaySalaryView />;
      case 'issueBill':
        return <IssueBillView />;
      case 'reports':
        return <ReportsView />;
      case 'budgeting':
        return <PlaceholderView title="Budgeting" message="This module is for managing departmental budgets, tracking expenses against budgets, and forecasting." />;
      default:
        return <DashboardView stats={dashboardStats} />;
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
          <SidebarButton icon={<PaymentsIcon />} label="Track Payments" view="trackPayments" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<CurrencyDollarIcon />} label="Fee Deposit" view="feeDeposit" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<UserGroupIcon />} label="Pay Salary" view="paySalary" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<BillIcon />} label="Issue Bill" view="issueBill" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<DocumentReportIcon />} label="Reports" view="reports" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<BudgetIcon />} label="Budgeting" view="budgeting" currentView={currentView} setCurrentView={setCurrentView} />
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
              <p className="font-semibold">{accountantUser.name}</p>
              <p className="text-sm text-gray-400">Accountant</p>
            </div>
            <img src={accountantUser.avatarUrl} alt="Accountant Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
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

const StatCard = ({ label, value }) => (
  <div className="bg-white/5 p-6 rounded-xl">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

const DashboardView = ({ stats }) => (
  <>
    <section className="mb-8">
      <h3 className="text-3xl font-bold">Welcome, {accountantUser.name.split(' ')[0]}!</h3>
      <p className="text-gray-300 mt-1">Here is your financial summary for today.</p>
    </section>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard label="Today's Revenue" value={stats.todaysRevenue} />
      <StatCard label="Today's Expenses" value={stats.todaysExpenses} />
      <StatCard label="Students with Pending Fees" value={stats.pendingFees} />
      <StatCard label="Upcoming Salary Payouts" value={stats.upcomingPayouts} />
    </div>
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
        <h4 className="text-xl font-semibold mb-4">Recent Transactions</h4>
        <div className="space-y-2">
          {recentTransactions.map(t => (
            <div key={t.id} className="grid grid-cols-3 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
              <div className="font-semibold">{t.name}</div>
              <div className={t.type === 'Fee Deposit' ? 'text-green-400' : 'text-red-400'}>{t.type}</div>
              <div className="text-right font-mono">₹{t.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
  </>
);

const BarChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.revenue, d.expenses)));
    return (
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
            <h4 className="text-xl font-semibold mb-4">{title}</h4>
            <div className="flex justify-between items-end h-64 gap-4 px-4 border-b border-l border-gray-700 pb-2 pl-2">
                {data.map(item => (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="flex items-end h-full w-full gap-1 justify-center">
                            <div className="w-1/2 bg-green-500 rounded-t-md" style={{ height: `${(item.revenue / maxValue) * 100}%` }}></div>
                            <div className="w-1/2 bg-red-500 rounded-t-md" style={{ height: `${(item.expenses / maxValue) * 100}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-400">{item.month}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-green-500"></div> Revenue</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-red-500"></div> Expenses</div>
            </div>
        </div>
    );
};

const DonutChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    
    const gradientStops = data.reduce((acc, item) => {
        const percentage = (item.amount / total) * 100;
        const end = (acc.lastEnd || 0) + percentage;
        acc.stops.push(`${item.color} ${acc.lastEnd}% ${end}%`);
        acc.lastEnd = end;
        return acc;
    }, { stops: [], lastEnd: 0 });

    const conicGradient = `conic-gradient(${gradientStops.stops.join(', ')})`;

    return (
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
            <h4 className="text-xl font-semibold mb-4">{title}</h4>
            <div className="flex items-center gap-8">
                <div 
                    className="w-40 h-40 rounded-full relative flex-shrink-0"
                    style={{ background: conicGradient }}
                >
                    <div className="absolute inset-4 bg-black/20 rounded-full"></div>
                </div>
                <div className="flex-1 space-y-2">
                    {data.map(item => (
                        <div key={item.category || item.source} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span>{item.category || item.source}</span>
                            </div>
                            <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LedgerTable = ({ data, title }) => (
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
        <h4 className="text-xl font-semibold mb-4">{title}</h4>
        <div className="grid grid-cols-6 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
            <div>Date</div>
            <div className="col-span-2">Account</div>
            <div>Description</div>
            <div className="text-right">Debit</div>
            <div className="text-right">Credit</div>
        </div>
        <div className="space-y-2">
            {data.map((entry, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
                    <div className="text-sm text-gray-400">{entry.date}</div>
                    <div className="col-span-2 font-semibold">{entry.account}</div>
                    <div className="text-sm text-gray-300">{entry.description}</div>
                    <div className="text-right font-mono text-green-400">
                        {entry.debit > 0 ? `₹${entry.debit.toLocaleString()}` : '-'}
                    </div>
                    <div className="text-right font-mono text-red-400">
                        {entry.credit > 0 ? `₹${entry.credit.toLocaleString()}` : '-'}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ReportsView = () => {
    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Financial Reports</h3>
                <button className="px-4 py-2 text-sm rounded-md bg-purple-600 hover:bg-purple-500 transition font-semibold">Export as PDF</button>
            </div>
            <div className="space-y-8">
                <BarChart data={monthlyFinancials} title="Monthly Revenue vs. Expenses (Last 5 Months)" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DonutChart data={expenseBreakdown} title="Expense Breakdown (Last Month)" />
                    <DonutChart data={revenueSources} title="Revenue Sources (YTD)" />
                </div>
                <LedgerTable data={generalLedger} title="General Ledger Summary (Recent Entries)" />
            </div>
        </section>
    );
};

const TrackPaymentsView = () => {
    const [searchId, setSearchId] = useState('');
    const [foundPerson, setFoundPerson] = useState(null);
    const [searchError, setSearchError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchError('');
        setFoundPerson(null);

        const id = searchId.trim().toLowerCase();
        if (!id) return;

        const student = studentPayments.find(s => s.id.toLowerCase() === id);
        if (student) {
            setFoundPerson({ ...student, type: 'Student' });
            return;
        }

        const employee = employeeSalaries.find(emp => emp.id.toLowerCase() === id);
        if (employee) {
            setFoundPerson({ ...employee, type: 'Employee' });
            return;
        }

        setSearchError(`No student or employee found with ID "${searchId}".`);
    };

    const personTransactions = useMemo(() => {
        if (!foundPerson) return [];
        return allTransactions.filter(t => t.personId === foundPerson.id)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [foundPerson]);

    return (
        <section>
            <h3 className="text-2xl font-bold mb-6">Track Payments</h3>
            
            <div className="bg-black/20 p-6 rounded-2xl border border-white/10 mb-8">
                <h4 className="text-xl font-semibold mb-4">Find Payment History</h4>
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter Student or Employee ID (e.g., S002, E001)"
                        required
                        className="flex-grow shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button type="submit" className="px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold transition">Search</button>
                </form>
                {searchError && <p className="text-red-400 mt-4">{searchError}</p>}
            </div>

            {foundPerson ? (
                <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                        <img src={foundPerson.avatar} alt={foundPerson.name} className="w-16 h-16 rounded-full" />
                        <div>
                            <h4 className="text-2xl font-bold">{foundPerson.name} <span className="text-lg font-normal text-gray-400">({foundPerson.id})</span></h4>
                            <p className="text-purple-300">{foundPerson.type === 'Student' ? foundPerson.program : foundPerson.department}</p>
                        </div>
                    </div>
                    <h5 className="text-lg font-semibold mb-4">Transaction History</h5>
                    <div className="space-y-2">
                        {personTransactions.length > 0 ? personTransactions.map((t, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
                                <div className="font-semibold">{t.date}</div>
                                <div>{t.description}</div>
                                <div className={`text-right font-mono ${t.type === 'Fee' ? 'text-green-400' : 'text-red-400'}`}>
                                    {t.type === 'Fee' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-400 text-center py-4">No transactions found for this person.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xl font-semibold mb-4">Recent Transactions</h4>
                    <div className="grid grid-cols-4 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Date</div>
                        <div className="text-right">Amount</div>
                    </div>
                    <div className="space-y-2">
                        {recentTransactions.map(t => (
                            <div key={t.id} className="grid grid-cols-4 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg">
                                <div className="font-semibold">{t.name}</div>
                                <div className={`font-semibold ${t.type === 'Fee Deposit' ? 'text-green-400' : 'text-red-400'}`}>{t.type}</div>
                                <div>{t.date}</div>
                                <div className="text-right font-mono">₹{t.amount.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

const FeeDepositView = () => {
    const [studentId, setStudentId] = useState('');
    const [amount, setAmount] = useState('');
    const [foundStudent, setFoundStudent] = useState(null);
    const [searchError, setSearchError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchError('');
        const student = studentPayments.find(s => s.id.toLowerCase() === studentId.toLowerCase());
        if (student) {
            setFoundStudent(student);
        } else {
            setFoundStudent(null);
            setSearchError(`Student with ID "${studentId}" not found.`);
        }
    };

    const handleDeposit = (e) => {
        e.preventDefault();
        console.log(`Depositing ${amount} for student ${foundStudent.id}`);
        // Reset form
        setStudentId('');
        setAmount('');
        setFoundStudent(null);
        // Show confirmation
        alert('Fee deposited successfully!');
    };

    return (
        <section>
            <h3 className="text-2xl font-bold mb-6">Deposit Student Fee</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-black/20 p-8 rounded-2xl border border-white/10">
                    <h4 className="text-xl font-semibold mb-4">Step 1: Find Student</h4>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter Student ID (e.g., S002)"
                            required
                            className="flex-grow shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button type="submit" className="px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold transition">Search</button>
                    </form>
                    {searchError && <p className="text-red-400 mt-4">{searchError}</p>}
                </div>

                {foundStudent && (
                    <div className="bg-black/20 p-8 rounded-2xl border border-white/10">
                        <h4 className="text-xl font-semibold mb-4">Step 2: Enter Payment Details</h4>
                        <div className="mb-6 bg-white/5 p-4 rounded-lg">
                            <p>Student: <span className="font-bold">{foundStudent.name}</span></p>
                            <p>Program: <span className="font-bold">{foundStudent.program}</span></p>
                            <p>Fees Due: <span className="font-bold font-mono">₹{(foundStudent.totalFees - foundStudent.amountPaid).toLocaleString()}</span></p>
                        </div>
                        <form onSubmit={handleDeposit} className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">Amount to Deposit</label>
                                <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="Enter amount" className="shadow-inner w-full py-3 px-4 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div>
                                <label htmlFor="payment-method" className="block text-gray-300 text-sm font-bold mb-2">Payment Method</label>
                                <select id="payment-method" required className="shadow-inner w-full py-3 px-4 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>Bank Transfer</option>
                                    <option>Credit/Debit Card</option>
                                    <option>Cash</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
                                Confirm Deposit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
};

const IssueBillView = () => {
    const [vendor, setVendor] = useState('');
    const [billDate, setBillDate] = useState(new Date().toISOString().slice(0, 10));
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleIssueBill = (e) => {
        e.preventDefault();
        console.log('Issuing new bill:', { vendor, billDate, dueDate, amount, description });
        // In a real app, you'd send this to a server.
        alert('Bill issued successfully!');
        // Reset form
        setVendor('');
        setBillDate(new Date().toISOString().slice(0, 10));
        setDueDate('');
        setAmount('');
        setDescription('');
    };

    return (
        <section>
            <h3 className="text-2xl font-bold mb-6">Issue New Bill for College Expenses</h3>
            <div className="bg-black/20 p-8 rounded-2xl border border-white/10 max-w-4xl mx-auto">
                <form onSubmit={handleIssueBill} className="space-y-6">
                    <div>
                        <label htmlFor="vendor" className="block text-gray-300 text-sm font-bold mb-2">Bill To (Vendor/Department)</label>
                        <input id="vendor" type="text" value={vendor} onChange={e => setVendor(e.target.value)} required placeholder="e.g., Office Supplies Inc." className="shadow-inner w-full py-3 px-4 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="bill-date" className="block text-gray-300 text-sm font-bold mb-2">Bill Date</label>
                            <input id="bill-date" type="date" value={billDate} onChange={e => setBillDate(e.target.value)} required className="shadow-inner w-full py-3 px-4 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label htmlFor="due-date" className="block text-gray-300 text-sm font-bold mb-2">Due Date</label>
                            <input id="due-date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required className="shadow-inner w-full py-3 px-4 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label htmlFor="bill-amount" className="block text-gray-300 text-sm font-bold mb-2">Amount (₹)</label>
                            <input id="bill-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="e.g., 15000" className="shadow-inner w-full py-3 px-4 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Description / Line Items</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows="4" placeholder="Describe the expense(s)..." className="shadow-inner w-full py-3 px-4 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                    </div>

                    <div className="text-right">
                        <button type="submit" className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
                            Issue Bill
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const PaySalaryView = () => {
    const formatCurrency = (num) => `₹${num.toLocaleString()}`;

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Pay Employee Salaries</h3>
                <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
                    Run Payroll for May 2024
                </button>
            </div>
            <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
                <div className="grid grid-cols-5 gap-4 font-semibold text-gray-400 px-4 py-2 border-b border-white/10 mb-2">
                    <div className="col-span-2">Employee Name</div>
                    <div className="text-right">Net Salary</div>
                    <div className="text-center">Status</div>
                    <div className="text-right">Action</div>
                </div>
                <div className="space-y-2">
                    {employeeSalaries.map(p => (
                        <div key={p.id} className="grid grid-cols-5 gap-4 items-center bg-white/5 px-4 py-3 rounded-lg">
                            <div className="col-span-2 flex items-center gap-3">
                                <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-xs text-gray-400">{p.department}</p>
                                </div>
                            </div>
                            <div className="text-right font-mono text-lg">{formatCurrency(p.netSalary)}</div>
                            <div className="text-center">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${p.status === 'Paid' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{p.status}</span>
                            </div>
                            <div className="text-right">
                                {p.status === 'Pending' ? (
                                    <button className="px-4 py-1 text-sm rounded-md bg-purple-600 hover:bg-purple-500 transition">Pay Now</button>
                                ) : (
                                    <p className="text-sm text-gray-500">Paid</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PlaceholderView = ({ title, message }) => (
  <section>
    <h3 className="text-2xl font-bold mb-6">{title}</h3>
    <div className="bg-black/20 p-12 rounded-2xl border border-white/10 text-center">
      <p className="text-gray-400">{message}</p>
    </div>
  </section>
);