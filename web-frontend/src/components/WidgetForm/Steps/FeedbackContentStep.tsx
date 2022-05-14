import { feedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"
import { ArrowLeft } from "phosphor-react";
import { ScreenshotButton } from "../../ScreenshotButton";
import { FormEvent, useState } from "react";
import { api } from "../../../service/api";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps {
    feedbackType: feedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState("")
    const [isSendingFeedbackLoading, setIsSendingFeedbackLoading] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmit(event: FormEvent){
        event.preventDefault()
        setIsSendingFeedbackLoading(true)

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        onFeedbackSent()
    }

    return (
        <>
            <header>
                <button onClick={onFeedbackRestartRequested} type='button' className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 ">
                    <ArrowLeft weight='bold' className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img className="h-6 w-6" src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form onSubmit={handleSubmit} className="my-4 w-full">
                <textarea
                    className="min-w-[384px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md 
                    focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent 
                    scrollbar-thin"
                    placeholder="Tell with details what is happening..."
                    onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />
                    <button
                        disabled={comment.length === 0 || isSendingFeedbackLoading }
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
                       { isSendingFeedbackLoading ? <Loading/> : 'Send feedback' }
                    </button>
                </footer>
            </form>
        </>
    )
}