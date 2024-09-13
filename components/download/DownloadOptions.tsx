import React from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePostHog } from 'posthog-js/react';

interface DownloadOptionsProps {
  onDownload: (format: string) => void
}

const formats = ['png', 'jpeg', 'webp']

export function DownloadOptions({ onDownload }: DownloadOptionsProps) {
  const posthog = usePostHog();
  const [selectedFormat, setSelectedFormat] = React.useState(formats[0])

  const handleDownloadClick = () => {
    onDownload(selectedFormat)
    posthog.capture('ButtonClicked', {
      buttonName: 'Cover Photo Download'
    });
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