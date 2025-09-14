import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ simple = false }) => {
  return (
    <header
      className={`max-w-6xl mx-auto px-6 py-6 flex items-center ${
        simple ? 'justify-start' : 'justify-between'
      }`}
    >
    {simple ? (
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm">Back to Home</span>
      </Link>
    ) : (
      <>
        <Link to="/" className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-base">ERP</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">ARPANAP</h1>
            <p className="text-xs text-gray-300">Unbreakable Trust in every transaction</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/about" className="text-sm hover:underline">About us</Link>
          <Link to="/contact" className="text-sm hover:underline">Contact</Link>
          <Link to="/erp/login" className="px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-sm hover:bg-gray-800">ERP Login</Link>
          <Link to="/erp/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-sm font-semibold">Take a Demo</Link>
        </nav>
      </>
    )}
    </header>
  );
};

const Footer = () => (
  <footer className="mt-auto py-8 border-t border-white/6">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-400">© {new Date().getFullYear()} ARPANAP A College ERP — All rights reserved.</p>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/privacy" className="hover:underline">Privacy</Link>
        <Link to="/terms" className="hover:underline">Terms</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>
    </div>
  </footer>
);

export default function PageLayout({ children, simpleHeader = false }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 font-sans flex flex-col">
      <Header simple={simpleHeader} />
      {children}
      <Footer />
    </div>
  );
}