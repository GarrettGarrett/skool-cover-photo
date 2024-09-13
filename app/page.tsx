'use client'

import React, { useState, useCallback } from 'react'
import { CoverPhotoBuilder } from '@/components/CoverPhotoBuilder'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { FeedbackDialog } from '@/components/FeedbackDialog'
import { sendFeedback } from '@/app/actions/feedback'
import { ExternalLink } from 'lucide-react' // Add this import

export default function Page() {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { toast, toasts } = useToast();

  const handleFeedbackChange = useCallback((value: string) => {
    setFeedback(value);
  }, []);

  const handleFeedbackSubmit = useCallback(async () => {
    if (feedback.length < 5) {
      toast({
        title: "Error",
        description: "Feedback must be at least 5 characters long.",
        variant: "destructive",
      });
      return;
    }

    setFeedbackStatus("sending");
    try {
      const result = await sendFeedback(feedback);
      if (result.success) {
        setFeedbackStatus("success");
        toast({
          title: "Thank you!",
          description: "Your feedback has been submitted successfully.",
        });
        setFeedback("");
        setFeedbackDialogOpen(false);
      } else {
        throw new Error(result.error || "Failed to send feedback");
      }
    } catch (error) {
      setFeedbackStatus("error");
      toast({
        title: "Error",
        description: "Failed to send feedback. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setFeedbackStatus("idle");
    }
  }, [feedback, toast]);

  const handleOpenFeedbackDialog = useCallback(() => {
    setFeedbackDialogOpen(true);
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <header className=" py-4 px-8">
        <div className="container mx-auto max-w-[1400px] flex justify-between items-center">
          <Button
            onClick={() => window.open("https://www.skool.com/games/about?ref=9dcf2482660141d58dbd9b11226dfa68", "_blank")}
            variant="outline"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Play the Skool Games
          </Button>
          <Button onClick={handleOpenFeedbackDialog}>
            Feedback
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-8 max-w-[1400px]">
        <CoverPhotoBuilder />
        <FeedbackDialog
          open={feedbackDialogOpen}
          onOpenChange={setFeedbackDialogOpen}
          feedback={feedback}
          onFeedbackChange={handleFeedbackChange}
          onSubmit={handleFeedbackSubmit}
          status={feedbackStatus}
        />
        
      </main>
    </div>
  )
}
