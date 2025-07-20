"use client"

import { ArrowLeft, CheckCircle, X, Play, Weight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Exercise } from "@/app/page"
import Image from "next/image"

interface ExerciseDetailProps {
  exercise: Exercise
  onAction: (action: "confirm" | "discard") => void
  onBack: () => void
}

export function ExerciseDetail({ exercise, onAction, onBack }: ExerciseDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-blue-700">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Exercise Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Exercise Image/Video */}
        <div className="mb-6">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image src={exercise.mediaUrl || "/placeholder.svg"} alt={exercise.name} fill className="object-cover" />
          </div>
        </div>

        {/* Exercise Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{exercise.name}</h2>
          <p className="text-gray-600 text-base leading-relaxed">{exercise.description}</p>
        </div>

        {/* Exercise Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <RotateCcw className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{exercise.rounds}</div>
            <div className="text-sm text-gray-600">Rounds</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Play className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{exercise.quantity}</div>
            <div className="text-sm text-gray-600">Quantity</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Weight className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{exercise.weight}</div>
            <div className="text-sm text-gray-600">Weight</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
          <div className="space-y-2 text-gray-600">
            <p>
              • Complete {exercise.rounds} rounds of {exercise.quantity}
            </p>
            <p>• Rest 60-90 seconds between rounds</p>
            <p>• Focus on proper form over speed</p>
            <p>• Stop if you feel any pain or discomfort</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-md mx-auto space-y-3">
          <Button
            onClick={() => onAction("confirm")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
            size="lg"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark as Completed
          </Button>
          <Button
            onClick={() => onAction("discard")}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 py-3 text-lg font-medium"
            size="lg"
          >
            <X className="h-5 w-5 mr-2" />
            Skip Exercise
          </Button>
        </div>
      </div>
    </div>
  )
}
