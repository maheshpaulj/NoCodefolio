# BuildPortfolio

A Next.js-based portfolio builder that allows users to create, customize, and download their personal portfolio websites with various templates.

## Features
- **Template Selection**: Choose from multiple portfolio templates (e.g., Modern).
- **Live Preview**: Edit portfolio details in real-time with a live preview.
- **Downloadable Output**: Export your portfolio as a ZIP file ready to deploy.
- **Extensible**: Easily add new templates to expand design options.

## Project Structure
```
BuildPortfolio/
├── app/                    # Next.js app directory
│   ├── (main)/             # Main app routes
│   │   ├── generate/       # Portfolio generation page
│   │   │   └── page.tsx
│   │   ├── layout.tsx      # Main layout
│   │   └── page.tsx        # Home page
│   ├── (preview)/          # Preview routes
│   │   ├── preview/
│   │   │   ├── [template]/ # Dynamic template preview
│   │   │   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── Footer/             # Footer component
│   │   └── index.tsx
│   ├── GeneratedOutput.tsx # Component for generated output
│   ├── LivePreview.tsx     # Live preview component
│   ├── Navbar/             # Navbar component
│   │   └── index.tsx
│   └── ui/                 # UI components (Shadcn)
│       ├── button.tsx
│       └── input.tsx
├── lib/                    # Utility functions and templates
│   ├── generatePortfolio.ts# Portfolio generation logic
│   ├── templates/          # Portfolio templates
│   │   └── modern.tsx      # Modern template
│   ├── utils.ts            # General utilities
│   └── vercelDeploy.ts     # Vercel deployment logic
├── public/                 # Static assets
│   ├── assets/
│   │   └── modernTemplate.png # Template preview image
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── types/                  # TypeScript types
│   └── portfolio.ts        # Portfolio data types
├── .gitignore
├── components.json         # Component config (if using Shadcn)
├── eslint.config.mjs       # ESLint configuration
├── next-env.d.ts           # Next.js TypeScript env
├── next.config.ts          # Next.js config
├── package-lock.json
├── package.json
├── postcss.config.mjs      # PostCSS config (Tailwind)
├── README.md
└── tsconfig.json           # TypeScript config
```

## Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/BuildPortfolio.git
   cd BuildPortfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Usage
1. Navigate to `/generate` to start building your portfolio.
2. Choose a template from the available options.
3. Customize your portfolio details in the live preview.
4. Download the generated portfolio as a ZIP file.
5. Extract the ZIP and run it locally or deploy it (e.g., to Vercel).

## Adding a New Template
To add a new template (e.g., "Minimal"), follow these steps:

### 1. Create the Template File
- **Location**: `lib/templates/minimal.tsx`
- **Content**: Create a new template component and export function, mirroring `modern.tsx`.
  ```tsx
  // lib/templates/minimal.tsx
  import { PortfolioData } from "@/types/portfolio";
  import { motion } from "framer-motion";

  interface MinimalTemplateProps {
    data: PortfolioData;
    isEditable?: boolean;
    onUpdate?: (data: PortfolioData) => void;
    onAddWorkExperience?: () => void;
    onAddSkill?: () => void;
    onAddProject?: () => void;
  }

  export function MinimalTemplate({ data, isEditable }: MinimalTemplateProps) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <h1>{isEditable ? "Editable Minimal Template" : data.name}</h1>
        {/* Add your template design here */}
      </div>
    );
  }

  export function minimalTemplate(data: PortfolioData) {
    return {
      "app/page.tsx": `
        "use client";
        export default function Home() {
          return (
            <div className="min-h-screen bg-white text-gray-900">
              <h1>${data.name}</h1>
              {/* Static template content */}
            </div>
          );
        }
      `,
      "package.json": JSON.stringify({
        name: "${data.name.toLowerCase().replace(/\s+/g, "-")}-portfolio",
        version: "1.0.0",
        scripts: { dev: "next dev", build: "next build", start: "next start" },
        dependencies: { next: "latest", react: "latest", "react-dom": "latest" },
      }, null, 2),
      // Add other necessary files
    };
  }
  ```

### 2. Update Portfolio Types
- **File**: `types/portfolio.ts`
- **Action**: Add the new template ID to the `template` union type.
  ```tsx
  export interface PortfolioData {
    // ... other fields
    template: "modern" | "minimal" | ""; // Add "minimal"
  }
  ```

### 3. Add Template Preview Image
- **Location**: `public/assets/minimalTemplate.png`
- **Action**: Create a preview image (e.g., 300x200px) for the template and place it here.

### 4. Update `generate/page.tsx`
- **Action**: Add the new template to `availableTemplates`.
  ```tsx
  const availableTemplates = [
    { id: "modern", name: "Modern", description: "...", previewImage: "/assets/modernTemplate.png" },
    { id: "minimal", name: "Minimal", description: "A clean, minimal design.", previewImage: "/assets/minimalTemplate.png" },
  ];
  ```

