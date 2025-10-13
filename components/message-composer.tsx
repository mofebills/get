"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

interface MessageComposerProps {
  subject: string
  message: string
  onSubjectChange: (value: string) => void
  onMessageChange: (value: string) => void
}

export function MessageComposer({ subject, message, onSubjectChange, onMessageChange }: MessageComposerProps) {
  return (
    <Card className="p-8 shadow-2xl border-0 bg-black/40 backdrop-blur-xl card-glow">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-lg">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Compose Message</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="subject" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="Enter message subject..."
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/50"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="message" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="min-h-[320px] resize-none leading-relaxed bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/50"
          />
          <p className="text-xs text-gray-400 font-mono">{message.length} characters</p>
        </div>
      </div>
    </Card>
  )
}
