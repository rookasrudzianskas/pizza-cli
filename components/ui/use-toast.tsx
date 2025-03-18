// This is a simplified version just to make the toast work
// In a real project, you'd use the full shadcn/ui toast component

import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
}

export function toast({ title, description }: ToastProps) {
  return sonnerToast(title, {
    description,
  })
}

