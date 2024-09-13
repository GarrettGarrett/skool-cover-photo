'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TextCustomizerProps {
  title: string
  subtitle: string
  onTitleChange: (value: string) => void
  onSubtitleChange: (value: string) => void
  onTitleFontChange: (value: string) => void
  onSubtitleFontChange: (value: string) => void
  onTitleSizeChange: (value: string) => void
  onSubtitleSizeChange: (value: string) => void
  onTitleColorChange: (value: string) => void
  onSubtitleColorChange: (value: string) => void
}

const fontOptions = [
  'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino',
  'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact',
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway', 'Oswald', 'Merriweather',
  'Poppins', 'Playfair Display', 'Ubuntu', 'Roboto Condensed', 'Roboto Slab',
  'Source Sans Pro', 'PT Sans', 'Noto Sans', 'Nunito', 'Titillium Web', 'Rubik',
  'Work Sans', 'Fira Sans',
  // Artsy fonts
  'Brush Script MT', 'Luminari', 'Chalkduster', 'Jazz LET', 'Blippo', 'Stencil Std',
  'Marker Felt', 'Trattatello', 'Papyrus', 'Herculanum', 'Party LET', 'Snell Roundhand',
  'Bradley Hand'
]

const fontSizes = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '40', '48', '56', '64', '72', '96', '128']

export function TextCustomizer({
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange,
  onTitleFontChange,
  onSubtitleFontChange,
  onTitleSizeChange,
  onSubtitleSizeChange,
  onTitleColorChange,
  onSubtitleColorChange
}: TextCustomizerProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => onTitleChange(e.target.value)} />
        <div className="grid grid-cols-3 gap-2 mt-2">
          <Select onValueChange={onTitleFontChange}>
            <SelectTrigger>
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={onTitleSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size}>{size}px</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="color" onChange={(e) => onTitleColorChange(e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" value={subtitle} onChange={(e) => onSubtitleChange(e.target.value)} />
        <div className="grid grid-cols-3 gap-2 mt-2">
          <Select onValueChange={onSubtitleFontChange}>
            <SelectTrigger>
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={onSubtitleSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size}>{size}px</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="color" onChange={(e) => onSubtitleColorChange(e.target.value)} />
        </div>
      </div>
    </div>
  )
}