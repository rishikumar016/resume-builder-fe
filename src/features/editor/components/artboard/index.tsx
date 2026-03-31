import { cn } from '@/lib/utils';
import type { ResumeData } from '@/schema/resume.schema';
import { useResumeEditorStore } from '@/stores/use-resume-editor-store';

// ── Template Registry ──────────────────────────────────────────────────
function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { basics, meta } = data
  const colors = meta.colorPalette

  return (
    <>
      {/* Header */}
      <header className='resume-header border-b-2 pb-5 mb-6' style={{ borderColor: colors.primary }}>
        <h1
          className='text-3xl font-bold uppercase tracking-wider'
          style={{ color: colors.text, fontFamily: meta.typography.headerFontFamily }}
        >
          {basics.name || 'Your Name'}
        </h1>
        {basics.label && (
          <p className='text-sm uppercase tracking-wide mt-1' style={{ color: colors.primary }}>
            {basics.label}
          </p>
        )}
        <div className='flex flex-wrap gap-3 mt-2 text-xs' style={{ color: colors.text + 'aa' }}>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.url && <span>• {basics.url}</span>}
          {basics.location?.city && (
            <span>
              • {basics.location.city}
              {basics.location.region ? `, ${basics.location.region}` : ''}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className='mb-6'>
          <p className='text-sm leading-relaxed' style={{ color: colors.text }}>
            {basics.summary}
          </p>
        </section>
      )}
    </>
  )
}

function CreativeTemplate({ data }: { data: ResumeData }) {
  const { basics, meta } = data
  const colors = meta.colorPalette

  return (
    <>
      <header className='resume-header relative pb-6 mb-6'>
        <div
          className='absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10'
          style={{ backgroundColor: colors.primary }}
        />
        <h1
          className='text-4xl font-black'
          style={{ color: colors.text, fontFamily: meta.typography.headerFontFamily }}
        >
          {basics.name || 'Your Name'}
        </h1>
        {basics.label && (
          <p
            className='text-lg font-semibold mt-1'
            style={{ color: colors.primary }}
          >
            {basics.label}
          </p>
        )}
        <div className='flex flex-wrap gap-3 mt-3 text-xs' style={{ color: colors.text + '99' }}>
          {basics.email && <span className='px-2 py-0.5 rounded-full bg-gray-100'>{basics.email}</span>}
          {basics.phone && <span className='px-2 py-0.5 rounded-full bg-gray-100'>{basics.phone}</span>}
          {basics.url && <span className='px-2 py-0.5 rounded-full bg-gray-100'>{basics.url}</span>}
          {basics.location?.city && (
            <span className='px-2 py-0.5 rounded-full bg-gray-100'>
              {basics.location.city}{basics.location.region ? `, ${basics.location.region}` : ''}
            </span>
          )}
        </div>
        <div className='h-1 w-16 rounded-full mt-4' style={{ backgroundColor: colors.primary }} />
      </header>

      {basics.summary && (
        <section className='mb-6'>
          <p className='text-sm leading-relaxed italic' style={{ color: colors.text }}>
            {basics.summary}
          </p>
        </section>
      )}
    </>
  )
}

