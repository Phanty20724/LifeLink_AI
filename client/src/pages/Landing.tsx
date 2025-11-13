import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import SecuritySection from "@/components/SecuritySection";
import CTASection from "@/components/CTASection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <IntegrationsSection />
      <SecuritySection />
      <CTASection />

      <footer className="border-t border-gray-800 bg-black">
        <div className="container px-4 mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-3">LifeLink AI</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                AI-powered emergency healthcare platform connecting patients, hospitals, and emergency services for faster, smarter care.
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700">HIPAA Compliant</span>
                <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700">ISO 27001</span>
                <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700">SOC 2</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white transition-colors">AI Doctor</Link></li>
                <li><Link href="/sos" className="hover:text-white transition-colors">Emergency SOS</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2025 LifeLink AI. All rights reserved.
              </p>
              <p className="text-sm text-amber-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                For medical emergencies, call your local emergency number immediately
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
