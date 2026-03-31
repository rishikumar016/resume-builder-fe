import { useResumeStore } from "../../../stores/use-resume-store";
import { TemplateRegistry } from "./TemplateRegistry";

export default function TemplateSwitcher() {
  const resumeData = useResumeStore((state) => state.resumeData);

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center p-10 h-full bg-gray-50 text-gray-400 font-medium">
        <p>No resume data loaded. Please log in or create a new resume.</p>
      </div>
    );
  }

  const { meta } = resumeData;
  const SelectedTemplate =
    TemplateRegistry[meta.theme] || TemplateRegistry["modern"];

  const dynamicStyles = {
    "--color-primary": meta.colorPalette.primary,
    "--color-secondary":
      meta.colorPalette.secondary || meta.colorPalette.primary,
    "--color-accent": meta.colorPalette.accent || meta.colorPalette.primary,
    "--color-text": meta.colorPalette.text,
    "--color-bg": meta.colorPalette.background,
    "--font-main": meta.typography.fontFamily,
    "--font-size-base": meta.typography.fontSize,
  } as React.CSSProperties;

  return (
    <div
      className="resume-preview-wrapper transition-all duration-300 w-full flex justify-center py-8 bg-gray-100 min-h-screen print:p-0 print:bg-white"
      style={dynamicStyles}
    >
      {/* 210mm is precise A4 width. For printing, we remove shadows and margins. */}
      <div className="w-[210mm] min-h-[297mm] shadow-2xl bg-[color:var(--color-bg)] print:shadow-none print:w-auto print:min-h-0 overflow-hidden rounded-md print:rounded-none">
        <SelectedTemplate data={resumeData} />
      </div>
    </div>
  );
}
