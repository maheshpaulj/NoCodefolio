import { SerializablePortfolio } from './portfolio';

export interface TemplateProps {
  data: SerializablePortfolio;
  isEditable: boolean;
  onUpdate: (updatedData: SerializablePortfolio) => void;
  onAddWorkExperience: () => void;
  onDeleteWorkExperience?: (index: number) => void;
  onAddSkill: () => void;
  onDeleteSkill?: (index: number) => void;
  onAddProject: () => void;
  onDeleteProject?: (index: number) => void;
}
