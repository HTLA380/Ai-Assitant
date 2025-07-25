"use client"

import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ai-input"
import { Button, cn } from "@mijn-ui/react"
import { motion } from "framer-motion"
import { GlobeIcon, Paperclip, Telescope } from "lucide-react"
import { SUGGESTION_ITEMS } from "./constants"
import { ChangeEventHandler, FormEventHandler } from "react"
import { ChatStatus } from "../stores/use-chat-store"

type PromptAreaProps = {
  input: string
  status: ChatStatus
  hasConversation: boolean
  onInputChange: ChangeEventHandler<HTMLTextAreaElement>
  onSubmit: FormEventHandler<HTMLFormElement>
}

const PromptArea = ({ input, status, hasConversation, onInputChange, onSubmit }: PromptAreaProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 w-full">
      <div className="mx-auto flex size-full flex-col items-center justify-center">
        {!hasConversation && <WelcomeMessage className="pointer-events-auto mb-4 grow md:grow-0" />}

        {hasConversation && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="size-full origin-bottom"
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          layout
          className="pointer-events-auto left-1/2 flex w-full max-w-[90%] shrink-0 -translate-x-1/2 items-center justify-center bg-secondary p-4 pt-0">
          <AIInput className="w-full max-w-3xl" onSubmit={onSubmit}>
            <AIInputTextarea maxHeight={300} onChange={onInputChange} value={input} />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton iconOnly>
                  <Paperclip size={16} />
                </AIInputButton>
                <AIInputButton iconOnly>
                  <Telescope size={16} />
                </AIInputButton>
                <AIInputButton>
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </AIInputButton>
              </AIInputTools>
              <AIInputSubmit disabled={!input || status === "streaming"} status={status} />
            </AIInputToolbar>
          </AIInput>
        </motion.div>

        {!hasConversation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.8 }}
            className="pointer-events-auto mt-6 hidden max-w-3xl flex-wrap items-center gap-2 md:flex">
            {SUGGESTION_ITEMS.map((item) => (
              <Button key={item.id} size="sm" className="gap-2">
                {item.icon}
                {item.text}
              </Button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

const WelcomeMessage = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex w-full max-w-3xl flex-col items-start justify-center", className)}>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold md:text-xl md:font-medium">
        Hello there!
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-2xl font-medium text-muted-foreground md:text-xl md:font-normal">
        How can I help you today?
      </motion.h1>
    </div>
  )
}

export default PromptArea
