'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid3X3, Grip, CircleOff } from 'lucide-react'

interface BackgroundCustomizerProps {
  backgroundType: 'color' | 'gradient' | 'image' | 'pattern'
  backgroundColor: string
  gradientColors: [string, string]
  gradientDirection: string
  patternType: 'none' | 'grid' | 'dots' | 'graph'
  patternColor: string
  patternOpacity: number
  onBackgroundTypeChange: (type: 'color' | 'gradient') => void
  onBackgroundColorChange: (color: string) => void
  onGradientColorsChange: (colors: [string, string]) => void
  onGradientDirectionChange: (direction: string) => void
  onPatternTypeChange: (pattern: 'none' | 'grid' | 'dots' | 'graph') => void
  onPatternColorChange: (color: string) => void
  onPatternOpacityChange: (opacity: number) => void
}

const gradientDirections = [
  { value: 'to top', icon: '↑' },
  { value: 'to top right', icon: '↗' },
  { value: 'to right', icon: '→' },
  { value: 'to bottom right', icon: '↘' },
  { value: 'to bottom', icon: '↓' },
  { value: 'to bottom left', icon: '↙' },
  { value: 'to left', icon: '←' },
  { value: 'to top left', icon: '↖' },
]

const colorSwatches = [
  '#FCC8D1', '#DBC4F0', '#B2A4FF', '#67729D', '#7C93C3',
  '#7B8FA1', '#609966', '#A6BB8D', '#FFF6BD', '#F2D388',
  '#FFF3E2', '#FFC3A1', '#D3756B', '#FFABAB', '#000000',
  '#FFFFFF'
];

const gradientOptions = [
  { colors: ['#FF416C', '#FF4B2B'], direction: 'to right' },
  { colors: ['#4158D0', '#C850C0'], direction: 'to right' },
  { colors: ['#00DBDE', '#FC00FF'], direction: 'to right' },
  { colors: ['#0093E9', '#80D0C7'], direction: 'to bottom' },
  { colors: ['#8EC5FC', '#E0C3FC'], direction: 'to bottom' },
  { colors: ['#85FFBD', '#FFFB7D'], direction: 'to bottom' },
  { colors: ['#FA8BFF', '#2BD2FF', '#2BFF88'], direction: 'to bottom right' },
  { colors: ['#FBAB7E', '#F7CE68'], direction: 'to top' },
  { colors: ['#FF9A8B', '#FF6A88', '#FF99AC'], direction: 'to bottom right' },
  { colors: ['#FCCB90', '#D57EEB'], direction: 'to bottom right' },
  { colors: ['#A9C9FF', '#FFBBEC'], direction: 'to bottom right' },
  { colors: ['#74EBD5', '#9FACE6'], direction: 'to bottom right' },
  { colors: ['#6E45E2', '#88D3CE'], direction: 'to bottom right' },
  { colors: ['#D4FC79', '#96E6A1'], direction: 'to bottom right' },
  { colors: ['#FA709A', '#FEE140'], direction: 'to bottom right' },
  { colors: ['#FF3CAC', '#784BA0', '#2B86C5'], direction: 'to bottom right' },
  { colors: ['#FF6B6B', '#4ECDC4'], direction: 'to right' },
  { colors: ['#FBD3E9', '#BB377D'], direction: 'to right' },
  { colors: ['#00C9FF', '#92FE9D'], direction: 'to right' },
  { colors: ['#F857A6', '#FF5858'], direction: 'to right' },
];

const patternOptions = [
  { value: 'none', label: 'None', icon: CircleOff },
  { value: 'grid', label: 'Grid', icon: Grid3X3 },
  { value: 'dots', label: 'Dots', icon: Grip },
  { value: 'graph', label: 'Graph', icon: Grid3X3 },
]