### 5. Update `components/LivePreview.tsx`
- **Action**: Import and add the new template to `templateComponents` and `downloadPortfolio`.
  ```tsx
  import { MinimalTemplate, minimalTemplate } from "@/lib/templates/minimal";

  const templateComponents: Record<string, React.ComponentType<any>> = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
  };

  const downloadPortfolio = async () => {
    const zip = new JSZip();
    const files: Record<string, string> =
      data.template === "modern" ? modernTemplate(data) :
      data.template === "minimal" ? minimalTemplate(data) :
      {};
    Object.entries(files).forEach(([filePath, content]) => zip.file(filePath, content));
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${data.name.toLowerCase().replace(/\s+/g, "-") || "portfolio"}-portfolio.zip`);
  };
  ```

### 6. Test the New Template
- Run `npm run dev`.
- Go to `/generate`, select "Minimal," and verify the preview and download work.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-template`).
3. Commit your changes (`git commit -m "Add minimal template"`).
4. Push to the branch (`git push origin feature/new-template`).
5. Open a pull request.

## License
MIT License - see [LICENSE](LICENSE) for details.
```

---

### Instructions to Add a New Template
Here’s a detailed step-by-step guide based on your folder structure:

#### 1. Create the Template File
- **File**: `lib/templates/minimal.tsx`
- **Purpose**: Define the `MinimalTemplate` component for live preview and `minimalTemplate` function for generating the downloadable portfolio.
- **Example**:
  ```tsx
  import { PortfolioData } from "@/types/portfolio";
  import { motion } from "framer-motion";
  import { Input } from "@/components/ui/input";
  import ContentEditable from "react-contenteditable";

  interface MinimalTemplateProps {
    data: PortfolioData;
    isEditable?: boolean;
    onUpdate?: (data: PortfolioData) => void;
    onAddWorkExperience?: () => void;
    onAddSkill?: () => void;
    onAddProject?: () => void;
  }

  export function MinimalTemplate({
    data,
    isEditable = false,
    onUpdate,
  }: MinimalTemplateProps) {
    const handleChange = (field: keyof PortfolioData, value: any) => {
      if (isEditable && onUpdate) {
        onUpdate({ ...data, [field]: value });
      }
    };

    return (
      <div className="min-h-screen bg-white text-gray-900 p-8">
        {isEditable ? (
          <ContentEditable
            html={data.name || "Your Name"}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-4xl font-bold border-2 border-dashed border-blue-300 p-2 rounded"
          />
        ) : (
          <h1 className="text-4xl font-bold">{data.name || "Your Name"}</h1>
        )}
        {data.bio && (
          isEditable ? (
            <ContentEditable
              html={data.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="text-xl mt-4 border-2 border-dashed border-blue-300 p-2 rounded"
            />
          ) : (
            <p className="text-xl mt-4" dangerouslySetInnerHTML={{ __html: data.bio }} />
          )
        )}
        {/* Add more sections as needed */}
      </div>
    );
  }

  export function minimalTemplate(data: PortfolioData) {
    return {
      "app/page.tsx": `
        "use client";
        export default function Home() {
          return (
            <div className="min-h-screen bg-white text-gray-900 p-8">
              <h1 className="text-4xl font-bold">${data.name || "Your Name"}</h1>
              ${data.bio ? `<p className="text-xl mt-4">${data.bio}</p>` : ""}
            </div>
          );
        }
      `,
      "package.json": JSON.stringify({
        name: `${data.name.toLowerCase().replace(/\s+/g, "-")}-portfolio`,
        version: "1.0.0",
        scripts: { dev: "next dev", build: "next build", start: "next start" },
        dependencies: { next: "latest", react: "latest", "react-dom": "latest" },
      }, null, 2),
      "next.config.ts": `
        /** @type {import('next').NextConfig} */
        const nextConfig = { reactStrictMode: true };
        module.exports = nextConfig;
      `,
    };
  }
  ```

#### 2. Update `types/portfolio.ts`
- Add `"minimal"` to the `template` union:
  ```tsx
  export interface PortfolioData {
    // ... other fields
    template: "modern" | "minimal" | ""; // Add new template here
  }
  ```

#### 3. Add Preview Image
- **File**: `public/assets/minimalTemplate.png`
- **Action**: Create a 300x200px image showcasing the "Minimal" template design and save it here.

#### 4. Update `app/(main)/generate/page.tsx`
- Add the new template to `availableTemplates`:
  ```tsx
  const availableTemplates = [
    { id: "modern", name: "Modern", description: "...", previewImage: "/assets/modernTemplate.png" },
    { id: "minimal", name: "Minimal", description: "A clean, minimal design.", previewImage: "/assets/minimalTemplate.png" },
  ];
  ```

#### 5. Update `components/LivePreview.tsx`
- Import and integrate the new template:
  ```tsx
  import { MinimalTemplate, minimalTemplate } from "@/lib/templates/minimal";

  const templateComponents: Record<string, React.ComponentType<any>> = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
  };

  const downloadPortfolio = async () => {
    const zip = new JSZip();
    const files: Record<string, string> =
      data.template === "modern" ? modernTemplate(data) :
      data.template === "minimal" ? minimalTemplate(data) :
      {};
    // ... rest of the function
  };
  ```

#### 6. Test
- Run `npm run dev`.
- Visit `/generate`, select "Minimal," and ensure the preview loads correctly.
- Download and extract the ZIP, then run it to verify the output.