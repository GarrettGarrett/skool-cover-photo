'use client'

import React, { useState, useRef, useEffect } from 'react'
import { TextCustomizer } from './layout-customizer/TextCustomizer'
import { ImageCustomizer } from './image-customizer/ImageCustomizer'
import { BackgroundCustomizer } from './background-customizer/BackgroundCustomizer'
import { CoverPhotoPreview } from './preview/CoverPhotoPreview'
import { DownloadOptions } from './download/DownloadOptions'
import { captureElementAsImage, downloadImage } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Image {
  id: string;
  url: string;
  size: number;
  position: { x: number, y: number };
}

interface CustomizationOptions {
  title: string
  titleFont: string
  titleSize: string
  titleColor: string
  subtitle: string
  subtitleFont: string
  subtitleSize: string
  subtitleColor: string
  images: Image[]
  backgroundType: 'color' | 'gradient' | 'pattern' | 'image'
  backgroundColor: string
  gradientColors: [string, string]
  gradientDirection: string
  patternType: 'none' | 'grid' | 'dots' | 'graph'
  backgroundImage: string | null
  titlePosition: { x: number, y: number }
  subtitlePosition: { x: number, y: number }
  patternColor: string
  patternOpacity: number
}

const desktopPreset: CustomizationOptions = {
  title: "THE COOLEST",
  titleFont: "Arial Black",
  titleSize: "72",
  titleColor: "#26309d",
  subtitle: "Skool Group!",
  subtitleFont: "Arial Black",
  subtitleSize: "40",
  subtitleColor: "#e44434",
  images: [
    {
      id: "pencil",
      url: "/pencil.png",
      size: 190,
      position: {
        x: 70,
        y: 50
      }
    }
  ],
  backgroundType: "gradient",
  backgroundColor: "#5f90fd",
  gradientColors: [
    "#e7b358",
    "#f2cb88"
  ],
  gradientDirection: "to bottom right",
  patternType: "graph",
  backgroundImage: null,
  titlePosition: {
    x: 10,
    y: 20
  },
  subtitlePosition: {
    x: 10,
    y: 40
  },
  patternColor: "#50b9f3",
  patternOpacity: 17
}

const largePreset: CustomizationOptions = {
  title: "THE COOLEST",
  titleFont: "Arial Black",
  titleSize: "72",
  titleColor: "#26309d",
  subtitle: "Skool Group!",
  subtitleFont: "Arial Black",
  subtitleSize: "40",
  subtitleColor: "#e44434",
  images: [
    {
      id: "pencil",
      url: "/pencil.png",
      size: 190,
      position: {
        x: 70,
        y: 50
      }
    }
  ],
  backgroundType: "gradient",
  backgroundColor: "#5f90fd",
  gradientColors: [
    "#e7b358",
    "#f2cb88"
  ],
  gradientDirection: "to bottom right",
  patternType: "graph",
  backgroundImage: null,
  titlePosition: {
    x: 10,
    y: 20
  },
  subtitlePosition: {
    x: 10,
    y: 40
  },
  patternColor: "#50b9f3",
  patternOpacity: 17
}

const mediumPreset: CustomizationOptions = {
  title: "THE COOLEST",
  titleFont: "Arial Black",
  titleSize: "72",
  titleColor: "#26309d",
  subtitle: "Skool Group!",
  subtitleFont: "Arial Black",
  subtitleSize: "40",
  subtitleColor: "#e44434",
  images: [
    {
      id: "pencil",
      url: "/pencil.png",
      size: 149,
      position: {
        x: 70,
        y: 50
      }
    }
  ],
  backgroundType: "gradient",
  backgroundColor: "#5f90fd",
  gradientColors: [
    "#e7b358",
    "#f2cb88"
  ],
  gradientDirection: "to bottom right",
  patternType: "graph",
  backgroundImage: null,
  titlePosition: {
    x: 10,
    y: 20
  },
  subtitlePosition: {
    x: 10,
    y: 40
  },
  patternColor: "#50b9f3",
  patternOpacity: 17
}

