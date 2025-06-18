import { SerializablePortfolio } from './portfolio';

export interface TemplateProps {
  data: SerializablePortfolio;
  isEditable: boolean;
  // Let's make the update function more specific for better DX
  onUpdate: (updatedData: Partial<SerializablePortfolio>) => void;
  onAddWorkExperience: () => void;
  onAddSkill: () => void;
  onAddProject: () => void;
}