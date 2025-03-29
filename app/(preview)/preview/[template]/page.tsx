import { PortfolioData } from "@/types/portfolio";

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: { template: string };
  searchParams: { data: string };
}) {
  const portfolioData: PortfolioData = JSON.parse(decodeURIComponent(searchParams.data || "{}"));

  const renderPreview = () => {
    switch (params.template) {
      case "modern":
        return (
          <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 text-center">
              <h1 className="text-5xl font-bold mb-4">
                {portfolioData.name || "Your Name"}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                {portfolioData.bio || "Your bio goes here"}
              </p>
            </section>

            {/* Projects Section */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioData.projects ? (
                  portfolioData.projects.split(",").map((project, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-bold">{project.trim()}</h3>
                      <p className="text-gray-600 mt-2">
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
            <section className="py-16 px-6 bg-gray-100 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">
                Experience
              </h2>
              <p className="text-gray-600 text-center">
                {portfolioData.experience || "Your experience goes here"}
              </p>
            </section>

            {/* Skills Section */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {portfolioData.skills ? (
                  portfolioData.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
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
            <footer className="bg-gray-800 text-white py-6 text-center">
              <p>
                © {new Date().getFullYear()} {portfolioData.name || "Your Name"}.
                All rights reserved.
              </p>
            </footer>
          </div>
        );
      case "minimal":
        return (
          <div className="min-h-screen bg-white p-8 border border-gray-200">
            <h1 className="text-2xl text-gray-800">{portfolioData.name || "Your Name"}</h1>
            <p className="text-gray-600">{portfolioData.bio || "Your bio"}</p>
            <p className="text-gray-600">{portfolioData.skills || "Skills"}</p>
          </div>
        );
      case "creative":
        return (
          <div className="min-h-screen bg-blue-50 p-8 text-blue-800">
            <h1 className="text-4xl font-extrabold">{portfolioData.name || "Your Name"}</h1>
            <p>{portfolioData.bio || "Your creative bio"}</p>
            <p>{portfolioData.projects || "Projects"}</p>
          </div>
        );
      default:
        return <div>Template not found</div>;
    }
  };

  return renderPreview();
}