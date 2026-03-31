export interface Profile {
  network: string;
  username: string;
  url?: string;
}

export interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
}

export interface Basics {
  name: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

export interface WorkExperience {
  name: string;
  position: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface VolunteerExperience {
  organization: string;
  position: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface Education {
  institution: string;
  url?: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

export interface Award {
  title: string;
  date?: string;
  awarder?: string;
  summary?: string;
}

export interface Certificate {
  name: string;
  date?: string;
  issuer?: string;
  url?: string;
}

export interface Publication {
  name: string;
  publisher?: string;
  releaseDate?: string;
  url?: string;
  summary?: string;
}

export interface Skill {
  name: string;
  level?: string;
  keywords?: string[];
}

export interface Language {
  language: string;
  fluency?: string;
}

export interface Interest {
  name: string;
  keywords?: string[];
}

export interface Reference {
  name: string;
  reference: string;
}

export interface Project {
  name: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
}

export interface ResumeMeta {
  theme: string;
  colorPalette: {
    primary: string;
    secondary?: string;
    accent?: string;
    text: string;
    background: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
  };
  layout: {
    order: string[];
    hiddenSections: string[];
  };
}

export interface ResumeData {
  _id?: string;
  userId?: string;
  title: string;
  basics: Basics;
  work: WorkExperience[];
  volunteer?: VolunteerExperience[];
  education: Education[];
  awards?: Award[];
  certificates?: Certificate[];
  publications?: Publication[];
  skills: Skill[];
  languages?: Language[];
  interests?: Interest[];
  references?: Reference[];
  projects: Project[];
  meta: ResumeMeta;
  createdAt?: string;
  updatedAt?: string;
}
