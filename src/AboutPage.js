import React from 'react';
import rohitAvatar from './assets/rohit.jpg';
import PageLayout from './components/PageLayout';
import amitAvatar from './assets/amit-kumar-avatar.jpg';
import abhishekAvatar from './assets/abhishek-yadav-avatar.jpg';

// Placeholder for team member avatars
const teamMembers = [
  {
    name: 'Rohit Soam',
    role: 'Founder & Lead Developer',
    avatar: rohitAvatar,
    bio: 'Rohit is the visionary behind ARPANAP, with a passion for creating secure and transparent educational technology. He leads the development with his expertise in blockchain and full-stack engineering.',
  },
  {
    name: 'Amit Kumar',
    role: 'UX/UI Designer',
    avatar: amitAvatar,
    bio: 'Amit crafts the intuitive and beautiful interfaces of ARPANAP. His focus is on creating a user-friendly experience that delights students, teachers, and administrators alike.',
  },
  {
    name: 'Abhishek Yadav',
    role: 'Backend & Security Specialist',
    avatar: abhishekAvatar,
    bio: 'Abhishek ensures the robustness and security of the ARPANAP platform. His work on blockchain integration is key to our promise of unbreakable trust.',
  },
];

export default function AboutPage() {
  return (
    <PageLayout simpleHeader={true}>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">About ARPANAP</h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            We are revolutionizing education management by building a platform founded on the principles of trust, transparency, and cutting-edge technology.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to empower educational institutions with a secure, all-in-one ERP system that streamlines administrative tasks and fosters a transparent environment for students, faculty, and parents. We believe that by leveraging blockchain technology, we can eliminate data tampering and build unbreakable trust in every academic and financial transaction.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-white/8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              We envision a future where educational management is seamless, secure, and fully transparent. A future where every stakeholder has confidence in the integrity of their institution's data, from admission records to final transcripts. ARPANAP aims to be the gold standard for educational ERP systems worldwide.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-center mb-12">Meet the Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-black/20 p-6 rounded-2xl shadow-lg border border-white/10 text-center">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-500" />
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-purple-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
}