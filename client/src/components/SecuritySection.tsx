import { Shield, Lock, Eye, FileCheck } from "lucide-react";

export default function SecuritySection() {
  return (
    <div className="py-24 bg-black">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Security & Compliance
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  You Can Trust
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Enterprise-grade security protecting your medical data and ensuring compliance with healthcare regulations worldwide.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <Shield className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">End-to-End Encryption</h3>
                    <p className="text-gray-400 text-sm">All medical data encrypted in transit and at rest</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <Lock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">HIPAA Compliant</h3>
                    <p className="text-gray-400 text-sm">Full compliance with healthcare privacy regulations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <Eye className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Privacy First</h3>
                    <p className="text-gray-400 text-sm">Your data is never sold or shared with third parties</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <FileCheck className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">ISO 27001 Certified</h3>
                    <p className="text-gray-400 text-sm">International security management standard</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-3xl opacity-20" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-white">SOC 2 Type II</span>
                    <span className="text-green-400">✓ Certified</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-white">GDPR Compliant</span>
                    <span className="text-green-400">✓ Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-white">HIPAA Compliant</span>
                    <span className="text-green-400">✓ Audited</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-white">ISO 27001</span>
                    <span className="text-green-400">✓ Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
