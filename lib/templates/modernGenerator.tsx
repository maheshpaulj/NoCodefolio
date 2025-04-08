import { PortfolioData } from "@/types/portfolio";

export function modernTemplate(data: PortfolioData) {
    const finalData: PortfolioData = {
      name: data.name || "Your Name",
      bio: data.bio || "Creative <span class='text-blue-500'>Frontend Developer</span>",
      profileImage: data.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      resumeLink: data.resumeLink || "",
      aboutText: data.aboutText || "",
      workExperience: data.workExperience || [],
      skills: data.skills || [],
      projects: data.projects || [],
      contact: {
        email: data.contact?.email || "",
        linkedin: data.contact?.linkedin || "",
        github: data.contact?.github || "",
        phone: data.contact?.phone || "",
      },
      template: data.template || "modern",
    };
  
    return {
      "app/layout.tsx": `
        import { Poppins } from "next/font/google";
        import "../styles/globals.css";
  
        const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
  
        export const metadata = {
          title: "${finalData.name} - Portfolio",
          description: "Personal portfolio website",
        };
  
        export default function RootLayout({
          children,
        }: {
          children: React.ReactNode;
        }) {
          return (
            <html lang="en">
              <body className={poppins.className}>{children}</body>
            </html>
          );
        }
      `,
      "app/page.tsx": `
        "use client";
        import { motion } from "framer-motion";
        import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
        import { useEffect } from "react";
  
        export default function Home() {
          useEffect(() => {
            const handleSmoothScroll = (e: Event) => {
              e.preventDefault();
              const target = e.target as HTMLAnchorElement;
              const id = target.getAttribute("href")?.slice(1);
              if (id) {
                document.querySelector(\`#\${id}\`)?.scrollIntoView({ behavior: "smooth" });
              }
            };
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener("click", handleSmoothScroll);
            });
            return () => {
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener("click", handleSmoothScroll);
              });
            };
          }, []);
  
          return (
            <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins">
              <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg p-6 flex justify-between items-center"
              >
                <a href="#profile" className="text-2xl font-bold text-gray-900 cursor-pointer">
                  ${finalData.name}
                </a>
                <ul className="flex gap-8 text-lg">
                  ${["about", "experience", "skills", "projects", "contact"]
                    .filter((section) => {
                      if (section === "about" && !finalData.aboutText) return false;
                      if (section === "experience" && finalData.workExperience.length === 0) return false;
                      if (section === "skills" && finalData.skills.length === 0) return false;
                      if (section === "projects" && finalData.projects.length === 0) return false;
                      if (
                        section === "contact" &&
                        (!finalData.contact.email &&
                          !finalData.contact.linkedin &&
                          !finalData.contact.github &&
                          !finalData.contact.phone)
                      )
                        return false;
                      return true;
                    })
                    .map(
                      (section) => `
                    <motion.li
                      whileHover={{ scale: 1.1, color: "#3b82f6" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a href="#${section}" className="text-gray-700 hover:text-blue-500 transition-colors capitalize">
                        ${section}
                      </a>
                    </motion.li>`
                    )
                    .join("")}
                </ul>
              </motion.nav>
  
              <motion.section
                id="profile"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-24 px-8 bg-gradient-to-br from-blue-50 to-gray-100"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="w-64 h-64 md:w-80 md:h-80">
                  <img
                    src="${finalData.profileImage}"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white"
                  />
                </motion.div>
                <div className="text-center md:text-left md:ml-12 mt-8 md:mt-0 flex-1 max-w-lg">
                  <p className="text-lg text-gray-600">Hello, I'm</p>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">${finalData.name}</h1>
                  ${
                    finalData.bio
                      ? `<p
                          className="text-xl md:text-2xl text-gray-700 mb-6"
                          dangerouslySetInnerHTML={{ __html: "${finalData.bio.replace(/"/g, '\\"')}" }}
                        />`
                      : ""
                  }
                  ${
                    finalData.resumeLink
                      ? `<motion.a
                          href="${finalData.resumeLink}"
                          whileHover={{ scale: 1.1 }}
                          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-lg font-medium"
                        >
                          Download CV
                        </motion.a>`
                      : ""
                  }
                  ${
                    (finalData.contact.linkedin || finalData.contact.github)
                      ? `<div className="flex gap-6 justify-center md:justify-start mt-6">
                          ${
                            finalData.contact.linkedin
                              ? `<motion.a whileHover={{ scale: 1.2 }} href="${finalData.contact.linkedin}">
                                  <FaLinkedin className="w-8 h-8 text-blue-700" />
                                </motion.a>`
                              : ""
                          }
                          ${
                            finalData.contact.github
                              ? `<motion.a whileHover={{ scale: 1.2 }} href="${finalData.contact.github}">
                                  <FaGithub className="w-8 h-8 text-gray-800" />
                                </motion.a>`
                              : ""
                          }
                        </div>`
                      : ""
                  }
                </div>
              </motion.section>
  
              ${
                finalData.aboutText
                  ? `
                <motion.section
                  id="about"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white"
                >
                  <p className="text-lg text-gray-600">Get To Know More</p>
                  <h1 className="text-4xl font-bold text-gray-900 mb-8">About Me</h1>
                  <p className="text-lg text-gray-700 max-w-3xl text-center leading-relaxed">${finalData.aboutText}</p>
                </motion.section>`
                  : ""
              }
  
              ${
                finalData.workExperience.length > 0
                  ? `
                <motion.section
                  id="experience"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-gray-50"
                >
                  <p className="text-lg text-gray-600">My Journey</p>
                  <h1 className="text-4xl font-bold text-gray-900 mb-12">Work Experience</h1>
                  <div className="max-w-4xl w-full">
                    <div className="space-y-12">
                      ${finalData.workExperience
                        .map(
                          (exp, index) => `
                        <motion.div
                          key="${index}"
                          initial={{ x: ${index % 2 === 0 ? "-50" : "50"}, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: ${index * 0.2} }}
                          className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-lg shadow-md"
                        >
                          ${
                            exp.duration
                              ? `<div className="md:w-1/3 text-center md:text-right">
                                  <p className="text-lg text-gray-600">${exp.duration}</p>
                                </div>`
                              : ""
                          }
                          <div className="md:w-2/3 text-center md:text-left">
                            ${exp.title ? `<h2 className="text-2xl font-semibold text-gray-900">${exp.title}</h2>` : ""}
                            ${exp.company ? `<p className="text-lg text-blue-600">${exp.company}</p>` : ""}
                            ${
                              exp.description
                                ? `<p className="text-gray-700 mt-2">${exp.description}</p>`
                                : ""
                            }
                          </div>
                        </motion.div>`
                        )
                        .join("")}
                    </div>
                  </div>
                </motion.section>`
                  : ""
              }
  
              ${
                finalData.skills.length > 0
                  ? `
                <motion.section
                  id="skills"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white"
                >
                  <p className="text-lg text-gray-600">My Expertise</p>
                  <h1 className="text-4xl font-bold text-gray-900 mb-12">Skills</h1>
                  <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${finalData.skills
                      .map(
                        (skill, index) => `
                      <motion.div
                        key="${index}"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: ${index * 0.1} }}
                        className="p-6 bg-gray-50 rounded-lg shadow-md text-center"
                      >
                        ${
                          skill.icon
                            ? `<img src="${skill.icon}" alt="${skill.name}" className="w-12 h-12 mx-auto mb-4 object-contain" />`
                            : ""
                        }
                        ${skill.name ? `<h2 className="text-xl font-semibold text-gray-900">${skill.name}</h2>` : ""}
                        ${skill.level ? `<p className="text-gray-600">${skill.level}</p>` : ""}
                      </motion.div>`
                      )
                      .join("")}
                  </div>
                </motion.section>`
                  : ""
              }
  
              ${
                finalData.projects.length > 0
                  ? `
                <motion.section
                  id="projects"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-gray-50"
                >
                  <p className="text-lg text-gray-600">Browse My Recent</p>
                  <h1 className="text-4xl font-bold text-gray-900 mb-12">Projects</h1>
                  <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${finalData.projects
                      .map(
                        (project, index) => `
                      <motion.div
                        key="${index}"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: ${index * 0.1} }}
                        className="bg-white p-6 rounded-lg shadow-md"
                      >
                        ${
                          project.image
                            ? `<img
                                src="${project.image}"
                                alt="${project.title}"
                                className="w-full h-48 object-contain rounded-md mb-4"
                              />`
                            : ""
                        }
                        ${
                          project.title
                            ? `<h2 className="text-2xl font-semibold text-gray-900 mb-2">${project.title}</h2>`
                            : ""
                        }
                        ${
                          (project.githubLink || project.liveDemoLink)
                            ? `<div className="flex gap-4 mt-4 justify-center">
                                ${
                                  project.githubLink
                                    ? `<a
                                        href="${project.githubLink}"
                                        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
                                      >
                                        Github
                                      </a>`
                                    : ""
                                }
                                ${
                                  project.liveDemoLink
                                    ? `<a
                                        href="${project.liveDemoLink}"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                      >
                                        Live Demo
                                      </a>`
                                    : ""
                                }
                              </div>`
                            : ""
                        }
                      </motion.div>`
                      )
                      .join("")}
                  </div>
                </motion.section>`
                  : ""
              }
  
              ${
                (finalData.contact.email || finalData.contact.linkedin || finalData.contact.github || finalData.contact.phone)
                  ? `
                <motion.section
                  id="contact"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white"
                >
                  <p className="text-lg text-gray-600">Get in Touch</p>
                  <h1 className="text-4xl font-bold text-gray-900 mb-12">Contact Me</h1>
                  <div className="max-w-lg w-full bg-gray-50 p-8 rounded-lg shadow-md text-center">
                    <div className="flex flex-col gap-6">
                      ${
                        finalData.contact.email
                          ? `<div className="flex items-center gap-4 justify-center">
                              <FaEnvelope className="w-6 h-6 text-gray-700" />
                              <a href="mailto:${finalData.contact.email}" className="text-lg text-gray-800">
                                ${finalData.contact.email}
                              </a>
                            </div>`
                          : ""
                      }
                      ${
                        finalData.contact.linkedin
                          ? `<div className="flex items-center gap-4 justify-center">
                              <FaLinkedin className="w-6 h-6 text-blue-700" />
                              <a href="${finalData.contact.linkedin}" className="text-lg text-gray-800">
                                ${finalData.contact.linkedin}
                              </a>
                            </div>`
                          : ""
                      }
                      ${
                        finalData.contact.github
                          ? `<div className="flex items-center gap-4 justify-center">
                              <FaGithub className="w-6 h-6 text-gray-800" />
                              <a href="${finalData.contact.github}" className="text-lg text-gray-800">
                                ${finalData.contact.github}
                              </a>
                            </div>`
                          : ""
                      }
                      ${
                        finalData.contact.phone
                          ? `<div className="flex items-center gap-4 justify-center">
                              <FaPhone className="w-6 h-6 text-gray-700" />
                              <a href="tel:${finalData.contact.phone}" className="text-lg text-gray-800">
                                ${finalData.contact.phone}
                              </a>
                            </div>`
                          : ""
                      }
                    </div>
                  </div>
                </motion.section>`
                  : ""
              }
  
              <footer className="py-8 text-center bg-gray-900 text-white">
                <p className="text-sm">Copyright © ${new Date().getFullYear()} ${finalData.name}. All Rights Reserved.</p>
              </footer>
            </div>
          );
        }
      `,
      "styles/globals.css": `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
  
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
  
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          scroll-behavior: smooth;
        }
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
      `,
      "package.json": JSON.stringify(
        {
          name: `${finalData.name.toLowerCase().replace(/\s+/g, "-")}-portfolio`,
          version: "1.0.0",
          private: true,
          scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start",
            "postinstall": "npx tailwindcss init -p"
          },
          dependencies: {
            "next": "latest",
            "react": "latest",
            "react-dom": "latest",
            "framer-motion": "^10.0.0",
            "react-icons": "^5.0.0",
            "tailwindcss": "^3.4.1",
            "@tailwindcss/typography": "^0.5.10"
          },
          devDependencies: {
            "typescript": "^5.3.3",
            "@types/node": "^20.11.5",
            "@types/react": "^18.2.48",
            "postcss": "^8.4.31",
            "autoprefixer": "^10.4.16"
          }
        },
        null,
        2
      ),
      "tailwind.config.js": `
        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            "./app/**/*.{js,ts,jsx,tsx}",
            "./pages/**/*.{js,ts,jsx,tsx}",
            "./components/**/*.{js,ts,jsx,tsx}"
          ],
          theme: {
            extend: {
              fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
              },
            },
          },
          plugins: [require('@tailwindcss/typography')],
        };
      `,
      "postcss.config.js": `
        module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        };
      `,
      "tsconfig.json": `
        {
          "compilerOptions": {
            "target": "es5",
            "lib": ["dom", "dom.iterable", "esnext"],
            "allowJs": true,
            "skipLibCheck": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "noEmit": true,
            "esModuleInterop": true,
            "module": "esnext",
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "jsx": "preserve",
            "incremental": true,
            "baseUrl": "."
          },
          "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
          "exclude": ["node_modules"]
        }
      `,
      "next.config.js": `
        /** @type {import('next').NextConfig} */
        const nextConfig = {
          reactStrictMode: true,
        };
        module.exports = nextConfig;
      `,
    };
  }