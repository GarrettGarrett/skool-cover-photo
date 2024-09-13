'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface LayoutOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const layoutOptions: LayoutOption[] = [
  {
    id: "option1",
    name: "Centered",
    description: "Logo top center, title under that, subtitle under that",
    icon: (
      <svg className="w-24 h-24 mb-2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#e5e7eb" />
        <circle cx="50" cy="25" r="15" fill="#9ca3af" />
        <rect x="20" y="50" width="60" height="10" fill="#9ca3af" />
        <rect x="30" y="70" width="40" height="5" fill="#9ca3af" />
      </svg>
    )
  },
  {
    id: "option2",
    name: "Split",
    description: "Logo center left, title center right with description below title",
    icon: (
      <svg className="w-24 h-24 mb-2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#e5e7eb" />
        <circle cx="25" cy="50" r="15" fill="#9ca3af" />
        <rect x="50" y="35" width="40" height="10" fill="#9ca3af" />
        <rect x="50" y="55" width="30" height="5" fill="#9ca3af" />
      </svg>
    )
  }
]

interface LayoutGridProps {
  onLayoutSelect: (layoutId: string) => void
}

export function LayoutGrid({ onLayoutSelect }: LayoutGridProps) {
  const [selectedLayout, setSelectedLayout] = useState<string>(layoutOptions[0].id)

  const handleLayoutChange = (layoutId: string) => {
    setSelectedLayout(layoutId)
    onLayoutSelect(layoutId)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <RadioGroup
          defaultValue={selectedLayout}
          onValueChange={handleLayoutChange}
          className="grid grid-cols-2 gap-4"
        >
          {layoutOptions.map((option) => (
            <div key={option.id}>
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {option.icon}
                <span className="font-semibold">{option.name}</span>
                <span className="text-sm text-muted-foreground text-center">{option.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}