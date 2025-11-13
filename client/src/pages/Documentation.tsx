import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Activity, ArrowLeft, Globe, Target, Network, TrendingUp, Users, MessageSquare, Phone, MapPin, Shield } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-50px" }
};

export default function Documentation() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />
      </div>

      <div className="relative z-10">
        <nav className="border-b border-white/10 backdrop-blur-xl bg-black/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="flex items-center gap-2 text-xl font-bold text-white cursor-pointer hover:opacity-80 transition-opacity">
                  <Activity className="h-6 w-6 text-purple-400" />
                  <span>LifeLink AI</span>
                </div>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="gap-2 text-gray-300 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4"
            >
              <h1 className="text-5xl font-bold text-white">
                LifeLink AI
                <span className="block text-3xl mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Documentation
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Your comprehensive guide to AI-powered emergency healthcare
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4 hover:border-blue-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Who We Are</h2>
              <p className="text-gray-400 leading-relaxed">
                LifeLink AI was created to solve one of the world's toughest challenges — staying connected when networks fail. During disasters or blackouts, our system transforms nearby devices into a mesh-based emergency network that relays SOS messages locally until one device reconnects to the cloud.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                We believe no one should be left unheard in an emergency. LifeLink AI ensures that every phone becomes a lifeline — capable of sending SOS signals without internet access, using peer-to-peer communication and AI-powered clustering.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
                <Network className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">How It Works</h2>
              <p className="text-gray-400 leading-relaxed">
                Using simulated WebRTC + Bluetooth connectivity, LifeLink AI allows SOS messages to "hop" between browsers. When any one device goes online, it uploads all stored messages to a global Rescue Dashboard that visualizes incidents, clusters them by type, and triggers voice alerts such as "⚠️ New flood cluster detected in Savar."
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4 hover:border-orange-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Impact</h2>
              <p className="text-gray-400 leading-relaxed">
                By turning browsers into emergency tools, LifeLink AI makes rescue coordination faster and smarter. Our system combines AI analysis, real-time mapping, and community-driven connectivity to make sure help always finds a way — even without the internet.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4 hover:border-violet-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Team</h2>
              <p className="text-gray-400 leading-relaxed">
                We are a team of passionate innovators driven to make technology a force for humanity. Our mission is to create hope in moments of chaos — proving that the power to save lives can lie within every device and every person.
              </p>
            </motion.div>

            <div className="space-y-8">
              <motion.h2 {...fadeInUp} className="text-3xl font-bold text-white text-center">Core Features</motion.h2>
              
              <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-6">
                <motion.div {...fadeInUp} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-3 hover:border-purple-500/30 hover:scale-105 transition-all duration-300">
                  <MessageSquare className="h-8 w-8 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">AI Doctor Chat</h3>
                  <p className="text-gray-400 text-sm">
                    Powered by Google Gemini AI, get instant medical triage and health advice 24/7. 
                    Describe your symptoms and receive intelligent guidance.
                  </p>
                </motion.div>

                <motion.div {...fadeInUp} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-3 hover:border-red-500/30 hover:scale-105 transition-all duration-300">
                  <Phone className="h-8 w-8 text-red-400" />
                  <h3 className="text-xl font-semibold text-white">Emergency SOS</h3>
                  <p className="text-gray-400 text-sm">
                    Offline-capable SOS network that connects you directly to hospitals and emergency services. 
                    Works even without internet connection.
                  </p>
                </motion.div>

                <motion.div {...fadeInUp} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-3 hover:border-green-500/30 hover:scale-105 transition-all duration-300">
                  <MapPin className="h-8 w-8 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Live Routing</h3>
                  <p className="text-gray-400 text-sm">
                    Real-time health monitoring with live routing to nearest responders. 
                    Get connected to the closest available help instantly.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl p-8 space-y-4 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Security & Privacy</h2>
              <p className="text-gray-400 leading-relaxed">
                Your health data is encrypted and secure. We follow HIPAA compliance standards and never share your 
                personal information without explicit consent. All AI interactions are processed with privacy-first principles.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.h2 {...fadeInUp} className="text-3xl font-bold text-white text-center">Getting Started</motion.h2>
              <motion.div {...fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-6">
                <motion.div {...staggerContainer} className="space-y-4">
                  <motion.div {...fadeInUp} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Create Your Account</h3>
                      <p className="text-gray-400">Sign up with your email and create a secure password</p>
                    </div>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Set Up Your Profile</h3>
                      <p className="text-gray-400">Add your health information and emergency contacts</p>
                    </div>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Start Using LifeLink</h3>
                      <p className="text-gray-400">Chat with AI doctor, monitor health, and access emergency services</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div {...fadeInUp} className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="gap-2 text-lg h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    <Activity className="h-5 w-5" />
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-lg h-14 px-8 bg-white/5 text-white border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
