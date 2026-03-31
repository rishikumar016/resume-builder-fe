import { ScrollArea } from '@/components/ui/scroll-area';
import { AwardsSection } from './sections/awards-section';
import { BasicsSection } from './sections/basics-section';
import { CertificatesSection } from './sections/certificates-section';
import { EducationSection } from './sections/education-section';
import { InterestsSection } from './sections/interests-section';
import { LanguagesSection } from './sections/languages-section';
import { ProjectsSection } from './sections/projects-section';
import { PublicationsSection } from './sections/publications-section';
import { ReferencesSection } from './sections/references-section';
import { SkillsSection } from './sections/skills-section';
import { VolunteerSection } from './sections/volunteer-section';
import { WorkSection } from './sections/work-section';

export function LeftSidebar() {
  return (
    <ScrollArea className='h-full'>
      <div className='space-y-3 p-4'>
        <BasicsSection />
        <WorkSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <LanguagesSection />
        <AwardsSection />
        <PublicationsSection />
        <VolunteerSection />
        <InterestsSection />
        <ReferencesSection />
      </div>
    </ScrollArea>
  )
}
