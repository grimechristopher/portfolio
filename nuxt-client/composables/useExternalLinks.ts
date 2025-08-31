export const useExternalLinks = () => {
  const processExternalLinks = () => {
    if (process.server) return

    const links = document.querySelectorAll('a[href]')
    
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement
      const href = anchor.getAttribute('href')
      if (!href) return
      
      // Check if it's an external link
      const isExternal = href.startsWith('http') && 
        !href.includes(window.location.hostname) &&
        !href.includes('localhost') &&
        !href.includes('127.0.0.1')
      
      if (isExternal) {
        anchor.setAttribute('target', '_blank')
        anchor.setAttribute('rel', 'noopener noreferrer')
      }
    })
  }

  onMounted(() => {
    processExternalLinks()
    
    // Also process after a delay to catch dynamically loaded content
    setTimeout(processExternalLinks, 500)
    setTimeout(processExternalLinks, 1000)
  })

  return {
    processExternalLinks
  }
}
