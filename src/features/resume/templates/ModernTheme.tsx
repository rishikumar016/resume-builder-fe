import type { ResumeData } from "../../../types/resume.types";

interface Props {
  data: ResumeData;
}

export default function ModernTheme({ data }: Props) {
  const { basics, work, education, meta } = data;
  const { layout } = meta;

  const renderSection = (section: string) => {
    if (layout.hiddenSections.includes(section)) return null;

    switch (section) {
      case "work":
        if (!work || work.length === 0) return null;
        return (
          <section key="work" className="mb-6">
            <h2 className="text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)] text-xl font-semibold mb-3 pb-1 tracking-wider uppercase text-sm">
              Experience
            </h2>
            <div className="flex flex-col gap-5">
              {work.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{item.position}</h3>
                    <span className="text-sm font-medium text-gray-500">
                      {item.startDate} - {item.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-[color:var(--color-primary)] font-semibold mb-2">
                    {item.name}
                  </div>
                  {item.summary && <p className="text-sm mb-2">{item.summary}</p>}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                      {item.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case "education":
        if (!education || education.length === 0) return null;
        return (
          <section key="education" className="mb-6">
            <h2 className="text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)] text-xl font-semibold mb-3 pb-1 tracking-wider uppercase text-sm">
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {item.studyType} in {item.area}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {item.startDate} - {item.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-[color:var(--color-primary)] font-semibold">{item.institution}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case "skills":
        if (!data.skills || data.skills.length === 0) return null;
        return (
          <section key="skills" className="mb-6">
            <h2 className="text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)] text-xl font-semibold mb-3 pb-1 tracking-wider uppercase text-sm">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((item, idx) => (
                <div key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded text-sm font-medium border border-gray-200">
                  {item.name}
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        if (!data.projects || data.projects.length === 0) return null;
        return (
          <section key="projects" className="mb-6">
            <h2 className="text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)] text-xl font-semibold mb-3 pb-1 tracking-wider uppercase text-sm">
              Selected Projects
            </h2>
            <div className="flex flex-col gap-4">
              {data.projects.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                  </div>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white p-10 font-[family:var(--font-main)] text-[length:var(--font-size-base)] text-[color:var(--color-text)] leading-relaxed mx-auto max-w-[210mm] shadow-lg print:shadow-none min-h-[297mm]">
      {/* Basics Header */}
      <header className="mb-8 space-y-3">
        <h1 className="text-[color:var(--color-primary)] text-4xl font-extrabold uppercase tracking-tight">
          {basics.name}
        </h1>
        <p className="text-xl text-gray-600 font-medium">{basics.label}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 border-t border-gray-200 pt-3 mt-3">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.location?.city && <span>• {basics.location.city}, {basics.location.region}</span>}
          {basics.url && <span>• <a href={basics.url} className="text-[color:var(--color-secondary)] hover:underline">{basics.url}</a></span>}
        </div>
        {basics.summary && (
          <p className="text-sm mt-4 text-gray-700 leading-loose">
            {basics.summary}
          </p>
        )}
      </header>

      {/* Dynamic Sections Based on Layout Order */}
      <main>
        {layout.order.map((section) => renderSection(section))}
      </main>
    </div>
  );
}
