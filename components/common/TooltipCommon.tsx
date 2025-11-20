'use client'
import QuestionIcon from "@/icons/QuestionIcon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip"

const contentTooltip = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `

const TooltipCommon = ({ content = contentTooltip, trigger, classNameTypo }: { content: string, trigger?: any, classNameTypo?: string }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {trigger ?? <QuestionIcon />}
                </TooltipTrigger>
                <TooltipContent className="max-w-md bg-[var(--bg-block)] text-[var(--text)]">
                    <p className={`p-1.5 ${classNameTypo}`}>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipCommon