"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, X, Plus } from "lucide-react"

interface RecipientManagerProps {
  recipients: string[]
  onRecipientsChange: (recipients: string[]) => void
}

export function RecipientManager({ recipients, onRecipientsChange }: RecipientManagerProps) {
  const [inputValue, setInputValue] = useState("")

  const handleAddRecipients = () => {
    if (!inputValue.trim()) return

    // Split by newlines, commas, or semicolons
    const newRecipients = inputValue
      .split(/[\n,;]+/)
      .map((email) => email.trim())
      .filter((email) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return email && emailRegex.test(email)
      })
      .filter((email) => !recipients.includes(email))

    if (newRecipients.length > 0) {
      onRecipientsChange([...recipients, ...newRecipients])
      setInputValue("")
    }
  }

  const handleRemoveRecipient = (email: string) => {
    onRecipientsChange(recipients.filter((r) => r !== email))
  }

  const handleClearAll = () => {
    onRecipientsChange([])
  }

  return (
    <Card className="p-8 shadow-2xl border-0 bg-black/40 backdrop-blur-xl card-glow">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Recipients</h2>
        </div>
        {recipients.length > 0 && (
          <Badge className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-white border-0 px-3 py-1">
            {recipients.length} {recipients.length === 1 ? "recipient" : "recipients"}
          </Badge>
        )}
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="recipients" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
            Add Recipients
          </Label>
          <Textarea
            id="recipients"
            placeholder="Enter email addresses (one per line or comma-separated)&#10;example@email.com, another@email.com"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-h-[120px] resize-none font-mono text-sm bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/50"
          />
        </div>

        <Button
          onClick={handleAddRecipients}
          className="w-full h-11 font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/30"
          disabled={!inputValue.trim()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Recipients
        </Button>

        {recipients.length > 0 && (
          <>
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Recipient List</p>
                <Button
                  onClick={handleClearAll}
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-gray-400 hover:text-white hover:bg-white/10"
                >
                  Clear All
                </Button>
              </div>
              <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2">
                {recipients.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 group hover:bg-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <span className="text-sm font-mono text-gray-200 truncate">{email}</span>
                    <Button
                      onClick={() => handleRemoveRecipient(email)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
