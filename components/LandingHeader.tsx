export default function LandingHeader() {
    return (
      <header className="w-full p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Portfolio Builder</div>
        <nav>
          <a href="/generate" className="text-blue-600 hover:underline">
            Generate Now
          </a>
        </nav>
      </header>
    );
  }