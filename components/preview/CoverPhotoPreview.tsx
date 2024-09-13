import React, { forwardRef, useCallback, useState } from 'react'

interface Image {
  id: string;
  url: string;
  size: number;
  position: { x: number, y: number };
}

interface CoverPhotoPreviewProps {
  options: {
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
  onPositionChange: (element: 'title' | 'subtitle' | string, position: { x: number, y: number }) => void
}

export const CoverPhotoPreview = forwardRef<HTMLDivElement, CoverPhotoPreviewProps>(
  ({ options, onPositionChange }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [draggedElement, setDraggedElement] = useState<string | null>(null)

    const handleDragStart = useCallback((element: 'title' | 'subtitle' | string) => {
      setIsDragging(true)
      setDraggedElement(element)
    }, [])

    const handleDragEnd = useCallback(() => {
      setIsDragging(false)
      setDraggedElement(null)
    }, [])

    const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging && draggedElement) {
        const container = e.currentTarget.closest('.preview-content')
        if (container) {
          const rect = container.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          onPositionChange(draggedElement, { x: Math.max(0, Math.min(x, 100)), y: Math.max(0, Math.min(y, 100)) })
        }
      }
    }, [isDragging, draggedElement, onPositionChange])

    const getBackgroundStyle = () => {
      const style: React.CSSProperties = {}

      switch (options.backgroundType) {
        case 'color':
          style.backgroundColor = options.backgroundColor
          break
        case 'gradient':
          style.backgroundImage = `linear-gradient(${options.gradientDirection}, ${options.gradientColors[0]}, ${options.gradientColors[1]})`
          break
        case 'image':
          if (options.backgroundImage) {
            style.backgroundImage = `url(${options.backgroundImage})`
            style.backgroundSize = 'cover'
            style.backgroundPosition = 'center'
          }
          break
      }

      return style
    }

    const getPatternStyle = () => {
      if (options.patternType === 'none') return null;

      const patternStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        opacity: options.patternOpacity / 100,
        mixBlendMode: 'multiply',
      }

      let patternImage = ''
      let patternSize = ''

      switch (options.patternType) {
        case 'dots':
          patternImage = `radial-gradient(${options.patternColor} 3px, transparent 3px)`
          patternSize = '30px 30px'
          break
        case 'graph':
          patternImage = `
            linear-gradient(to right, ${options.patternColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${options.patternColor} 1px, transparent 1px),
            linear-gradient(to right, ${options.patternColor}40 1px, transparent 1px),
            linear-gradient(to bottom, ${options.patternColor}40 1px, transparent 1px)
          `
          patternSize = '100px 100px, 100px 100px, 20px 20px, 20px 20px'
          break
        case 'grid':
          patternImage = `
            linear-gradient(to right, ${options.patternColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${options.patternColor} 1px, transparent 1px)
          `
          patternSize = '100px 100px'
          break
      }

      patternStyle.backgroundImage = patternImage
      patternStyle.backgroundSize = patternSize

      return patternStyle
    }

    const renderContent = () => {
      return (
        <>
          {options.images.map((image) => (
            <div
              key={image.id}
              className="absolute cursor-move"
              style={{
                left: `${image.position.x}%`,
                top: `${image.position.y}%`,
                width: `${image.size}px`,
                height: `${image.size}px`,
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                userSelect: 'none',
                touchAction: 'none',
              }}
              onMouseDown={() => handleDragStart(image.id)}
            />
          ))}
          <div
            className="absolute cursor-move"
            style={{
              left: `${options.titlePosition.x}%`,
              top: `${options.titlePosition.y}%`,
              fontFamily: options.titleFont,
              fontSize: `${Math.round(parseFloat(options.titleSize))}px`,
              color: options.titleColor,
              userSelect: 'none',
              whiteSpace: 'nowrap',
              touchAction: 'none',
            }}
            onMouseDown={() => handleDragStart('title')}
          >
            {options.title}
          </div>
          <div
            className="absolute cursor-move"
            style={{
              left: `${options.subtitlePosition.x}%`,
              top: `${options.subtitlePosition.y}%`,
              fontFamily: options.subtitleFont,
              fontSize: `${Math.round(parseFloat(options.subtitleSize))}px`,
              color: options.subtitleColor,
              userSelect: 'none',
              whiteSpace: 'nowrap',
              touchAction: 'none',
            }}
            onMouseDown={() => handleDragStart('subtitle')}
          >
            {options.subtitle}
          </div>
        </>
      )
    }

    const patternStyle = getPatternStyle()

    return (
      <div className="w-full" style={{ paddingBottom: '53.14%', position: 'relative' }}>
        <div 
          ref={ref}
          className="absolute top-0 left-0 w-full h-full overflow-hidden preview-content rounded-lg" 
          style={getBackgroundStyle()}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {patternStyle && (
            <div className="pattern-container absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
              <div style={patternStyle} className="pattern-overlay" />
            </div>
          )}
          {renderContent()}
        </div>
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg" 
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
          }}
        />
      </div>
    )
  }
)

CoverPhotoPreview.displayName = 'CoverPhotoPreview'