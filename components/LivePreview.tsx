'use client';

import React from 'react';
import { ModernTemplate } from "@/lib/templates/modern"; // Or wherever your template is located
import { SerializablePortfolio } from "@/types/portfolio";
import { CreativeTemplate } from '@/lib/templates/creative';
import { MinimalTemplate } from '@/lib/templates/minimal';
import { GalaxyTemplate } from '@/lib/templates/galaxy';
import { NeonTemplate } from '@/lib/templates/neon';

/**
 * The props for the LivePreview component.
 * It accepts all the data and handler functions from the parent EditorClient
 * and is responsible for passing them down to the selected template.
 */
interface LivePreviewProps {
  portfolioData: SerializablePortfolio;
  onUpdate: (data: SerializablePortfolio) => void;
  onAddWorkExperience: () => void;
  onDeleteWorkExperience: (index: number) => void;
  onAddSkill: () => void;
  onDeleteSkill: (index: number) => void;
  onAddProject: () => void;
  onDeleteProject: (index: number) => void;
}

/**
 * LivePreview acts as a bridge, selecting the correct template component
 * and forwarding all necessary data and functions for it to be interactive.
 */
export default function LivePreview({
  portfolioData,
  onUpdate,
  onAddWorkExperience,
  onDeleteWorkExperience,
  onAddSkill,
  onDeleteSkill,
  onAddProject,
  onDeleteProject,
}: LivePreviewProps) {

  // A map of available templates.
  // In the future, you can import and add more templates here.
  const templateComponents = {
    modern: ModernTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    galaxy: GalaxyTemplate,
    neon: NeonTemplate,
  };

  const SelectedTemplate = templateComponents[portfolioData.template] || ModernTemplate;

  return (
    // This div is the scrollable container for the template preview.
    <div className="w-full h-full overflow-y-auto">
      <SelectedTemplate
        // Pass all data and handlers down to the chosen template
        data={portfolioData}
        isEditable={true}
        onUpdate={onUpdate}
        onAddWorkExperience={onAddWorkExperience}
        onDeleteWorkExperience={onDeleteWorkExperience}
        onAddSkill={onAddSkill}
        onDeleteSkill={onDeleteSkill}
        onAddProject={onAddProject}
        onDeleteProject={onDeleteProject}
      />
    </div>
  );
}