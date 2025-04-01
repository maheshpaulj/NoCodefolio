import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <div className="bg-white py-20 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Unleash Your Creativity with Our Features</h2>
        <p className="text-lg text-gray-600">
          Our platform offers a diverse range of templates tailored for every style. Experience seamless portfolio creation with no coding skills required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Feature 1 */}
        <div className="feature-card bg-gray-100 p-8 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4 text-gray-800">🖼️</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Diverse Templates for Every Creative Need</h3>
          <p className="text-gray-600 mb-4">
            Choose from a variety of stunning templates that suit your style and needs.
          </p>
          <Link href="/templates">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Feature 2 */}
        <div className="feature-card bg-gray-100 p-8 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4 text-gray-800">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant Preview to Perfect Your Design</h3>
          <p className="text-gray-600 mb-4">
            See your changes in real-time as you build your portfolio.
          </p>
          <Link href="/preview">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Feature 3 */}
        <div className="feature-card bg-gray-100 p-8 rounded-lg shadow-lg text-center">
          <div className="text-4xl mb-4 text-gray-800">⚙️</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Coding Required for Easy Customization</h3>
          <p className="text-gray-600 mb-4">
            Build your portfolio effortlessly, no tech skills needed.
          </p>
          <Link href="/customize">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
