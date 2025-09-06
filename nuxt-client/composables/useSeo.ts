/**
 * Composable to access global SEO data from Strapi
 */
import type { StrapiResponse } from '~/types/strapi'
import type { SeoContent } from '~/types/seo'

export const useSeo = async () => {
  const { findOne } = useStrapi()
  
  // Fetch global SEO data from Strapi (single type)
  const seoResponse = await findOne('seo', '').catch(() => null) as StrapiResponse<SeoContent> | null
  const seoData = seoResponse?.data
  
  return {
    seoData,
    // Helper methods
    getTitle: (pageTitle?: string) => {
      if (!seoData) return pageTitle || 'Christopher Grime'
      return pageTitle ? `${pageTitle} | ${seoData.SiteName}` : seoData.SiteName
    },
    getOgTitle: (fallback?: string) => seoData?.ogTitle || fallback || 'Christopher Grime',
    getOgDescription: (fallback?: string) => seoData?.ogDescription || fallback || 'Full Stack Developer, Software Engineer',
    getAuthorName: () => seoData?.AuthorName || 'Christopher Grime',
    getSiteUrl: () => seoData?.SiteUrl || 'https://christophergrime.com'
  }
}