const mediumLargePreset: CustomizationOptions = {
  title: "THE COOLEST",
  titleFont: "Arial Black",
  titleSize: "72",
  titleColor: "#26309d",
  subtitle: "Skool Group!",
  subtitleFont: "Arial Black",
  subtitleSize: "40",
  subtitleColor: "#e44434",
  images: [
    {
      id: "pencil",
      url: "/pencil.png",
      size: 133,
      position: {
        x: 70,
        y: 50
      }
    }
  ],
  backgroundType: "gradient",
  backgroundColor: "#5f90fd",
  gradientColors: [
    "#e7b358",
    "#f2cb88"
  ],
  gradientDirection: "to bottom right",
  patternType: "graph",
  backgroundImage: null,
  titlePosition: {
    x: 10,
    y: 20
  },
  subtitlePosition: {
    x: 10,
    y: 40
  },
  patternColor: "#50b9f3",
  patternOpacity: 17
}

const smallMediumPreset: CustomizationOptions = {
  title: "THE COOLEST",
  titleFont: "Arial Black",
  titleSize: "72",
  titleColor: "#26309d",
  subtitle: "Skool Group!",
  subtitleFont: "Arial Black",
  subtitleSize: "40",
  subtitleColor: "#e44434",
  images: [
    {
      id: "pencil",
      url: "/pencil.png",
      size: 149,
      position: {
        x: 70,
        y: 50
      }
    }
  ],
  backgroundType: "gradient",
  backgroundColor: "#5f90fd",
  gradientColors: [
    "#e7b358",
    "#f2cb88"
  ],
  gradientDirection: "to bottom right",
  patternType: "graph",
  backgroundImage: null,
  titlePosition: {
    x: 10,
    y: 20
  },
  subtitlePosition: {
    x: 10,
    y: 40
  },
  patternColor: "#50b9f3",
  patternOpacity: 17
}

const mobilePreset: CustomizationOptions = {
  title: "THE COOLEST",
  titleFont: "Arial Black",
  titleSize: "48",
  titleColor: "#26309d",
  subtitle: "Skool Group!",
  subtitleFont: "Arial Black",
  subtitleSize: "28",
  subtitleColor: "#e44434",
  images: [
    {
      id: "pencil",
      url: "/pencil.png",
      size: 100,
      position: {
        x: 70,
        y: 50
      }
    }
  ],
  backgroundType: "gradient",
  backgroundColor: "#5f90fd",
  gradientColors: [
    "#e7b358",
    "#f2cb88"
  ],
  gradientDirection: "to bottom right",
  patternType: "graph",
  backgroundImage: null,
  titlePosition: {
    x: 10,
    y: 20
  },
  subtitlePosition: {
    x: 10,
    y: 40
  },
  patternColor: "#50b9f3",
  patternOpacity: 17
}

