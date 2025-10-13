"use client"

import { useState } from "react"
import { MessageComposer } from "./message-composer"
import { RecipientManager } from "./recipient-manager"
import { SendPanel } from "./send-panel"
import { Zap } from "lucide-react"

export function BulkMessageSender() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [recipients, setRecipients] = useState<string[]>([])
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (recipients.length === 0 || !message) {
      return
    }

    setIsSending(true)

    // Simulate sending messages
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSending(false)

    // Reset form
    setSubject("")
    setMessage("")
    setRecipients([])

    alert(`Successfully sent ${recipients.length} messages!`)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-4 rounded-2xl shadow-lg shadow-purple-500/50">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-6xl font-black text-white mb-3 text-balance neon-text tracking-tight">
          BULK MESSAGE SENDER
        </h1>
        <p className="text-gray-300 text-xl font-medium">Unleash the power of mass communication</p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Message Composer */}
        <MessageComposer
          subject={subject}
          message={message}
          onSubjectChange={setSubject}
          onMessageChange={setMessage}
        />

        {/* Right Column - Recipients & Send */}
        <div className="space-y-8">
          <RecipientManager recipients={recipients} onRecipientsChange={setRecipients} />

          <SendPanel
            recipientCount={recipients.length}
            canSend={recipients.length > 0 && message.length > 0}
            isSending={isSending}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  )
}
