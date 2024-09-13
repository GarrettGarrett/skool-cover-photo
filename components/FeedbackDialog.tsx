import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedback: string;
  onFeedbackChange: (value: string) => void;
  onSubmit: () => void;
  status: "idle" | "sending" | "success" | "error";
}

export function FeedbackDialog({
  open,
  onOpenChange,
  feedback,
  onFeedbackChange,
  onSubmit,
  status,
}: FeedbackDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear what went well or how we can improve the product experience.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          className="min-h-[100px]"
        />
        {feedback.length > 0 && feedback.length < 5 && (
          <p className="text-red-500 text-sm mt-1">
            Feedback must be at least 5 characters long.
          </p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={status === "sending" || feedback.length < 5}
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}