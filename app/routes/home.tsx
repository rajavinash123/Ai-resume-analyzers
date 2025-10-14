import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
// 🛠️ Ensure this component is available for the history section
import ResumeCard from "~/components/ResumeCard";
// 🛠️ Assuming 'Resume' and 'KVItem' types are defined elsewhere or globally
// If you are missing these types, you must define them:
// type Resume = { id: string; name: string; date: string; score: number };
// type KVItem = { key: string; value: string };
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, LineChart } from "lucide-react";

// --- START: New 'How It Works' Steps Data (Corrected Public Paths) ---
const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Upload Your Resume",
    description:
      "Simply drag and drop your resume in PDF or Word format. Our platform accepts all common file types.",
    // 🛠️ Corrected path: Removed 'public/' prefix
    image: "/images/uploderesume.png",
    color: "from-blue-500 to-blue-600",
  },
  {
    number: 2,
    icon: Cpu,
    title: "AI Analyzes Everything",
    description:
      "Our advanced AI scans your resume for ATS compatibility, keywords, formatting, and content quality.",
    // 🛠️ Corrected path: Removed 'public/' prefix
    image: "/images/resume1.png",
    color: "from-purple-500 to-purple-600",
  },
  {
    number: 3,
    icon: LineChart,
    title: "Get Actionable Insights",
    description:
      "Receive a detailed report with your ATS score, specific improvements, and optimization suggestions.",
    // 🛠️ Corrected path: Removed 'public/' prefix
    image: "/images/result.png",
    color: "from-green-500 to-emerald-600",
  },
];
// --- END: New 'How It Works' Steps Data ---

// --- Features Data (Kept from original Home.tsx) ---
const features = [
  {
    title: "ATS Optimization",
    description:
      "Get instant feedback on ATS compatibility and keyword matching",
    icon: "📊",
  },
  {
    title: "Smart Analysis",
    description: "AI-powered insights to improve your resume content",
    icon: "🤖",
  },
  {
    title: "Real-Time Feedback",
    description: "Instant suggestions to enhance your resume's impact",
    icon: "✨",
  },
];
// --- End Features Data ---

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  // 🛠️ The type `Resume` is assumed to be defined somewhere in your project.
  const [resumes, setResumes] = useState<any[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    // 🛠️ This ensures the user is logged in
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    // 🛠️ Re-implemented the logic to fetch resume history
    const loadResumes = async () => {
      if (!auth.isAuthenticated) return;
      setLoadingResumes(true);

      try {
        // 🛠️ Fetching data using kv.list
        // The types `KVItem` and `Resume` are assumed to be available.
        const items = (await kv.list("resume:*", true)) as any[];

        // 🛠️ Parsing the resume data from the values
        const parsedResumes = items
          .map((item) => {
            try {
              return JSON.parse(item.value);
            } catch (e) {
              console.error("Error parsing resume JSON:", e);
              return null;
            }
          })
          .filter(Boolean); // Filter out any null or undefined results

        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Failed to load resumes from Puter KV:", error);
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, [auth.isAuthenticated]); // Depend on isAuthenticated to run after login

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-6">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Upgrade Your Resume with AI
              </h1>
              <p className="text-xl text-gray-600">
                Get instant ATS-friendly feedback and boost your chances of
                landing interviews.
              </p>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-full px-8 py-3 shadow-lg"
              >
                🎥 Watch Demo
              </a>
            </div>
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/images/dashboard-preview.png"
                className="rounded-2xl shadow-2xl"
                alt="Dashboard Preview"
              />
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-full animate-bounce">
                ATS Score: 88%
              </div>
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="animate-pulse">●</span>
                AI Suggestions Ready!
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose Resumind?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-14 w-14 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Get Results in{" "}
              <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600">
              From upload to insights in under 60 seconds
            </p>
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Image Column */}
                  <div
                    className={`relative animate-fade-in-up ${
                      isEven ? "" : "lg:col-start-2"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-auto"
                      />
                    </div>

                    {/* Decorative blob */}
                    <div
                      className={`absolute -z-10 w-64 h-64 bg-gradient-to-br ${
                        step.color
                      } opacity-20 blur-3xl ${
                        isEven ? "-right-20 -top-20" : "-left-20 -bottom-20"
                      }`}
                    />
                  </div>

                  {/* Content Column */}
                  <div
                    className={`space-y-6 animate-fade-in ${
                      isEven ? "" : "lg:col-start-1 lg:row-start-1"
                    }`}
                    style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div
                        className={`text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}
                      >
                        {step.number}
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-foreground">
                      {step.title}
                    </h3>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resume History Section (Re-added to show past analyses) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Analysis History ({resumes.length})
          </h2>

          {loadingResumes && (
            <p className="text-center text-lg text-gray-600">
              Loading your past analyses...
            </p>
          )}

          {!loadingResumes && resumes.length === 0 && (
            <div className="text-center py-10 border rounded-lg bg-white shadow-sm">
              <p className="text-xl text-gray-500 mb-4">
                You haven't analyzed any resumes yet.
              </p>
              <Link to="/upload" className="primary-button px-6 py-2">
                Analyze Your First Resume
              </Link>
            </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
              {resumes.map((resume: any) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
// Note: `features` array is correctly defined outside of the `Home` component.
