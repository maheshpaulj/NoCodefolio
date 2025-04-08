"use client";

import Image from "next/image";
import Link from "next/link";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "A sleek, contemporary portfolio layout.",
    previewImage: "/assets/modernTemplate.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A clean, minimal design.",
    previewImage: "/assets/minimalTemplate.png",
  },
];

export default function ExploreTemplates() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-[#2c5364] to-[#1c2b38] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Explore Templates
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Preview Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={template.previewImage}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
              </div>

              {/* Card Content */}
              <div className="relative z-20 p-6 flex flex-col justify-between h-[200px]">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{template.name}</h3>
                  <p className="text-white/70 text-sm">{template.description}</p>
                </div>

                <div className="flex justify-between mt-6 text-sm">
                  <Link
                    href={`/preview/${template.id}`}
                    className="px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg shadow-sm hover:bg-yellow-300 transition"
                  >
                    View Demo
                  </Link>
                  <Link
                    href={`/generate?template=${template.id}`}
                    className="px-4 py-2 border border-white/20 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition"
                  >
                    Use Template
                  </Link>
                </div>
              </div>

              {/* Glowing ring effect on hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-yellow-300/50 transition-all duration-500 pointer-events-none z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
