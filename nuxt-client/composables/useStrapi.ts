/**
 * Composable for Strapi 5 API calls
 * Provides convenient methods to interact with Strapi 5 REST API
 */

export const useStrapi = () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapiUrl

  /**
   * Find multiple entries
   * @param contentType - The content type to query (e.g., 'articles', 'global')
   * @param params - Query parameters like populate, filters, etc.
   */
  const find = async (contentType: string, params: Record<string, any> = {}) => {
    const { data, error } = await useFetch(`${strapiUrl}/api/${contentType}`, {
      params,
      transform: (data: any) => data
    })
    
    if (error.value) {
      throw error.value
    }
    
    return data.value
  }

  /**
   * Find a single entry by ID
   * @param contentType - The content type to query
   * @param id - The ID of the entry
   * @param params - Query parameters like populate
   */
  const findOne = async (contentType: string, id: string | number, params: Record<string, any> = {}) => {
    const { data, error } = await useFetch(`${strapiUrl}/api/${contentType}/${id}`, {
      params,
      transform: (data: any) => data
    })
    
    if (error.value) {
      throw error.value
    }
    
    return data.value
  }

  /**
   * Create a new entry
   * @param contentType - The content type
   * @param payload - The data to create
   */
  const create = async (contentType: string, payload: any) => {
    try {
      const data = await $fetch(`${strapiUrl}/api/${contentType}`, {
        method: 'POST',
        body: { data: payload }
      })
      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Update an entry
   * @param contentType - The content type
   * @param id - The ID of the entry to update
   * @param payload - The data to update
   */
  const update = async (contentType: string, id: string | number, payload: any) => {
    try {
      const data = await $fetch(`${strapiUrl}/api/${contentType}/${id}`, {
        method: 'PUT',
        body: { data: payload }
      })
      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete an entry
   * @param contentType - The content type
   * @param id - The ID of the entry to delete
   */
  const remove = async (contentType: string, id: string | number) => {
    try {
      const data = await $fetch(`${strapiUrl}/api/${contentType}/${id}`, {
        method: 'DELETE'
      })
      return data
    } catch (error) {
      throw error
    }
  }

  return {
    find,
    findOne,
    create,
    update,
    remove,
    strapiUrl
  }
}
