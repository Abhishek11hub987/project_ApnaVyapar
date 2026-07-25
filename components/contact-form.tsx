"use client";

import { useState } from "react";
import { submitSupportMessage } from "@/app/actions/support";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await submitSupportMessage(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  if (status === "success") {
    return (
      <div className="bg-cyan/10 border border-cyan/20 p-8 rounded-2xl text-center">
        <div className="w-16 h-16 bg-cyan/20 text-cyan rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-white/60 mb-6">Thank you for reaching out. We will get back to you as soon as possible.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
      
      {status === "error" && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-1">Your Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1">Your Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-white/60 mb-1">Subject (Optional)</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
            placeholder="How can we help?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-1">Message</label>
          <textarea 
            id="message" 
            name="message" 
            required
            rows={5}
            className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors resize-y"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan to-cyan-dark text-white font-semibold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}
