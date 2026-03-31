import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ColorsSection } from './sections/colors-section';
import { CssSection } from './sections/css-section';
import { LayoutSection } from './sections/layout-section';
import { NotesSection } from './sections/notes-section';
import { PageSection } from './sections/page-section';
import { TemplateSection } from './sections/template-section';
import { TypographySection } from './sections/typography-section';

export function RightSidebar() {
  return (
    <ScrollArea className='h-full'>
      <div className='space-y-6 p-4'>
        <TemplateSection />
        <Separator />
        <ColorsSection />
        <Separator />
        <TypographySection />
        <Separator />
        <LayoutSection />
        <Separator />
        <PageSection />
        <Separator />
        <CssSection />
        <Separator />
        <NotesSection />
      </div>
    </ScrollArea>
  )
}
