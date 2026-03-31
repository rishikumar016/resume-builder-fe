import { z } from 'zod';

// ── Base item schema (shared by all list sections) ─────────────────────
export const itemIdSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  visible: z.boolean().default(true),
})

// ── Profile ────────────────────────────────────────────────────────────
export const profileSchema = itemIdSchema.extend({
  network: z.string().default(''),
  username: z.string().default(''),
  url: z.string().default(''),
})

// ── Location ───────────────────────────────────────────────────────────
export const locationSchema = z.object({
  address: z.string().default(''),
  postalCode: z.string().default(''),
  city: z.string().default(''),
  countryCode: z.string().default(''),
  region: z.string().default(''),
})

// ── Basics ─────────────────────────────────────────────────────────────
export const basicsSchema = z.object({
  name: z.string().default(''),
  label: z.string().default(''),
  image: z.string().default(''),
  email: z.string().default(''),
  phone: z.string().default(''),
  url: z.string().default(''),
  summary: z.string().default(''),
  location: locationSchema.default(() => locationSchema.parse({})),
  profiles: z.array(profileSchema).default([]),
})

// ── Work Experience ────────────────────────────────────────────────────
export const workSchema = itemIdSchema.extend({
  name: z.string().default(''),
  position: z.string().default(''),
  url: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  summary: z.string().default(''),
  highlights: z.array(z.string()).default([]),
})

// ── Volunteer ──────────────────────────────────────────────────────────
export const volunteerSchema = itemIdSchema.extend({
  organization: z.string().default(''),
  position: z.string().default(''),
  url: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  summary: z.string().default(''),
  highlights: z.array(z.string()).default([]),
})

// ── Education ──────────────────────────────────────────────────────────
export const educationSchema = itemIdSchema.extend({
  institution: z.string().default(''),
  url: z.string().default(''),
  area: z.string().default(''),
  studyType: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  score: z.string().default(''),
  courses: z.array(z.string()).default([]),
})

// ── Award ──────────────────────────────────────────────────────────────
export const awardSchema = itemIdSchema.extend({
  title: z.string().default(''),
  date: z.string().default(''),
  awarder: z.string().default(''),
  summary: z.string().default(''),
})

// ── Certificate ────────────────────────────────────────────────────────
export const certificateSchema = itemIdSchema.extend({
  name: z.string().default(''),
  date: z.string().default(''),
  issuer: z.string().default(''),
  url: z.string().default(''),
})

// ── Publication ────────────────────────────────────────────────────────
export const publicationSchema = itemIdSchema.extend({
  name: z.string().default(''),
  publisher: z.string().default(''),
  releaseDate: z.string().default(''),
  url: z.string().default(''),
  summary: z.string().default(''),
})

// ── Skill ──────────────────────────────────────────────────────────────
export const skillSchema = itemIdSchema.extend({
  name: z.string().default(''),
  level: z.string().default(''),
  keywords: z.array(z.string()).default([]),
})

// ── Language ───────────────────────────────────────────────────────────
export const languageSchema = itemIdSchema.extend({
  language: z.string().default(''),
  fluency: z.string().default(''),
})

// ── Interest ───────────────────────────────────────────────────────────
export const interestSchema = itemIdSchema.extend({
  name: z.string().default(''),
  keywords: z.array(z.string()).default([]),
})

// ── Reference ──────────────────────────────────────────────────────────
export const referenceSchema = itemIdSchema.extend({
  name: z.string().default(''),
  reference: z.string().default(''),
})

// ── Project ────────────────────────────────────────────────────────────
export const projectSchema = itemIdSchema.extend({
  name: z.string().default(''),
  description: z.string().default(''),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  url: z.string().default(''),
  roles: z.array(z.string()).default([]),
  entity: z.string().default(''),
  type: z.string().default(''),
})

// ── Color Palette ──────────────────────────────────────────────────────
export const colorPaletteSchema = z.object({
  primary: z.string().default('#005bbf'),
  secondary: z.string().default('#475e8c'),
  accent: z.string().default('#6833ea'),
  text: z.string().default('#1a1a2e'),
  background: z.string().default('#ffffff'),
})

// ── Typography ─────────────────────────────────────────────────────────
export const typographySchema = z.object({
  fontFamily: z.string().default('Inter'),
  fontSize: z.string().default('14px'),
  lineHeight: z.string().default('1.5'),
  headerFontFamily: z.string().default('Inter'),
})

// ── Page Settings ──────────────────────────────────────────────────────
export const pageSettingsSchema = z.object({
  margin: z.number().default(36),
  format: z.enum(['a4', 'letter']).default('a4'),
})

// ── Layout ─────────────────────────────────────────────────────────────
export const layoutSchema = z.object({
  order: z.array(z.string()).default([
    'work',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
    'awards',
    'publications',
    'volunteer',
    'interests',
    'references',
  ]),
  hiddenSections: z.array(z.string()).default([]),
})

// ── Resume Metadata ────────────────────────────────────────────────────
export const resumeMetaSchema = z.object({
  template: z.string().default('executive'),
  colorPalette: colorPaletteSchema.default(() => colorPaletteSchema.parse({})),
  typography: typographySchema.default(() => typographySchema.parse({})),
  page: pageSettingsSchema.default(() => pageSettingsSchema.parse({})),
  layout: layoutSchema.default(() => layoutSchema.parse({})),
  css: z.string().default(''),
  notes: z.string().default(''),
})

// ── Resume Data (root) ─────────────────────────────────────────────────
export const resumeDataSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string().default('Untitled Resume'),
  basics: basicsSchema.default(() => basicsSchema.parse({})),
  work: z.array(workSchema).default([]),
  volunteer: z.array(volunteerSchema).default([]),
  education: z.array(educationSchema).default([]),
  awards: z.array(awardSchema).default([]),
  certificates: z.array(certificateSchema).default([]),
  publications: z.array(publicationSchema).default([]),
  skills: z.array(skillSchema).default([]),
  languages: z.array(languageSchema).default([]),
  interests: z.array(interestSchema).default([]),
  references: z.array(referenceSchema).default([]),
  projects: z.array(projectSchema).default([]),
  meta: resumeMetaSchema.default(() => resumeMetaSchema.parse({})),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// ── Inferred Types ─────────────────────────────────────────────────────
export type ResumeData = z.infer<typeof resumeDataSchema>
export type Basics = z.infer<typeof basicsSchema>
export type WorkItem = z.infer<typeof workSchema>
export type VolunteerItem = z.infer<typeof volunteerSchema>
export type EducationItem = z.infer<typeof educationSchema>
export type AwardItem = z.infer<typeof awardSchema>
export type CertificateItem = z.infer<typeof certificateSchema>
export type PublicationItem = z.infer<typeof publicationSchema>
export type SkillItem = z.infer<typeof skillSchema>
export type LanguageItem = z.infer<typeof languageSchema>
export type InterestItem = z.infer<typeof interestSchema>
export type ReferenceItem = z.infer<typeof referenceSchema>
export type ProjectItem = z.infer<typeof projectSchema>
export type ResumeMeta = z.infer<typeof resumeMetaSchema>
export type ColorPalette = z.infer<typeof colorPaletteSchema>
export type Typography = z.infer<typeof typographySchema>

// ── Default Resume Data ────────────────────────────────────────────────
export const defaultResumeData: ResumeData = resumeDataSchema.parse({})

// ── Section key type ───────────────────────────────────────────────────
export type SectionKey =
  | 'work'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certificates'
  | 'languages'
  | 'awards'
  | 'publications'
  | 'volunteer'
  | 'interests'
  | 'references'
