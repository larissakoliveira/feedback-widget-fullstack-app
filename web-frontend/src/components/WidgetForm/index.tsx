import bugImageUrl from "../../assets/bug.svg"
import ideaImageUrl from "../../assets/idea.svg"
import thoughtImageUrl from "../../assets/thought.svg"
import { useState } from "react"
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"
import { FeedbackContentStep } from "./Steps/FeedbackContentStep"
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep"

export const feedbackTypes = {
  BUG: {
    title: 'Problem',
    image: {
      source: bugImageUrl,
      alt: 'insect image'
    },
  },
  IDEA: {
    title: 'Idea',
    image: {
      source: ideaImageUrl,
      alt: 'bulb image'
    },
  },
  OTHER: {
    title: 'Other',
    image: {
      source: thoughtImageUrl,
      alt: 'thinking ballon image'
    },
  },
}

export type feedbackType = keyof typeof feedbackTypes 

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
      setFeedbackType(null)
      setFeedbackSent(false)
    }


  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
  
    {feedbackSent ? (
      <FeedbackSuccessStep restartFeedback={handleRestartFeedback}/>
    ): (
      <>
       {!feedbackType ? (
       <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
     ) : (
       <FeedbackContentStep onFeedbackSent={() => setFeedbackSent(true)} onFeedbackRestartRequested={handleRestartFeedback} feedbackType={feedbackType}/>
     )}
      </>
    )}

      <footer className="text-xs text-neutral-400">Made with ♥ by <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a></footer>
    </div>
  );
}