export function CoverPhotoBuilder() {
  const [options, setOptions] = useState<CustomizationOptions>(desktopPreset)
  const [hasUserMadeChanges, setHasUserMadeChanges] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const [isDevMode, setIsDevMode] = useState(false)

  useEffect(() => {
    setIsDevMode(process.env.NODE_ENV === 'development')
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (!hasUserMadeChanges) {
        if (window.innerWidth < 768) {
          setOptions(mobilePreset)
        } else if (window.innerWidth < 900) {
          setOptions(smallMediumPreset)
        } else if (window.innerWidth < 1024) {
          setOptions(mediumPreset)
        } else if (window.innerWidth < 1200) {
          setOptions(mediumLargePreset)
        } else if (window.innerWidth < 1400) {
          setOptions(largePreset)
        } else {
          setOptions(desktopPreset)
        }
      }
    }

    // Set initial preset only if user hasn't made changes
    if (!hasUserMadeChanges) {
      handleResize()
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [hasUserMadeChanges])

  const updateOption = (key: keyof CustomizationOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }))
    setHasUserMadeChanges(true)
  }

  const handlePositionChange = (element: 'title' | 'subtitle' | string, position: { x: number, y: number }) => {
    if (element === 'title' || element === 'subtitle') {
      updateOption(`${element}Position`, position)
    } else {
      updateOption('images', options.images.map(img => 
        img.id === element ? { ...img, position } : img
      ))
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newImage: Image = {
        id: `${new Date().getTime()}-${file.name}`, // Use the unique file name as the ID
        url: e.target?.result as string,
        size: 100, // Initial size in pixels
        position: { x: 70, y: 50 }
      }
      updateOption('images', [...options.images, newImage])
    }
    reader.readAsDataURL(file)
  }

  const handleImageRemove = (id: string) => {
    updateOption('images', options.images.filter(img => img.id !== id))
  }

  const handleImageResize = (id: string, size: number) => {
    updateOption('images', options.images.map(img => 
      img.id === id ? { ...img, size } : img
    ))
  }

  const handleDownload = async (format: string) => {
    if (previewRef.current) {
      try {
        const dataUrl = await captureElementAsImage(previewRef.current)
        if (format === 'svg') {
          // SVG download is not supported in this approach
          console.error('SVG download is not supported')
        } else {
          downloadImage(dataUrl, `cover-photo.${format}`)
        }
      } catch (error) {
        console.error('Error during download:', error)
      }
    }
  }

  const logCurrentState = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    console.log(JSON.stringify({
      options,
      windowDimensions: {
        width: windowWidth,
        height: windowHeight
      }
    }, null, 2));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left column - Text and Background customization */}
      <div className="w-full lg:w-[30%] space-y-8 order-2 lg:order-1">
        {/* Text Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customize Text</CardTitle>
            <CardDescription>Modify the title and subtitle of your cover photo</CardDescription>
          </CardHeader>
          <CardContent>
            <TextCustomizer
              title={options.title}
              subtitle={options.subtitle}
              onTitleChange={(value) => updateOption('title', value)}
              onSubtitleChange={(value) => updateOption('subtitle', value)}
              onTitleFontChange={(value) => updateOption('titleFont', value)}
              onSubtitleFontChange={(value) => updateOption('subtitleFont', value)}
              onTitleSizeChange={(value) => updateOption('titleSize', value)}
              onSubtitleSizeChange={(value) => updateOption('subtitleSize', value)}
              onTitleColorChange={(value) => updateOption('titleColor', value)}
              onSubtitleColorChange={(value) => updateOption('subtitleColor', value)}
            />
          </CardContent>
        </Card>

        {/* Background Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customize Background</CardTitle>
            <CardDescription>Choose a solid color or gradient for your background</CardDescription>
          </CardHeader>
          <CardContent>
            <BackgroundCustomizer
              backgroundType={options.backgroundType}
              backgroundColor={options.backgroundColor}
              gradientColors={options.gradientColors}
              gradientDirection={options.gradientDirection}
              patternType={options.patternType}
              patternColor={options.patternColor}
              patternOpacity={options.patternOpacity}
              onBackgroundTypeChange={(type) => updateOption('backgroundType', type)}
              onBackgroundColorChange={(color) => updateOption('backgroundColor', color)}
              onGradientColorsChange={(colors) => updateOption('gradientColors', colors)}
              onGradientDirectionChange={(direction) => updateOption('gradientDirection', direction)}
              onPatternTypeChange={(pattern) => updateOption('patternType', pattern)}
              onPatternColorChange={(color) => updateOption('patternColor', color)}
              onPatternOpacityChange={(opacity) => updateOption('patternOpacity', opacity)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Right column - Preview, Download options, and Image customization */}
      <div className="w-full lg:w-[70%] space-y-8 order-1 lg:order-2">
        {/* Preview Card */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
            <CardDescription>See how your cover photo looks in real-time</CardDescription>
          </CardHeader>
          <CardContent className="p-0 lg:p-4">
            <CoverPhotoPreview
              options={options}
              onPositionChange={handlePositionChange}
              ref={previewRef}
            />
          </CardContent>
        </Card>

        {/* Download Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Download</CardTitle>
            <CardDescription>Save your custom cover photo</CardDescription>
          </CardHeader>
          <CardContent>
            <DownloadOptions onDownload={handleDownload} />
          </CardContent>
        </Card>

        {/* Image Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customize Images</CardTitle>
            <CardDescription>Add, remove, or resize images on your cover photo</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageCustomizer
              images={options.images}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              onImageResize={handleImageResize}
            />
          </CardContent>
        </Card>

        {/* Debug Card - only visible in development mode */}
        {isDevMode && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Debug</CardTitle>
              <CardDescription>Log the current state of the preview</CardDescription>
            </CardHeader>
            <CardContent>
              <button onClick={logCurrentState} className="btn btn-primary">Log Current State</button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}