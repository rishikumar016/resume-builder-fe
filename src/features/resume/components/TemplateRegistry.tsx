import ModernTheme from "../templates/ModernTheme";
import type { ResumeData } from "../../../types/resume.types";

export const TemplateRegistry: Record<string, React.FC<{ data: ResumeData }>> = {
  modern: ModernTheme,
  // Fallbacks to ModernTheme until others are built
  classic: ModernTheme,
  tech: ModernTheme,
};
