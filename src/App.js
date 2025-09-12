import React from "react";
import ReactDOM from 'react-dom/client';
const App = () => <h1>Welcome to ERP Dashboard</h1>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ERP />);



// Premium College ERP Landing Page
// Single-file React component using Tailwind CSS classes
// Replace links (/erp/login, /erp/module/...) with real URLs when integrating

export default function ERP() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 font-sans">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-lg">ERP</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Aurora College ERP</h1>
            <p className="text-sm text-gray-300">Enterprise-level student, faculty & administration platform</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <a href="#features" className="text-sm hover:underline">Features</a>
          <a href="#modules" className="text-sm hover:underline">Modules</a>
          <a href="/erp/login" className="px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-sm hover:bg-gray-800">ERP Login</a>
          <a href="/erp/module" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-sm font-semibold">Go to ERP Module</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        
        
        <section id="features" className="mt-12">
          <h3 className="text-2xl font-bold">Premium Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {title: 'Student Lifecycle', desc: 'Admission → Enrollment → Alumni workflows with configurable forms.'},
              {title: 'Attendance & Exams', desc: 'Daily attendance, custom grading schemes, automated result publishing.'},
              {title: 'Finance & Fees', desc: 'Fee management, invoicing, scholarships and ledgers.'},
              {title: 'Timetables & Rooms', desc: 'Schedule engine, conflict detection, room allocation.'},
              {title: 'HR & Payroll', desc: 'Faculty records, payroll cycles, tax/income calculations.'},
              {title: 'Reports & Analytics', desc: 'Custom dashboards, exportable reports, BI-ready data.'}
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/6">
                <h4 className="font-semibold">{f.title}</h4>
                <p className="mt-2 text-sm text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Modules Section */}
        <section id="modules" className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Modules</h3>
            <p className="text-sm text-gray-400">Click a module to view demo / login</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {key: 'admissions', title: 'Admissions', link: '/erp/module/admissions'},
              {key: 'academics', title: 'Academics', link: '/erp/module/academics'},
              {key: 'finance', title: 'Finance', link: '/erp/module/finance'},
              {key: 'hr', title: 'HR & Payroll', link: '/erp/module/hr'},
              {key: 'attendance', title: 'Attendance', link: '/erp/module/attendance'},
              {key: 'library', title: 'Library', link: '/erp/module/library'}
            ].map((m) => (
              <a key={m.key} href={m.link} className="block p-6 rounded-xl bg-gradient-to-br from-white/3 to-white/6 border border-white/8 hover:scale-[1.02] transition transform">
                <h4 className="font-semibold text-lg">{m.title}</h4>
                <p className="mt-2 text-sm text-gray-300">Open module dashboard & quick actions</p>
                <div className="mt-4 text-sm text-yellow-300 font-semibold">Open Module</div>
              </a>
            ))}
          </div>
        </section>

        {/* Pricing / Callout */}
        <section className="mt-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-white/8 shadow-lg">
            <h3 className="text-2xl font-bold">Enterprise / Premium Plan</h3>
            <p className="mt-3 text-gray-300">Designed for institutions that want a premium polished experience with dedicated onboarding, SLAs and white-glove support.</p>

            <ul className="mt-4 text-sm text-gray-300 space-y-2">
              <li>• Dedicated account manager</li>
              <li>• On-prem or private cloud deployment</li>
              <li>• Custom integrations (LMS, Payment Gateway, Biometric)</li>
              <li>• 99.9% uptime SLA</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a href="/contact-sales" className="px-5 py-3 rounded-lg bg-yellow-400 text-black font-semibold">Contact Sales</a>
              <a href="/pricing" className="px-5 py-3 rounded-lg border border-white/10">See Pricing</a>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-700/30 to-pink-700/20 border border-white/6">
            <h4 className="text-xl font-semibold">Why 'a little expensive'?</h4>
            <p className="mt-3 text-gray-300 text-sm">Premium UX, enterprise-grade security, compliance, 24/7 support and migration services — investments that reduce administrative overhead and increase institutional brand value.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="p-4 bg-white/6 rounded">Custom Branding</div>
              <div className="p-4 bg-white/6 rounded">Advanced Analytics</div>
              <div className="p-4 bg-white/6 rounded">Dedicated Onboarding</div>
              <div className="p-4 bg-white/6 rounded">Priority Support</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 py-8 border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Aurora College ERP — All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
