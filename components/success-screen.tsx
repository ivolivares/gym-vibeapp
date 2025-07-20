"use client"

import { Trophy, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessScreenProps {
  onBackToView: () => void
}

export function SuccessScreen({ onBackToView }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            {/* Floating stars */}
            <Star className="h-6 w-6 text-yellow-300 absolute top-4 left-1/4 animate-pulse" />
            <Star className="h-4 w-4 text-yellow-300 absolute top-8 right-1/4 animate-pulse delay-300" />
            <Star className="h-5 w-5 text-yellow-300 absolute bottom-4 left-1/3 animate-pulse delay-700" />
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">Workout Complete!</h1>
          <p className="text-lg opacity-90 mb-2">Congratulations! You've finished all your exercises for today.</p>
          <p className="text-base opacity-75">Keep up the great work and stay consistent with your fitness journey!</p>
        </div>

        {/* Stats */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-75">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">🔥</div>
              <div className="text-sm opacity-75">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">💪</div>
              <div className="text-sm opacity-75">Strong</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onBackToView}
          className="w-full bg-white text-gray-900 hover:bg-gray-100 py-3 text-lg font-medium"
          size="lg"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Calendar
        </Button>

        {/* Motivational Quote */}
        <div className="mt-8 text-white/75 text-sm italic">"The only bad workout is the one that didn't happen."</div>
      </div>
    </div>
  )
}
