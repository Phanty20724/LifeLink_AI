import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";

export default function CTASection() {
  return (
    <div className="py-24 bg-black">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),rgba(0,0,0,0))]" />
            
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Transform Emergency Healthcare
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  With AI-Powered Solutions
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join healthcare providers worldwide using LifeLink AI to deliver faster, more accurate emergency care through AI triage, real-time coordination, and instant emergency response.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="gap-2 text-lg h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-purple-500/50"
                  >
                    <Activity className="h-5 w-5" />
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-lg h-14 px-8 bg-white/5 text-white border-white/20 hover:bg-white/10 backdrop-blur-sm"
                  >
                    Contact Sales
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <p className="mt-8 text-sm text-gray-500">
                No credit card required • 14-day free trial • HIPAA compliant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
