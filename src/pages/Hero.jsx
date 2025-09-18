import React from 'react';
import { CheckCircle, Upload, BarChart2, Shield, Database, UserCheck, PlayCircle } from 'react-feather';

export default function Hero({ onLogin }) {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-secondary text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900">AI That Catches What Human Eyes Miss.</h1>
          <p className="mt-4 text-lg text-gray-600">
            Upload your medical reports and let our AI detect hidden patterns, predict risks, and provide timely insights — empowering doctors to act earlier.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onLogin}
              className="bg-primary hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={onLogin} // Also logging in for now
              className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg border border-gray-300 flex items-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Key Value Proposition Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <BarChart2 size={40} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Early Detection</h3>
              <p className="mt-2 text-gray-600">Identifies critical risks before they become emergencies.</p>
            </div>
            <div className="flex flex-col items-center">
              <Database size={40} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Data-Driven</h3>
              <p className="mt-2 text-gray-600">Analyzes years of medical history in seconds.</p>
            </div>
            <div className="flex flex-col items-center">
              <UserCheck size={40} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Doctor-First</h3>
              <p className="mt-2 text-gray-600">Built to assist — not replace — clinicians.</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield size={40} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Secure & Compliant</h3>
              <p className="mt-2 text-gray-600">HIPAA-ready, encrypted cloud storage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <Upload size={40} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">1. Upload</h3>
              <p className="mt-2 text-gray-600">Drag & drop past medical reports (PDFs, scans).</p>
            </div>
            <div className="text-primary text-2xl mx-4">&rarr;</div>
            <div className="flex flex-col items-center">
              <BarChart2 size={40} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">2. Analyze</h3>
              <p className="mt-2 text-gray-600">AI detects trends, anomalies, and early warning signs.</p>
            </div>
            <div className="text-primary text-2xl mx-4">&rarr;</div>
            <div className="flex flex-col items-center">
              <CheckCircle size={40} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">3. Act</h3>
              <p className="mt-2 text-gray-600">Doctors review flagged risks and take timely action.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Trust Signals</h2>
          <div className="mt-8">
            <blockquote className="text-xl italic text-gray-600">
              “This AI flagged an early kidney issue my team had missed.”
            </blockquote>
            <p className="mt-4 font-semibold">- Dr. Jane Doe, Partner Hospital</p>
          </div>
          <div className="mt-12 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              <span className="font-semibold">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-green-500" />
              <span className="font-semibold">Secure Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              <span className="font-semibold">Explainable AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">Bring AI into your patient care workflow today.</h2>
          <button onClick={onLogin} className="mt-6 bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-lg">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p>&copy; 2024 AI Medical Assistant. All rights reserved.</p>
            <div className="mt-4 flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-primary">About</a>
              <a href="#" className="hover:text-primary">FAQ</a>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            {/* Social media icons can go here */}
          </div>
        </div>
      </footer>
    </div>
  );
}
