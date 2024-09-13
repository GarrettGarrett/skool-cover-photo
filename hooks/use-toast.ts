import { useState, useCallback } from 'react'

type ToastVariant = 'default' | 'destructive'

interface ToastOptions {
  title: string
  description: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([])

  const toast = useCallback((options: ToastOptions) => {
    setToasts((prevToasts) => [...prevToasts, options])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, 3000)
  }, [])

  return { toast, toasts }
}
