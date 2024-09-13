import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import html2canvas from 'html2canvas'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function captureElementAsImage(element: HTMLElement): Promise<string> {
  console.log('Capturing element:', element)
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: true,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.body.querySelector('.preview-content') as HTMLElement
        if (clonedElement) {
          // Ensure all child elements are visible
          clonedElement.querySelectorAll('*').forEach((el: Element) => {
            if (el instanceof HTMLElement) {
              el.style.visibility = 'visible';
            }
          });

          // Ensure the pattern overlay is visible and blur is applied
          const patternOverlay = clonedElement.querySelector('.pattern-overlay') as HTMLElement;
          if (patternOverlay) {
            patternOverlay.style.display = 'block';
            // Copy the computed styles to ensure blur is captured
            const computedStyle = window.getComputedStyle(patternOverlay);
            patternOverlay.style.filter = computedStyle.filter;
          }
        }
      },
    })

    console.log('Canvas created:', canvas)
    const dataUrl = canvas.toDataURL('image/png')
    console.log('Data URL created:', dataUrl.slice(0, 100) + '...')
    return dataUrl
  } catch (error) {
    console.error('Error in captureElementAsImage:', error)
    throw error
  }
}

export function downloadImage(dataUrl: string, filename: string) {
  console.log('Downloading image:', filename)
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    document.body.removeChild(link)
    window.URL.revokeObjectURL(dataUrl)
  }, 100)
}
