'use client'

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LogoCustomizerProps {
  logo: string | null
  logoSize: number
  onLogoUpload: (file: File) => void
  onLogoRemove: () => void
  onLogoResize: (size: number) => void
}

export function LogoCustomizer({
  logo,
  logoSize,
  onLogoUpload,
  onLogoRemove,
  onLogoResize
}: LogoCustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onLogoUpload(file)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="logo-upload">Logo</Label>
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="flex space-x-2">
          <Button onClick={handleUploadClick}>
            {logo ? 'Change Logo' : 'Upload Logo'}
          </Button>
          {logo && (
            <Button variant="outline" onClick={onLogoRemove}>
              Remove Logo
            </Button>
          )}
        </div>
      </div>
      {logo && (
        <div>
          <Label htmlFor="logo-size">Logo Size</Label>
          <Input
            id="logo-size"
            type="range"
            min="20"
            max="200"
            value={logoSize}
            onChange={(e) => onLogoResize(Number(e.target.value))}
          />
          <div className="text-sm text-gray-500 mt-1">
            {logoSize}%
          </div>
        </div>
      )}
    </div>
  )
}