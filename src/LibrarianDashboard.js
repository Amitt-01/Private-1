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
import alexJohnsonAvatar from './assets/alex-johnson-avatar.jpg';

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
  totalMembers: 1250,
};

const notifications = [
  { id: 1, text: 'New batch of 50 Computer Science books received.', time: '2 hours ago' },
  { id:2, text: 'Request for "Advanced Quantum Mechanics" approved.', time: '1 day ago' },
  { id: 3, text: 'Reminder: Library audit scheduled for next week.', time: '3 days ago' },
];

const books = [
  { id: 'B001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Classic', status: 'Available' },
  { id: 'B002', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', category: 'Classic', status: 'Issued' },
  { id: 'B003', title: '1984', author: 'George Orwell', isbn: '978-0451524935', category: 'Dystopian', status: 'Available' },
  { id: 'B004', title: 'Data Structures & Algorithms', author: 'Narasimha Karumanchi', isbn: '978-8193245279', category: 'Computer Science', status: 'Available' },
  { id: 'B005', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Computer Science', status: 'Overdue' },
  { id: 'B006', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', category: 'Computer Science', status: 'Issued' },
];

const members = [
    { id: 'M001', name: 'Alex Johnson', avatar: alexJohnsonAvatar, type: 'Student', status: 'Active', renewalDate: '2025-08-15' },
    { id: 'M002', name: 'Dr. Mohd. Parvej', avatar: brendaSmithAvatar, type: 'Faculty', status: 'Active', renewalDate: '2025-06-30' },
    { id: 'M003', name: 'Carlos Gomez', avatar: brendaSmithAvatar, type: 'Student', status: 'Inactive', renewalDate: '2024-01-20' },
];

const circulationStats = {
    dailyIssues: 25,
    dailyReturns: 18,
    weeklyIssues: 150,
    weeklyReturns: 135,
    monthlyIssues: 620,
    monthlyReturns: 580,
    fineCollectedToday: 450,
    fineCollectedMonth: 8500,
    pendingRequests: 5,
    pendingReservations: 12,
};

const trendingBooks = [
    { ...books[4], issues: 98 }, // Clean Code
    { ...books[5], issues: 85 }, // Introduction to Algorithms
    { ...books[3], issues: 76 }, // Data Structures & Algorithms
    { ...books[1], issues: 65 }, // To Kill a Mockingbird
    { ...books[2], issues: 62 }, // 1984
    { ...books[0], issues: 51 }, // The Great Gatsby
    { id: 'B007', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', issues: 45 },
    { id: 'B008', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', issues: 41 },
    { id: 'B009', title: 'Atomic Habits', author: 'James Clear', issues: 38 },
    { id: 'B010', title: 'Dune', author: 'Frank Herbert', issues: 35 },
].sort((a, b) => b.issues - a.issues);

const popularAuthors = Object.values(
    trendingBooks.reduce((acc, book) => {
        if (!acc[book.author]) {
            acc[book.author] = { name: book.author, totalIssues: 0 };
        }
        acc[book.author].totalIssues += book.issues;
        return acc;
    }, {})
).sort((a, b) => b.totalIssues - a.totalIssues);

const popularGenres = [
    { name: 'Computer Science', issues: 259 },
    { name: 'Classic', issues: 178 },
    { name: 'Dystopian', issues: 62 },
].sort((a, b) => b.issues - a.issues);

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentView('search');
  };

  const renderView = () => {
    switch (currentView) {
        case 'dashboard': return <DashboardView />;
        case 'userManagement': return <UserManagementView />;
        case 'books': return <BooksAndResourcesView />;
        case 'circulation': return <CirculationView />;
        case 'search': return <SearchView searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />;
        case 'reports': return <AnalyticsView />;
        case 'admin': return <AdminView />;
        default: return <DashboardView />;
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
          <SidebarButton icon={<UserGroupIcon />} label="User Management" view="userManagement" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<BookOpenIcon />} label="Books & Resources" view="books" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<ChartBarIcon />} label="Circulation" view="circulation" currentView={currentView} setCurrentView={setCurrentView} />
          <SidebarButton icon={<SearchIcon />} label="Search & Catalog" view="search" currentView={currentView} setCurrentView={setCurrentView} on/>
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
            <form onSubmit={handleSearch} className="w-1/3">
                <div className="relative">
                    <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search books by title, author, ISBN..." className="shadow-inner w-full appearance-none border border-gray-700 rounded-lg py-2 pl-10 pr-4 bg-gray-800/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <div className="absolute top-0 left-0 mt-2.5 ml-3"><SearchIcon className="h-5 w-5 text-gray-400" /></div>
                </div>
            </form>
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
            <StatCard label="Total Members" value={stats.totalMembers.toLocaleString()} icon={<UserGroupIcon />} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <DashboardCard title="Circulation Statistics">
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        (Chart placeholder: Books issued vs. returned over the last 30 days)
                    </div>
                </DashboardCard>
            </div>
        </div>
    </>
);

const UserManagementView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">User Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard label="Active Users" value={members.filter(m => m.status === 'Active').length} icon={<UserGroupIcon />} />
            <StatCard label="Inactive Users" value={members.filter(m => m.status === 'Inactive').length} icon={<UserGroupIcon className="text-gray-500" />} />
            <StatCard label="Renewals Due (Next 30 Days)" value={2} icon={<BellIcon />} />
        </div>
        <DashboardCard title="All Members">
             <div className="space-y-2">
                {members.map(member => (
                    <div key={member.id} className="grid grid-cols-4 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-lg">
                        <div className="col-span-2 flex items-center gap-3">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-xs text-gray-400">{member.id}</p>
                            </div>
                        </div>
                        <div className="text-gray-300">{member.type}</div>
                        <div className="text-center">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${member.status === 'Active' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>{member.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    </section>
);

const BooksAndResourcesView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Books & Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Books Available" value={stats.totalBooks.toLocaleString()} icon={<BookOpenIcon />} />
            <StatCard label="Books Issued" value={stats.booksIssued} icon={<ChartBarIcon />} />
            <StatCard label="Books Returned (Today)" value={18} icon={<ChartBarIcon />} />
            <StatCard label="Overdue Books" value={stats.overdueBooks} icon={<BellIcon />} />
        </div>
        <DashboardCard title="Most Borrowed Books/Categories">
            <p className="text-gray-400">(Placeholder for most borrowed books/categories list)</p>
        </DashboardCard>
    </section>
);

const CirculationView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Circulation Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Issues" value={stats.booksIssued} icon={<ChartBarIcon />} />
            <StatCard label="Total Returns" value={18} icon={<ChartBarIcon />} />
            <StatCard label="Today Issues" value={circulationStats.dailyIssues} icon={<ChartBarIcon />} />
            <StatCard label="Today Returns" value={circulationStats.dailyReturns} icon={<ChartBarIcon />} />
            <StatCard label="Fine Collected (Today)" value={`$${circulationStats.fineCollectedToday}`} icon={<DocumentReportIcon />} />
            <StatCard label="Fine Collected (Week)" value={`$${circulationStats.fineCollectedMonth.toLocaleString()}`} icon={<DocumentReportIcon />} />
            <StatCard label="Pending Requests" value={circulationStats.pendingRequests} icon={<BellIcon />} />
            <StatCard label="Pending Reservations" value={circulationStats.pendingReservations} icon={<BellIcon />} />
        </div>
        <DashboardCard title="Daily/Weekly/Monthly Trends">
            <div className="h-72 pr-4">
                <div className="h-full flex flex-col">
                    <div className="flex-grow grid grid-cols-3 gap-8 items-end text-center">
                        {/* Daily */}
                        <div className="flex justify-center items-end gap-2 h-full">
                            <div className="w-12 bg-green-600/80 hover:bg-green-500 rounded-t-lg transition-all" style={{ height: `${(circulationStats.dailyIssues / 200) * 100}%` }} title={`Issued: ${circulationStats.dailyIssues}`}></div>
                            <div className="w-12 bg-red-600/80 hover:bg-red-500 rounded-t-lg transition-all" style={{ height: `${(circulationStats.dailyReturns / 200) * 100}%` }} title={`Returned: ${circulationStats.dailyReturns}`}></div>
                        </div>
                        {/* Weekly */}
                        <div className="flex justify-center items-end gap-2 h-full">
                            <div className="w-12 bg-green-600/80 hover:bg-green-500 rounded-t-lg transition-all" style={{ height: `${(circulationStats.weeklyIssues / 200) * 100}%` }} title={`Issued: ${circulationStats.weeklyIssues}`}></div>
                            <div className="w-12 bg-red-600/80 hover:bg-red-500 rounded-t-lg transition-all" style={{ height: `${(circulationStats.weeklyReturns / 200) * 100}%` }} title={`Returned: ${circulationStats.weeklyReturns}`}></div>
                        </div>
                        {/* Monthly */}
                        <div className="flex justify-center items-end gap-2 h-full">
                            <div className="w-12 bg-green-600/80 hover:bg-green-500 rounded-t-lg transition-all" style={{ height: `${(circulationStats.monthlyIssues / 700) * 100}%` }} title={`Issued: ${circulationStats.monthlyIssues}`}></div>
                            <div className="w-12 bg-red-600/80 hover:bg-red-500 rounded-t-lg transition-all" style={{ height: `${(circulationStats.monthlyReturns / 700) * 100}%` }} title={`Returned: ${circulationStats.monthlyReturns}`}></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center text-sm font-semibold text-gray-400 pt-2 border-t-2 border-gray-700">
                        <span>Daily</span>
                        <span>Weekly</span>
                        <span>Monthly</span>
                    </div>
                </div>
            </div>
        </DashboardCard>
    </section>
);

const SearchView = ({ searchTerm, setSearchTerm, selectedBook, setSelectedBook }) => {
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section>
            <h3 className="text-2xl font-bold mb-6">Search & Catalog</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <DashboardCard title={searchTerm ? `Search Results for "${searchTerm}"` : "All Books"}>
                        <div className="space-y-2">
                            {filteredBooks.map(book => (
                                <div key={book.id} onClick={() => setSelectedBook(book)} className="grid grid-cols-3 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg cursor-pointer">
                                    <div className="font-semibold col-span-2">{book.title}</div>
                                    <div className="text-gray-300">{book.author}</div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>
                <div>
                    <DashboardCard title="Book Details">
                        {selectedBook ? (
                            <div className="space-y-3">
                                <h5 className="text-lg font-bold text-purple-300">{selectedBook.title}</h5>
                                <p><span className="font-semibold text-gray-400">Author:</span> {selectedBook.author}</p>
                                <p><span className="font-semibold text-gray-400">Book Number:</span> {selectedBook.id}</p>
                                <p><span className="font-semibold text-gray-400">ISBN:</span> {selectedBook.isbn}</p>
                                <p><span className="font-semibold text-gray-400">Category:</span> {selectedBook.category}</p>
                                <p><span className="font-semibold text-gray-400">Status:</span> 
                                    <span className={`ml-2 px-2 py-1 text-xs font-bold rounded-full ${selectedBook.status === 'Available' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>{selectedBook.status}</span>
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-400">Click on a book to see its details.</p>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </section>
    );
};

const AnalyticsView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Analytics & Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard title="Usage Trends">
                <div className="space-y-3">
                    <h5 className="font-semibold text-purple-300">Top 10 Trending Books (by issues)</h5>
                    <div className="h-64 overflow-y-auto pr-2 space-y-2">
                        {trendingBooks.slice(0, 10).map((book, index) => (
                            <div key={book.id} className="bg-white/5 p-3 rounded-lg flex items-center justify-between border border-transparent hover:border-purple-500/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-gray-400 w-6 text-center">{index + 1}.</span>
                                    <div>
                                        <p className="font-semibold text-gray-100 truncate">{book.title}</p>
                                        <p className="text-xs text-gray-400">by {book.author}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>
                                    <span className="text-sm font-semibold">{book.issues}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardCard>
            <DashboardCard title="Popular Authors/Genres">
                <div className="space-y-3">
                    <h5 className="font-semibold text-purple-300">Top 10 Popular Authors</h5>
                    <div className="h-64 overflow-y-auto pr-2 space-y-2">
                        {popularAuthors.slice(0, 10).map((author, index) => (
                            <div key={author.name} className="bg-white/5 p-3 rounded-lg flex items-center justify-between border border-transparent hover:border-purple-500/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-gray-400 w-6 text-center">{index + 1}.</span>
                                    <div>
                                        <p className="font-semibold text-gray-100 truncate">{author.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>
                                    <span className="text-sm font-semibold">{author.totalIssues}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardCard>
            <DashboardCard title="Resource Utilization">
                <ResourcePieChart />
            </DashboardCard>
        </div>
    </section>
);

const ResourcePieChart = () => {
    // Easily editable data for the pie chart
    const resources = ['Books', 'E-books', 'Journals', 'Computers', 'Study Rooms'];
    const percentages = [55, 20, 10, 12, 3];
    const colors = ['#8B5CF6', '#EC4899', '#10B981', '#3B82F6', '#F59E0B'];

    let cumulativePercentage = 0;
    const gradientParts = percentages.map((p, i) => {
        const start = cumulativePercentage;
        cumulativePercentage += p;
        const end = cumulativePercentage;
        return `${colors[i]} ${start}% ${end}%`;
    });

    const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;

    return (
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div 
                className="w-36 h-36 rounded-full"
                style={{ background: conicGradient }}
                role="img"
                aria-label="Resource utilization pie chart"
            ></div>
            <div className="space-y-2 text-sm">
                <h5 className="font-semibold text-purple-300 mb-2">Utilization Breakdown</h5>
                {resources.map((resource, i) => (
                    <div key={resource} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[i] }}></div>
                        <span>{resource}: <span className="font-semibold">{percentages[i]}%</span></span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AdminView = () => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Admin Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard title="Book Management">
                <p className="text-gray-400 mb-4">Add, update, or remove books from the catalog.</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm rounded-md bg-green-600 hover:bg-green-500 transition font-semibold">Add Book</button>
                    <button className="px-4 py-2 text-sm rounded-md bg-yellow-600 hover:bg-yellow-500 transition font-semibold">Update Book</button>
                    <button className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 transition font-semibold">Remove Book</button>
                </div>
            </DashboardCard>
            <DashboardCard title="Staff Accounts">
                <p className="text-gray-400">Manage accounts for librarians and other library staff.</p>
                <button className="mt-4 text-sm font-semibold text-purple-300 hover:underline">Manage Staff</button>
            </DashboardCard>
            <DashboardCard title="Library Policies">
                <p className="text-gray-300">Configure library policies (issue limit, fine rules, etc.)</p>
            </DashboardCard>
        </div>
    </section>
);
