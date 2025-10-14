import Navbar from "~/components/Navbar"; 
import { Link } from "react-router"; 

export default function Demo() {
  // 💡 IMPORTANT: Replace 'YOUR_YOUTUBE_VIDEO_ID' with your video's ID
  const demoVideoUrl = "https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID"; 

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Resumind Demo</h1>
        <p className="text-lg text-gray-600 mb-10">See how our AI instantly analyzes and optimizes your resume for ATS.</p>

        {/* Video Player Section */}
        <div className="relative w-full aspect-video rounded-xl shadow-2xl overflow-hidden bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={demoVideoUrl}
            title="Resumind Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="mt-10">
          <Link to="/" className="secondary-button px-6 py-2">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}