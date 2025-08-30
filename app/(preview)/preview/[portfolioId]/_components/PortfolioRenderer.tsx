// src/components/PortfolioRenderer.tsx
'use client';

import { SerializablePortfolio, TemplateId } from '@/types/portfolio';
import { TemplateProps } from '@/types/template';

// Import your actual template components
import { ModernTemplate } from '@/lib/templates/modern';
import { CreativeTemplate } from "@/lib/templates/creative";
import { MinimalTemplate } from '@/lib/templates/minimal';
import { GalaxyTemplate } from '@/lib/templates/galaxy';
import { NeonTemplate } from '@/lib/templates/neon';

// This component receives the portfolio data as a prop (which is serializable)
export default function PortfolioRenderer({ portfolio }: { portfolio: SerializablePortfolio }) {
  
  const templateComponents: Record<TemplateId, React.ComponentType<TemplateProps>> = {
    modern: ModernTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    galaxy: GalaxyTemplate,
    neon: NeonTemplate,
  };

  const SelectedTemplate = templateComponents[portfolio.template];

  return (
    <SelectedTemplate
      data={portfolio}
      // Since this is a client component, we can define and pass these props without issue.
      isEditable={false}
      onUpdate={() => {}}
      onAddWorkExperience={() => {}}
      onAddSkill={() => {}}
      onAddProject={() => {}}
    />
  );
}