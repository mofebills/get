"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"

interface SendPanelProps {
  recipientCount: number
  canSend: boolean
  isSending: boolean
  onSend: () => void
}

export function SendPanel({ recipientCount, canSend, isSending, onSend }: SendPanelProps) {
  return (
    <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl card-glow">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          {canSend ? (
            <div className="bg-green-500/20 p-2 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
            </div>
          ) : (
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-bold text-xl text-white mb-2">Ready to Send</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {canSend
                ? `Your message will be sent to ${recipientCount} ${recipientCount === 1 ? "recipient" : "recipients"}.`
                : "Add recipients and compose your message to get started."}
            </p>
          </div>
        </div>

        <Button
          onClick={onSend}
          disabled={!canSend || isSending}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white border-0 shadow-2xl shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          size="lg"
        >
          {isSending ? (
            <>
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3" />
              Sending Messages...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-3" />
              Send to {recipientCount} {recipientCount === 1 ? "Recipient" : "Recipients"}
            </>
          )}
        </Button>

        {canSend && !isSending && (
          <p className="text-xs text-center text-gray-400 font-medium">Double-check your message before sending</p>
        )}
      </div>
    </Card>
  )
}
