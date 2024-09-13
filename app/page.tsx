import React from 'react'
import { CoverPhotoBuilder } from '@/components/CoverPhotoBuilder'

export default function Page() {
  return (
    <div className="container mx-auto py-8 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-6">Cover Photo Builder</h1>
      <CoverPhotoBuilder />
    </div>
  )
}
