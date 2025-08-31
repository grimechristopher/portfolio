/**
 * TypeScript interfaces for Strapi 5 API responses
 */

// Base Strapi 5 response structure (flattened - no nested attributes)
export interface StrapiResponseData<T = Record<string, any>> {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  locale?: string
}

export type StrapiDocument<T = Record<string, any>> = StrapiResponseData & T

export interface StrapiResponse<T = any> {
  data: StrapiDocument<T>
  meta?: any
}

export interface StrapiCollectionResponse<T = any> {
  data: StrapiDocument<T>[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Media/File structure for Strapi 5 (flattened structure)
export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: any | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any | null
  createdAt: string
  updatedAt: string
  publishedAt?: string
  locale?: string
}

// Experience component
export interface Experience {
  id: number
  Type: 'Work' | 'Education'
  Title: string
  Location: string
  StartDate: string
}

// Skill component
export interface Skill {
  id: number
  Title: string
  Svg: string
  Color: string
  Viewbox: string
}

// Global content type (based on your usage)
export interface GlobalContent {
  Title: string
  Tagline: string
  Logo: StrapiMedia
  ResumeLink: string
  SocialLinks: SocialLink[]
  Experiences: Experience[]
  Skills: Skill[]
}

export interface SocialLink {
  id: number
  Title: string
  Link: string
  FontAwesomeIconClass: string
}

// About section content type
export interface AboutSection {
  Title: string
  Content: string // markdown content
}

// About content type containing AboutSections
export interface AboutContent {
  AboutSections: AboutSection[]
}

// Error response
export interface StrapiError {
  data: null
  error: {
    status: number
    name: string
    message: string
    details?: any
  }
}
