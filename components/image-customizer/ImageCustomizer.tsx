'use client'

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface Image {
  id: string;
  url: string;
  size: number;
}

interface ImageCustomizerProps {
  images: Image[];
  onImageUpload: (file: File) => void;
  onImageRemove: (id: string) => void;
  onImageResize: (id: string, size: number) => void;
}

export function ImageCustomizer({
  images,
  onImageUpload,
  onImageRemove,
  onImageResize
}: ImageCustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const timestamp = new Date().getTime()
      const uniqueFile = new File([file], `${timestamp}-${file.name}`, { type: file.type })
      onImageUpload(uniqueFile)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button onClick={handleUploadClick}>
          Upload Image
        </Button>
      </div>
      {images.map((image) => (
        <Card key={image.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <img src={image.url} alt="Uploaded image" className="w-20 h-20 object-cover" />
              <div className="flex-grow">
                <Label htmlFor={`image-size-${image.id}`}>Image Size</Label>
                {/* spacer */}
                <div className="h-4" />
                <Slider
                  id={`image-size-${image.id}`}
                  min={20}
                  max={600}  // Increased max value to 600
                  step={1}
                  value={[image.size]}
                  onValueChange={(value) => onImageResize(image.id, value[0])}
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {image.size}%
                </div>
              </div>
              <Button variant="destructive" onClick={() => onImageRemove(image.id)}>
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}