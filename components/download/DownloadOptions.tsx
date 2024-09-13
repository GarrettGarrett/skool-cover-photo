import React from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DownloadOptionsProps {
  onDownload: (format: string) => void
}

const formats = ['png', 'jpeg', 'webp']

export function DownloadOptions({ onDownload }: DownloadOptionsProps) {
  const [selectedFormat, setSelectedFormat] = React.useState(formats[0])

  const handleDownloadClick = () => {
    console.log('Download button clicked')
    onDownload(selectedFormat)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select value={selectedFormat} onValueChange={setSelectedFormat}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {formats.map((format) => (
              <SelectItem key={format} value={format}>
                {format.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleDownloadClick}>
          Download
        </Button>
      </div>
    </div>
  )
}