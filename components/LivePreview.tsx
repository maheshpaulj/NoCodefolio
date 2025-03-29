import { PortfolioData } from "@/types/portfolio";

interface LivePreviewProps {
  portfolioData: PortfolioData;
}

export default function LivePreview({ portfolioData }: LivePreviewProps) {
  const renderPreview = () => {
    switch (portfolioData.template) {
      case "modern":
        return (
          <div className="bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10 px-4 text-center">
              <h1 className="text-3xl font-bold mb-2">
                {portfolioData.name || "Your Name"}
              </h1>
              <p className="text-lg max-w-xl mx-auto">
                {portfolioData.bio || "Your bio goes here"}
              </p>
            </section>

            {/* Projects Section */}
            <section className="py-8 px-4 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-center mb-6">Projects</h2>
              <div className="grid grid-cols-1 gap-4">
                {portfolioData.projects ? (
                  portfolioData.projects.split(",").map((project, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-bold">{project.trim()}</h3>
                      <p className="text-gray-600 mt-1">
                        Add your project description here.
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">
                    No projects added yet.
                  </p>
                )}
              </div>
            </section>

            {/* Experience Section */}
            <section className="py-8 px-4 bg-gray-100 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Experience
              </h2>
              <p className="text-gray-600 text-center">
                {portfolioData.experience || "Your experience goes here"}
              </p>
            </section>

            {/* Skills Section */}
            <section className="py-8 px-4 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-center mb-6">Skills</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {portfolioData.skills ? (
                  portfolioData.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No skills added yet.</p>
                )}
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 text-center">
              <p>
                © {new Date().getFullYear()} {portfolioData.name || "Your Name"}.
                All rights reserved.
              </p>
            </footer>
          </div>
        );
      case "minimal":
        // Keep existing minimal template
        return (
          <div className="min-h-[300px] bg-white p-4 border border-gray-200 shadow-sm">
            <h1 className="text-xl text-gray-800">{portfolioData.name || "Your Name"}</h1>
            <p className="text-gray-600">{portfolioData.bio || "Your bio"}</p>
            <p className="text-gray-600">{portfolioData.skills || "Skills"}</p>
          </div>
        );
      case "creative":
        // Keep existing creative template
        return (
          <div className="min-h-[300px] bg-blue-50 p-4 shadow-sm text-blue-800">
            <h1 className="text-3xl font-extrabold">{portfolioData.name || "Your Name"}</h1>
            <p>{portfolioData.bio || "Your creative bio"}</p>
            <p>{portfolioData.projects || "Projects"}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded p-4 bg-white shadow-sm max-h-[500px] overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Live Preview</h2>
      {renderPreview()}
    </div>
  );
}