export function BackgroundCustomizer({
  backgroundType,
  backgroundColor,
  gradientColors,
  gradientDirection,
  patternType,
  patternColor,
  patternOpacity,
  onBackgroundTypeChange,
  onBackgroundColorChange,
  onGradientColorsChange,
  onGradientDirectionChange,
  onPatternTypeChange,
  onPatternColorChange,
  onPatternOpacityChange
}: BackgroundCustomizerProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue={backgroundType} onValueChange={onBackgroundTypeChange as (value: string) => void} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto ">
          <TabsTrigger value="color" className="py-2 px-4 rounded-md">Solid Color</TabsTrigger>
          <TabsTrigger value="gradient" className="py-2 px-4 rounded-md">Gradient</TabsTrigger>
        </TabsList>
        <div className="mt-2">
          <TabsContent value="color">
            <Card>
              <CardContent className="p-2">
                <div className="grid grid-cols-8 gap-2">
                  {colorSwatches.map((color) => (
                    <div key={color} className="aspect-square">
                      <Button
                        className={`w-full h-full rounded-md p-0 border transition-transform duration-200 ${
                          color === backgroundColor ? 'scale-110 z-10' : ''
                        }`}
                        style={{ 
                          backgroundColor: color, 
                          borderColor: color === backgroundColor ? 'white' : 'transparent',
                          borderWidth: color === backgroundColor ? '2px' : '1px'
                        }}
                        onClick={() => onBackgroundColorChange(color)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="space-y-2 mt-4">
              <Label>Custom Color</Label>
              <Input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
              />
            </div>
          </TabsContent>
          <TabsContent value="gradient">
            <Card>
              <CardContent className="p-2">
                <div className="grid grid-cols-8 gap-2">
                  {gradientOptions.map((gradient, index) => (
                    <div key={index} className="aspect-square">
                      <Button
                        className={`w-full h-full rounded-md p-0 border transition-transform duration-200 ${
                          JSON.stringify(gradient.colors) === JSON.stringify(gradientColors) &&
                          gradient.direction === gradientDirection
                            ? 'scale-110 z-10' : ''
                        }`}
                        style={{ 
                          background: `linear-gradient(${gradient.direction}, ${gradient.colors.join(', ')})`,
                          borderColor: JSON.stringify(gradient.colors) === JSON.stringify(gradientColors) &&
                                       gradient.direction === gradientDirection ? 'white' : 'transparent',
                          borderWidth: JSON.stringify(gradient.colors) === JSON.stringify(gradientColors) &&
                                       gradient.direction === gradientDirection ? '2px' : '1px'
                        }}
                        onClick={() => {
                          onGradientColorsChange(gradient.colors as [string, string])
                          onGradientDirectionChange(gradient.direction)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="space-y-2 mt-4">
              <Label>Custom Gradient</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={gradientColors[0]}
                  onChange={(e) => onGradientColorsChange([e.target.value, gradientColors[1]])}
                />
                <Input
                  type="color"
                  value={gradientColors[1]}
                  onChange={(e) => onGradientColorsChange([gradientColors[0], e.target.value])}
                />
              </div>
              <Label>Gradient Direction</Label>
              <Card>
                <CardContent className="p-2">
                  <div className="flex flex-wrap gap-2">
                    {gradientDirections.map((direction) => (
                      <Button
                        key={direction.value}
                        variant={gradientDirection === direction.value ? "default" : "outline"}
                        className="w-10 h-10 p-0"
                        onClick={() => onGradientDirectionChange(direction.value)}
                      >
                        {direction.icon}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div>
        <Label>Pattern Overlay</Label>
        <Card>
          <CardContent className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {patternOptions.map((pattern) => (
                <Button
                  key={pattern.value}
                  variant={patternType === pattern.value ? "default" : "outline"}
                  className="h-20 p-2 flex flex-col items-center justify-center"
                  onClick={() => onPatternTypeChange(pattern.value as 'none' | 'grid' | 'dots' | 'graph')}
                >
                  <pattern.icon className="w-6 h-6 mb-1" />
                  <span className="text-sm">{pattern.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        {patternType !== 'none' && (
          <div className="space-y-4 mt-2">
            <div>
              <Label>Pattern Color</Label>
              <Input
                type="color"
                value={patternColor}
                onChange={(e) => onPatternColorChange(e.target.value)}
              />
            </div>
            <div>
              <Label>Pattern Opacity</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[patternOpacity]}
                onValueChange={(value) => onPatternOpacityChange(value[0])}
                className="my-4 slider-root"
              />
              <div className="text-sm text-muted-foreground mt-1">
                {patternOpacity}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}