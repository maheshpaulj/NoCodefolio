import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreativePortfolioSection() {
  return (
    <div className="flex items-center justify-between py-20 px-8 bg-white">
      {/* Left Section */}
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Unlock Your Creative Potential with Our Easy Portfolio Builder
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Our portfolio builder empowers you to showcase your work effortlessly. Create a stunning online presence without any coding skills.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="feature-card bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">User-Friendly</h3>
            <p className="text-gray-600">
              Intuitive design tools make portfolio creation a breeze for everyone.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Customizable Templates</h3>
            <p className="text-gray-600">
              Choose from a variety of templates to match your unique style.
            </p>
          </div>
        </div>
        <Link href="/get-started">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-4 rounded-lg mt-6">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Right Section (Image Placeholder) */}
      <div className="max-w-sm">
        <img
          src="https://via.placeholder.com/500x300" // Replace with your image
          alt="Portfolio builder"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
