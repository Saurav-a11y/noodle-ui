'use client'
import QuestionIcon from "@/icons/QuestionIcon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip"

const contentTooltip = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `

const TooltipCommon = ({ content = contentTooltip }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <QuestionIcon />
                </TooltipTrigger>
                <TooltipContent className="p-2 max-w-md dark:bg-[#1A1A1A] dark:text-white">
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipCommon