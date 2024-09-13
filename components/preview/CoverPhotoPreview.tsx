import React, { forwardRef, useCallback } from 'react'
import Draggable, { DraggableEvent, DraggableData, DraggableProps } from 'react-draggable'

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

const DraggableWrapper: React.FC<DraggableProps & { children: React.ReactNode }> = (props) => {
  if (process.env.NODE_ENV === 'production') {
    // Separate Draggable-specific props from standard HTML div props
    const { onStart, onDrag, onStop, axis, handle, cancel, grid, scale, bounds, defaultPosition, position, positionOffset, ...divProps } = props;
    return <div {...divProps}>{props.children}</div>
  }
  return <Draggable {...props} />
}

export const CoverPhotoPreview = forwardRef<HTMLDivElement, CoverPhotoPreviewProps>(
  ({ options, onPositionChange }, ref) => {

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

    const handleDrag = useCallback((element: 'title' | 'subtitle' | string, e: DraggableEvent, data: DraggableData) => {
      onPositionChange(element, { x: Math.round(data.x), y: Math.round(data.y) })
    }, [onPositionChange])

    const renderContent = () => {
      return (
        <>
          {options.images.map((image) => (
            <DraggableWrapper
              key={image.id}
              onDrag={(e, data) => handleDrag(image.id, e, data)}
              position={image.position}
              bounds="parent"
            >
              <div className="absolute cursor-move" style={{ touchAction: 'none' }}>
                <div
                  style={{
                    width: `${Math.round(image.size)}px`,
                    height: `${Math.round(image.size)}px`,
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                />
              </div>
            </DraggableWrapper>
          ))}
          <DraggableWrapper
            onDrag={(e, data) => handleDrag('title', e, data)}
            position={options.titlePosition}
            bounds="parent"
          >
            <h1 
              className="absolute cursor-move"
              style={{ 
                fontFamily: options.titleFont, 
                fontSize: `${Math.round(parseFloat(options.titleSize))}px`, 
                color: options.titleColor, 
                userSelect: 'none',
                whiteSpace: 'nowrap',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                touchAction: 'none'
              }}
            >
              {options.title}
            </h1>
          </DraggableWrapper>
          <DraggableWrapper
            onDrag={(e, data) => handleDrag('subtitle', e, data)}
            position={options.subtitlePosition}
            bounds="parent"
          >
            <h2 
              className="absolute cursor-move"
              style={{ 
                fontFamily: options.subtitleFont, 
                fontSize: `${Math.round(parseFloat(options.subtitleSize))}px`, 
                color: options.subtitleColor, 
                userSelect: 'none',
                whiteSpace: 'nowrap',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                touchAction: 'none'
              }}
            >
              {options.subtitle}
            </h2>
          </DraggableWrapper>
        </>
      )
    }

    const patternStyle = getPatternStyle()

    return (
      <div className="w-full max-w-[1084px] mx-auto">
        <svg width="0" height="0">
          <defs>
            <filter id="blur-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            </filter>
          </defs>
        </svg>
        <div 
          className="relative w-full"
          style={{ paddingBottom: '53.14%' }}
        >
          <div 
            ref={ref}
            className="absolute top-0 left-0 w-full h-full overflow-visible preview-content rounded-lg" 
            style={getBackgroundStyle()}
          >
            {patternStyle && (
              <div className="pattern-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
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
      </div>
    )
  }
)

CoverPhotoPreview.displayName = 'CoverPhotoPreview'