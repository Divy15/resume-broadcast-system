import React from 'react';

const testimonials = [
  {
    quote: "I sent 200 personalized pitches in one afternoon. Got 3 interviews within a week. PitchHR is insane.",
    name: "Aarav Mehta",
    role: "Frontend Developer",
    company: "Now at Razorpay",
    avatar: "AM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote: "The AI templates actually sound human. Every HR I reached out to thought I'd written the email personally.",
    name: "Priya Sharma",
    role: "Product Manager",
    company: "Now at Swiggy",
    avatar: "PS",
    color: "bg-purple-100 text-purple-700",
  },
  {
    quote: "Tracking opens in real-time let me follow up at exactly the right moment. Landed my dream role in 2 weeks.",
    name: "Rohan Desai",
    role: "Data Analyst",
    company: "Now at CRED",
    avatar: "RD",
    color: "bg-emerald-100 text-emerald-700",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Real People. Real Results.</h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Join thousands of job seekers who stopped waiting and started pitching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <p className="text-gray-700 leading-relaxed text-sm flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;