import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PortfolioStepsSection() {
  return (
    <div className="bg-white py-20 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Easily Build Your Unique Portfolio Today</h2>
        <p className="text-lg text-gray-600">
          Creating your portfolio is a breeze with our user-friendly platform. Follow these simple steps to showcase your work and personal brand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="step-card bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4 text-gray-800">🖼️</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Choose a Template That Fits Your Style</h3>
          <p className="text-gray-600 mb-4">
            Select from a variety of professionally designed templates.
          </p>
          <Link href="/choose-template">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg">
              Start
            </Button>
          </Link>
        </div>

        {/* Step 2 */}
        <div className="step-card bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4 text-gray-800">🎨</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Customize Your Portfolio with Ease</h3>
          <p className="text-gray-600 mb-4">
            Personalize colors, fonts, and layouts to match your brand.
          </p>
          <Link href="/customize">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg">
              Start
            </Button>
          </Link>
        </div>

        {/* Step 3 */}
        <div className="step-card bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4 text-gray-800">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Preview Your Portfolio Instantly</h3>
          <p className="text-gray-600 mb-4">
            See real-time changes as you edit your portfolio.
          </p>
          <Link href="/preview">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg">
              Start
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/learn-more">
          <Button className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-100 px-8 py-4 rounded-lg">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
