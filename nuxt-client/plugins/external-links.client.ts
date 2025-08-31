export default defineNuxtPlugin(() => {
  if (process.server) return

  console.log('External links plugin loaded')

  const processLinks = () => {
    console.log('Processing external links...')
    const allLinks = document.querySelectorAll('a[href]')
    console.log(`Found ${allLinks.length} links total`)
    
    let externalCount = 0
    
    allLinks.forEach((link) => {
      const anchor = link as HTMLAnchorElement
      const href = anchor.getAttribute('href')
      
      if (!href || !href.startsWith('http')) return
      
      console.log(`Checking link: ${href}`)
      
      // More comprehensive external check
      try {
        const linkUrl = new URL(href)
        const currentHost = window.location.hostname
        
        const isExternal = linkUrl.hostname !== currentHost &&
          linkUrl.hostname !== 'localhost' &&
          linkUrl.hostname !== '127.0.0.1'
        
        if (isExternal && !anchor.hasAttribute('data-external-processed')) {
          console.log(`Processing external link: ${href}`)
          
          // Set attributes
          anchor.setAttribute('target', '_blank')
          anchor.setAttribute('rel', 'noopener noreferrer')
          anchor.setAttribute('data-external-processed', 'true')
          
          // Add icon
          if (!anchor.textContent?.includes('↗')) {
            anchor.innerHTML = anchor.innerHTML + ' <span style="opacity: 0.7; font-size: 0.8em;">↗</span>'
          }
          
          externalCount++
        }
      } catch (error) {
        console.log(`Error processing link ${href}:`, error)
      }
    })
    
    console.log(`Processed ${externalCount} external links`)
  }

  // Multiple strategies to ensure processing happens
  const runProcessing = () => {
    processLinks()
    setTimeout(processLinks, 200)
    setTimeout(processLinks, 1000)
    setTimeout(processLinks, 2000)
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runProcessing)
  } else {
    runProcessing()
  }

  // Handle route changes
  const router = useRouter()
  router.afterEach(() => {
    console.log('Route changed, processing links...')
    nextTick(() => {
      setTimeout(runProcessing, 100)
    })
  })

  // Watch for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    const hasNewLinks = mutations.some(mutation => {
      return Array.from(mutation.addedNodes).some(node => {
        return node.nodeType === Node.ELEMENT_NODE && 
               ((node as Element).tagName === 'A' || (node as Element).querySelector('a'))
      })
    })
    
    if (hasNewLinks) {
      console.log('New links detected, processing...')
      setTimeout(processLinks, 100)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
})