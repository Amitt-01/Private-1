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


const notifications = [
  { id: 1, text: 'New batch of 50 Computer Science books received.', time: '2 hours ago' },
  { id:2, text: 'Request for "Advanced Quantum Mechanics" approved.', time: '1 day ago' },
  { id: 3, text: 'Reminder: Library audit scheduled for next week.', time: '3 days ago' },
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

const initialBooks = [
  { id: 'B001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Classic', status: 'Available', publishYear: 1925, edition: '1st' },
  { id: 'B002', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', category: 'Classic', status: 'Issued', publishYear: 1960, edition: '1st' },
  { id: 'B003', title: '1984', author: 'George Orwell', isbn: '978-0451524935', category: 'Dystopian', status: 'Available', publishYear: 1949, edition: '1st' },
  { id: 'B004', title: 'Data Structures & Algorithms', author: 'Narasimha Karumanchi', isbn: '978-8193245279', category: 'Computer Science', status: 'Available', publishYear: 2008, edition: '5th' },
  { id: 'B005', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Computer Science', status: 'Overdue', publishYear: 2008, edition: '1st' },
  { id: 'B006', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', category: 'Computer Science', status: 'Issued', publishYear: 1990, edition: '3rd' },
];

const trendingBooks = [
    { ...initialBooks[4], issues: 98 }, // Clean Code
    { ...initialBooks[5], issues: 85 }, // Introduction to Algorithms
    { ...initialBooks[3], issues: 76 }, // Data Structures & Algorithms
    { ...initialBooks[1], issues: 65 }, // To Kill a Mockingbird
    { ...initialBooks[2], issues: 62 }, // 1984
    { ...initialBooks[0], issues: 51 }, // The Great Gatsby
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
    { name: 'Computer Science', issues: 259 }, // Sum of issues for CS books
    { name: 'Classic', issues: 178 },
    { name: 'Dystopian', issues: 62 },
].sort((a, b) => b.issues - a.issues);

const staffAccounts = [
    { id: 'L01', name: 'Brenda Smith', role: 'Head Librarian', avatar: brendaSmithAvatar },
    { id: 'L02', name: 'David Chen', role: 'Librarian', avatar: alexJohnsonAvatar },
    { id: 'L03', name: 'Maria Garcia', role: 'Library Assistant', avatar: brendaSmithAvatar },
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState(initialBooks);

  const stats = {
    totalBooks: books.length,
    booksIssued: books.filter(b => b.status === 'Issued' || b.status === 'Overdue').length,
    overdueBooks: books.filter(b => b.status === 'Overdue').length,
    newMembers: 42,
    totalMembers: 1250,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentView('search');
  };

  const handleAddBook = (newBook) => {
    setBooks([newBook, ...books]);
  };

  const handleUpdateBook = (updatedBook) => {
    if (window.confirm('Are you sure you want to change the book data?')) {
        setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
        setSelectedBook(updatedBook); // Update the selected book to show new data
        return true; // Indicate success
    }
    return false; // Indicate cancellation
  };

  const handleRemoveBook = (bookId) => {
    if (window.confirm('Are you sure you want to remove this book? This action cannot be undone.')) {
        setBooks(books.filter(book => book.id !== bookId));
        setSelectedBook(null); // Clear selection after deletion
    }
  };

  const renderView = () => {
    switch (currentView) {
        case 'dashboard': return <DashboardView stats={stats} />;
        case 'userManagement': return <UserManagementView />;
        case 'books': return <BooksAndResourcesView stats={stats} />;
        case 'circulation': return <CirculationView stats={stats} />;
        case 'search': return <SearchView books={books} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedBook={selectedBook} setSelectedBook={setSelectedBook} onUpdateBook={handleUpdateBook} onRemoveBook={handleRemoveBook} />;
        case 'reports': return <AnalyticsView books={books} />;
        case 'admin': return <AdminView setCurrentView={setCurrentView} onAddBook={handleAddBook} onUpdateBook={handleUpdateBook} />;
        case 'policies': return <PoliciesView setCurrentView={setCurrentView} />;
        default: return <DashboardView stats={stats} />;
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

const DashboardView = ({ stats }) => (
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

const BooksAndResourcesView = ({ stats }) => (
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

const CirculationView = ({ stats }) => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Circulation Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

const SearchView = ({ books, searchTerm, setSearchTerm, selectedBook, setSelectedBook, onUpdateBook, onRemoveBook }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleBookClick = (book) => {
        setSelectedBook(book);
        setIsUpdating(false); // Reset update form on new book selection
    };

    return (
        <section>
            <h3 className="text-2xl font-bold mb-6">Search & Catalog</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <DashboardCard title={searchTerm ? `Search Results for "${searchTerm}"` : "All Books"}>
                        <div className="space-y-2">
                            {filteredBooks.map(book => (
                                <div key={book.id} onClick={() => handleBookClick(book)} className="grid grid-cols-3 gap-4 items-center bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-lg cursor-pointer">
                                    <div className="font-semibold col-span-2">{book.title}</div>
                                    <div className="text-gray-300">{book.author}</div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>
                <div>
                    {isUpdating && selectedBook ? (
                        <UpdateBookCard book={selectedBook} onSave={onUpdateBook} onCancel={() => setIsUpdating(false)} />
                    ) : (
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
                                    <div className="flex gap-2 pt-4">
                                        <button onClick={() => setIsUpdating(true)} className="px-4 py-2 text-sm rounded-md bg-yellow-600 hover:bg-yellow-500 transition font-semibold">Update Book</button>
                                        <button onClick={() => onRemoveBook(selectedBook.id)} className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 transition font-semibold">Remove Book</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400">Click on a book to see its details.</p>
                            )}
                        </DashboardCard>
                    )}
                </div>
            </div>
        </section>
    );
};

const AnalyticsView = ({ books }) => (
    <section>
        <h3 className="text-2xl font-bold mb-6">Analytics & Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* This card now correctly uses the trendingBooks data derived from initialBooks */}
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

const AdminView = ({ setCurrentView, onAddBook, onUpdateBook }) => {
    const [isAddingStaff, setIsAddingStaff] = useState(false);
    const [isAddingBook, setIsAddingBook] = useState(false);
    const [isUpdatingBook, setIsUpdatingBook] = useState(false);
    const [bookToUpdate, setBookToUpdate] = useState(null);
    const [currentStaff, setCurrentStaff] = useState(staffAccounts);
    const [staffToDelete, setStaffToDelete] = useState(null);

    const handleAddStaff = (newStaff) => {
        setCurrentStaff([newStaff, ...currentStaff]);
        setIsAddingStaff(false);
    };

    const handleSaveBook = (newBook) => {
        onAddBook(newBook);
        setIsAddingBook(false);
    };

    const handleSelectBookToUpdate = (book) => {
        setBookToUpdate(book);
        setIsUpdatingBook(true);
        setIsAddingBook(false); // Ensure add form is closed
    };

    const handleDeleteStaff = (staffId) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            setCurrentStaff(currentStaff.filter(staff => staff.id !== staffId));
        }
    };

    return (
    <section>
        <h3 className="text-2xl font-bold mb-6">Admin Controls</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
                <DashboardCard title={isUpdatingBook ? "Update Book Details" : "Book Management"}>
                    {isAddingBook && <AddBookCard onSave={handleSaveBook} onCancel={() => setIsAddingBook(false)} />}
                    {!isAddingBook && !isUpdatingBook && <>
                    <p className="text-gray-400 mb-4">Add, update, or remove books from the catalog.</p>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setIsAddingBook(!isAddingBook)} className="px-4 py-2 text-sm rounded-md bg-green-600 hover:bg-green-500 transition font-semibold">{isAddingBook ? 'Cancel' : 'Add Book'}</button>
                    </div>
                    </>}
                </DashboardCard>
                <DashboardCard title="Library Policies">
                    <p className="text-gray-400 mb-4">View and configure library policies (issue limit, fine rules, etc.)</p>
                    <button onClick={() => setCurrentView('policies')} className="px-4 py-2 text-sm rounded-md bg-purple-600 hover:bg-purple-500 transition font-semibold">
                        Tap to view policies
                    </button>
                </DashboardCard>
            </div>

            {/* Right Column */}
            <DashboardCard title="Staff Accounts">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-400 text-sm w-2/3">Manage accounts for librarians and other library staff.</p>
                        <div className="flex gap-2">
                            <button onClick={() => setIsAddingStaff(!isAddingStaff)} className="px-3 py-1 text-xs rounded-md bg-green-600 hover:bg-green-500 transition font-semibold">{isAddingStaff ? 'Cancel' : 'Add'}</button>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                        {isAddingStaff && <AddStaffCard onSave={handleAddStaff} />}
                        {currentStaff.map((staff) => (
                            <div key={staff.id} className="bg-white/5 p-3 rounded-lg flex items-center justify-between border border-transparent hover:border-purple-500/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-gray-100">{staff.name}</p>
                                        <p className="text-xs text-gray-400">ID: {staff.id} &bull; {staff.role}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteStaff(staff.id)} className="px-3 py-1 text-xs rounded-md bg-red-600/80 hover:bg-red-500 transition font-semibold opacity-0 group-hover:opacity-100">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardCard>
        </div>
    </section>
    );
};

const AddBookCard = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [id, setId] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [edition, setEdition] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        const newBook = {
            id, title, author, publishYear, edition,
            isbn: 'N/A', category: 'Uncategorized', status: 'Available'
        };
        onSave(newBook);
    };

    return (
        <form onSubmit={handleSave} className="bg-white/10 p-4 rounded-lg border border-purple-500/50 space-y-3 mb-4">
            <h5 className="font-semibold text-purple-300 -mt-1">Add New Book</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Book Name" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Writer Name" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
                <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="Book ID" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
                <input type="number" value={publishYear} onChange={e => setPublishYear(e.target.value)} placeholder="Publish Year" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
                <input type="text" value={edition} onChange={e => setEdition(e.target.value)} placeholder="Book Edition" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="px-3 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition font-semibold">Cancel</button>
                <button type="submit" className="px-3 py-1 text-xs rounded-md bg-green-600 hover:bg-green-500 transition font-semibold">Save Book</button>
            </div>
        </form>
    );
};

const UpdateBookCard = ({ book, onSave, onCancel }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [publishYear, setPublishYear] = useState(book.publishYear);
    const [edition, setEdition] = useState(book.edition);

    const handleSave = (e) => {
        e.preventDefault();
        const updatedBook = {
            ...book,
            title,
            author,
            publishYear,
            edition,
        };
        if (onSave(updatedBook)) {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSave} className="bg-white/10 p-4 rounded-lg border border-yellow-500/50 space-y-3 mb-4">
            <h5 className="font-semibold text-yellow-300 -mt-1">Update: {book.title}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Book Name" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400" />
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Writer Name" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400" />
                <input type="text" value={book.id} readOnly placeholder="Book ID" className="w-full text-sm py-1.5 px-2 bg-gray-900/70 rounded-md text-gray-400 cursor-not-allowed" />
                <input type="number" value={publishYear} onChange={e => setPublishYear(e.target.value)} placeholder="Publish Year" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400" />
                <input type="text" value={edition} onChange={e => setEdition(e.target.value)} placeholder="Book Edition" required className="w-full text-sm py-1.5 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="px-3 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition font-semibold">Cancel</button>
                <button type="submit" className="px-3 py-1 text-xs rounded-md bg-yellow-600 hover:bg-yellow-500 transition font-semibold">Save Changes</button>
            </div>
        </form>
    );
};

const AddStaffCard = ({ onSave }) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        // In a real app, you would add the new staff member to your state/database
        const newStaff = { name, id, role, avatar: alexJohnsonAvatar };
        onSave(newStaff);
    };

    return (
        <form onSubmit={handleSave} className="bg-white/10 p-4 rounded-lg border border-purple-500/50 space-y-4">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <UserGroupIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-grow space-y-2">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Member Name" required className="w-full text-sm py-1 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Member ID" required className="w-full text-sm py-1 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role/Post" required className="w-full text-sm py-1 px-2 bg-gray-800/60 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400" />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button type="submit" className="px-3 py-1 text-xs rounded-md bg-green-600 hover:bg-green-500 transition font-semibold">
                    Save
                </button>
            </div>
        </form>
    );
};

const PoliciesView = ({ setCurrentView }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [policiesText, setPoliciesText] = useState(`📖 Library Policies

1. Membership Policy
Only registered members can use library resources.
Membership card/ID must be presented for entry and transactions.
Membership renewal is required annually or every semester.

2. Borrowing / Issue Policy
Each member may borrow a limited number of books (e.g., 3–5 at a time).
Loan period: usually 14 days to 1 month.
Reference books, rare collections, and journals are for in-library use only.

3. Return & Renewal Policy
Books must be returned on or before the due date.
Renewal is permitted if the book is not reserved by another member.
Late returns will attract a fine (e.g., $0.25 or ₹2 per day per book).

4. Reservation Policy
Books already issued may be reserved by another member.
Reservations are processed on a first-come, first-served basis.

5. Fine & Penalty Policy
Overdue fines apply for late returns.
Lost or damaged books must be replaced with the same edition or paid for at current cost + processing fees.
Repeated delays may result in suspension of borrowing privileges.

7. Conduct & Discipline Policy
Silence must be maintained inside the library.
Mobile phones must be on silent/vibrate mode.
Food and drinks are not allowed.
Any act of vandalism, damage, or theft will lead to strict disciplinary action.`);

    const handleSave = () => {
        // In a real app, you would send the updated policiesText to a server.
        console.log("Saving policies:", policiesText);
        setIsEditing(false);
    };

    return (
    <section>
        <div className="flex items-center justify-between mb-8">
            <div>
                <button onClick={() => setCurrentView('admin')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Admin Controls</span>
                </button>
                <h3 className="text-3xl font-bold">📖 Library Policies</h3>
            </div>
            {isEditing ? (
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
                        Save Changes
                    </button>
                </div>
            ) : (
                <button onClick={() => setIsEditing(true)} className="px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-bold shadow-lg transform hover:-translate-y-0.5 transition">
                    Edit Policies
                </button>
            )}
        </div>

        {isEditing ? (
            <textarea
                value={policiesText}
                onChange={(e) => setPoliciesText(e.target.value)}
                className="w-full h-[60vh] bg-gray-900/50 border border-purple-500 rounded-xl p-6 text-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
        ) : (
            <div className="bg-black/10 p-8 rounded-2xl prose prose-invert prose-lg max-w-none prose-h4:text-purple-300 prose-h4:font-semibold whitespace-pre-wrap">
                {policiesText}
            </div>
        )}
    </section>
    );
};
