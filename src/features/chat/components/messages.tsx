"use client"
import { motion } from "framer-motion"
import { Button, cn } from "@mijn-ui/react"
import Image from "next/image"
import React from "react"
import { Markdown } from "./markdown"

type MessagesProps = {
  role: "assistant" | "user"
  content: string
  isStreaming?: boolean
}

const Messages = ({ role, content, isStreaming }: MessagesProps) => {
  const UserMessage = (
    <div className={cn("w-fit rounded-lg bg-background px-4 py-2.5 shadow-xs")}>
      <p>{content}</p>
    </div>
  )

  const AssistantMessage = (
    <>
      {/* Agent Info */}
      <div className="flex items-center gap-2">
        <p className="text-xs font-medium">Pica Bot</p>
        <p className="text-muted-foreground">|</p>
        {/* TODO: Replace this with an actual data */}
        <p className="text-xs font-medium text-secondary-foreground">GPT4.1</p>
      </div>
      <div className="markdown prose max-w-none dark:prose-invert">
        <Markdown>{content}</Markdown>
      </div>
    </>
  )

  return (
    <div data-role={role} className="group flex items-start gap-3 data-[role=user]:justify-end">
        <style>{`
          .markdown img {
            width: 200px !important;
            height: 200px !important;
          }
        `}</style>
      {role === "assistant" && (
        <Button className="flex size-7 shrink-0 items-center justify-center rounded-full !p-0" iconOnly variant="ghost">
          <Image src="/images/picosbs.png" width={28} height={28} alt="Picosbs" />
        </Button>
      )}
      <div className="flex w-full flex-col items-start gap-2 group-data-[role=user]:w-fit group-data-[role=user]:items-end">
        {role === "assistant" && AssistantMessage}
        {role === "user" && UserMessage}

        {isStreaming && role === "assistant" && !content && <ThinkingMessage />}
      </div>
    </div>
  )
}

const ThinkingMessage = () => {
  return (
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.25 } }}
      data-role="assistant">
      <p>Let me cook...</p>
    </motion.div>
  )
}

export default Messages
