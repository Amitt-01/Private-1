import React, { useState } from 'react';
import PageLayout from './components/PageLayout';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    // In a real app, you would send the form data to a server here.
    // We'll simulate a network request with a timeout.
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
  };

  return (
    <PageLayout simpleHeader={true}>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">Get in Touch</h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Have questions about our platform, pricing, or features? We're here to help. Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </section>

        <div className="bg-black/20 p-8 rounded-2xl shadow-2xl border border-white/10">
          {status === 'success' ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold text-green-400">Thank You!</h3>
              <p className="text-gray-300 mt-2">Your message has been sent successfully. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-2">First name</label>
                  <input required type="text" name="first-name" id="first-name" autoComplete="given-name" className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-2">Last name</label>
                  <input required type="text" name="last-name" id="last-name" autoComplete="family-name" className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input required type="email" name="email" id="email" autoComplete="email" className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea required name="message" id="message" rows={4} className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800/50 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                </div>
              </div>
              <div className="mt-8 text-right">
                <button type="submit" disabled={status === 'sending'} className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-sm font-semibold transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </PageLayout>
  );
}