function StartupTemplate({ data }: { data: ResumeData }) {
  const { basics, meta } = data
  const colors = meta.colorPalette

  return (
    <>
      <header className='resume-header mb-6'>
        <div className='flex items-center gap-4'>
          <div
            className='size-12 rounded-lg flex items-center justify-center text-white text-xl font-bold'
            style={{ backgroundColor: colors.primary }}
          >
            {(basics.name || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h1
              className='text-2xl font-bold'
              style={{ color: colors.text, fontFamily: meta.typography.headerFontFamily }}
            >
              {basics.name || 'Your Name'}
            </h1>
            {basics.label && (
              <p className='text-sm' style={{ color: colors.primary }}>
                {basics.label}
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-wrap gap-2 mt-3 text-xs' style={{ color: colors.text + 'aa' }}>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>| {basics.phone}</span>}
          {basics.url && <span>| {basics.url}</span>}
        </div>
      </header>

      {basics.summary && (
        <section className='mb-6 border-l-2 pl-4' style={{ borderColor: colors.primary }}>
          <p className='text-sm leading-relaxed' style={{ color: colors.text }}>
            {basics.summary}
          </p>
        </section>
      )}
    </>
  )
}

// ── Section Renderers (shared across templates) ────────────────────────

function SectionHeading({
  title,
  template,
  colors,
  headerFont,
}: {
  title: string
  template: string
  colors: ResumeData['meta']['colorPalette']
  headerFont: string
}) {
  return (
    <h3
      className={cn(
        'text-xs font-bold uppercase tracking-widest mb-3',
        template === 'creative' && 'text-sm'
      )}
      style={{
        color: template === 'executive' ? colors.primary : colors.text,
        fontFamily: headerFont,
      }}
    >
      {title}
    </h3>
  )
}

function WorkPreview({ data }: { data: ResumeData }) {
  const { work, meta } = data
  const visible = work.filter((i) => i.visible !== false)
  if (visible.length === 0) return null

  return (
    <section className='mb-5'>
      <SectionHeading
        title='Experience'
        template={meta.template}
        colors={meta.colorPalette}
        headerFont={meta.typography.headerFontFamily}
      />
      <div className='space-y-4'>
        {visible.map((item) => (
          <div key={item.id} className='relative pl-4 border-l-2 border-gray-200'>
            <div
              className='absolute w-2 h-2 rounded-full -left-[5px] top-1.5'
              style={{ backgroundColor: meta.colorPalette.primary }}
            />
            <div className='flex justify-between items-baseline mb-0.5'>
              <h4 className='font-semibold text-sm' style={{ color: meta.colorPalette.text }}>
                {item.position || 'Position'}
              </h4>
              {(item.startDate || item.endDate) && (
                <span className='text-[10px] text-gray-500 italic shrink-0 ml-2'>
                  {item.startDate}{item.endDate ? ` – ${item.endDate}` : ''}
                </span>
              )}
            </div>
            {item.name && (
              <p className='text-xs font-medium mb-1' style={{ color: meta.colorPalette.primary }}>
                {item.name}
              </p>
            )}
            {item.summary && (
              <p className='text-xs text-gray-600 leading-relaxed whitespace-pre-line'>
                {item.summary}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function EducationPreview({ data }: { data: ResumeData }) {
  const { education, meta } = data
  const visible = education.filter((i) => i.visible !== false)
  if (visible.length === 0) return null

  return (
    <section className='mb-5'>
      <SectionHeading
        title='Education'
        template={meta.template}
        colors={meta.colorPalette}
        headerFont={meta.typography.headerFontFamily}
      />
      <div className='space-y-3'>
        {visible.map((item) => (
          <div key={item.id}>
            <div className='flex justify-between items-baseline'>
              <h4 className='font-semibold text-sm' style={{ color: meta.colorPalette.text }}>
                {item.institution || 'Institution'}
              </h4>
              {(item.startDate || item.endDate) && (
                <span className='text-[10px] text-gray-500 italic shrink-0 ml-2'>
                  {item.startDate}{item.endDate ? ` – ${item.endDate}` : ''}
                </span>
              )}
            </div>
            <p className='text-xs text-gray-600'>
              {[item.studyType, item.area].filter(Boolean).join(' in ')}
              {item.score ? ` • ${item.score}` : ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SkillsPreview({ data }: { data: ResumeData }) {
  const { skills, meta } = data
  const visible = skills.filter((i) => i.visible !== false)
  if (visible.length === 0) return null

  return (
    <section className='mb-5'>
      <SectionHeading
        title='Skills'
        template={meta.template}
        colors={meta.colorPalette}
        headerFont={meta.typography.headerFontFamily}
      />
      <div className='flex flex-wrap gap-1.5'>
        {visible.map((item) => (
          <span
            key={item.id}
            className='px-2 py-0.5 text-[10px] rounded font-medium'
            style={{
              backgroundColor: meta.colorPalette.primary + '15',
              color: meta.colorPalette.primary,
            }}
          >
            {item.name}
            {item.level ? ` (${item.level})` : ''}
          </span>
        ))}
      </div>
    </section>
  )
}

function ProjectsPreview({ data }: { data: ResumeData }) {
  const { projects, meta } = data
  const visible = projects.filter((i) => i.visible !== false)
  if (visible.length === 0) return null

  return (
    <section className='mb-5'>
      <SectionHeading
        title='Projects'
        template={meta.template}
        colors={meta.colorPalette}
        headerFont={meta.typography.headerFontFamily}
      />
      <div className='space-y-3'>
        {visible.map((item) => (
          <div key={item.id}>
            <h4 className='font-semibold text-sm' style={{ color: meta.colorPalette.text }}>
              {item.name || 'Project'}
            </h4>
            {item.description && (
              <p className='text-xs text-gray-600 leading-relaxed'>{item.description}</p>
            )}
            {item.url && (
              <p className='text-[10px] text-gray-400 mt-0.5'>{item.url}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function CertificatesPreview({ data }: { data: ResumeData }) {
  const visible = data.certificates.filter((i) => i.visible !== false)
  if (visible.length === 0) return null

  return (
    <section className='mb-5'>
      <SectionHeading
        title='Certifications'
        template={data.meta.template}
        colors={data.meta.colorPalette}
        headerFont={data.meta.typography.headerFontFamily}
      />
      <div className='space-y-1'>
        {visible.map((item) => (
          <div key={item.id} className='text-xs'>
            <span className='font-medium' style={{ color: data.meta.colorPalette.text }}>
              {item.name}
            </span>
            {item.issuer && <span className='text-gray-500'> – {item.issuer}</span>}
            {item.date && <span className='text-gray-400 ml-1'>({item.date})</span>}
          </div>
        ))}
      </div>
    </section>
  )
}

function LanguagesPreview({ data }: { data: ResumeData }) {
  const visible = data.languages.filter((i) => i.visible !== false)
  if (visible.length === 0) return null

  return (
    <section className='mb-5'>
      <SectionHeading
        title='Languages'
        template={data.meta.template}
        colors={data.meta.colorPalette}
        headerFont={data.meta.typography.headerFontFamily}
      />
      <div className='flex flex-wrap gap-2'>
        {visible.map((item) => (
          <span key={item.id} className='text-xs'>
            <span className='font-medium'>{item.language}</span>
            {item.fluency && <span className='text-gray-500'> ({item.fluency})</span>}
          </span>
        ))}
      </div>
    </section>
  )
}

function AwardsPreview({ data }: { data: ResumeData }) {
  const visible = data.awards.filter((i) => i.visible !== false)
  if (visible.length === 0) return null

  return (
    <section className='mb-5'>
      <SectionHeading
        title='Awards'
        template={data.meta.template}
        colors={data.meta.colorPalette}
        headerFont={data.meta.typography.headerFontFamily}
      />
      <div className='space-y-1'>
        {visible.map((item) => (
          <div key={item.id} className='text-xs'>
            <span className='font-medium'>{item.title}</span>
            {item.awarder && <span className='text-gray-500'> – {item.awarder}</span>}
            {item.date && <span className='text-gray-400 ml-1'>({item.date})</span>}
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Section Renderer Map ───────────────────────────────────────────────
const sectionRenderers: Record<string, React.ComponentType<{ data: ResumeData }>> = {
  work: WorkPreview,
  education: EducationPreview,
  skills: SkillsPreview,
  projects: ProjectsPreview,
  certificates: CertificatesPreview,
  languages: LanguagesPreview,
  awards: AwardsPreview,
}

// ── Main Artboard Component ────────────────────────────────────────────
export function Artboard() {
  const data = useResumeEditorStore((s) => s.resume)
  const { meta } = data
  const hiddenSections = meta.layout.hiddenSections

  const pageWidth = meta.page.format === 'letter' ? 816 : 794 // px
  const pageMinHeight = meta.page.format === 'letter' ? 1056 : 1123

  // Select template header
  const TemplateHeader =
    meta.template === 'creative'
      ? CreativeTemplate
      : meta.template === 'startup'
        ? StartupTemplate
        : ExecutiveTemplate

  return (
    <div className='flex-1 overflow-auto bg-muted/30 flex items-start justify-center p-6'>
      <div
        className='bg-white shadow-lg rounded-sm relative overflow-hidden transition-all'
        style={{
          width: pageWidth,
          minHeight: pageMinHeight,
          padding: meta.page.margin,
          fontFamily: meta.typography.fontFamily,
          fontSize: meta.typography.fontSize,
          lineHeight: meta.typography.lineHeight,
          color: meta.colorPalette.text,
          backgroundColor: meta.colorPalette.background,
        }}
      >
        {/* Custom CSS */}
        {meta.css && (
          <style
            dangerouslySetInnerHTML={{
              __html: meta.css.replace(
                /([^{}]*){/g,
                '.resume-preview $1{'
              ),
            }}
          />
        )}

        <div className='resume-preview'>
          {/* Template-specific header */}
          <TemplateHeader data={data} />

          {/* Sections in layout order */}
          {meta.layout.order
            .filter((sectionId) => !hiddenSections.includes(sectionId))
            .map((sectionId) => {
              const Renderer = sectionRenderers[sectionId]
              if (!Renderer) return null
              return <Renderer key={sectionId} data={data} />
            })}
        </div>
      </div>
    </div>
  )
}
