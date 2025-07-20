"use client"

import { format } from "date-fns"
import { CheckCircle, Circle, Play, Weight, RotateCcw } from "lucide-react"
import type { Exercise } from "@/app/page"

interface ExerciseListProps {
  exercises: Exercise[]
  selectedDate: Date
  onExerciseSelect: (exercise: Exercise) => void
}

export function ExerciseList({ exercises, selectedDate, onExerciseSelect }: ExerciseListProps) {
  const completedCount = exercises.filter((ex) => ex.completed).length
  const totalCount = exercises.length

  if (exercises.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 mb-4">
          <Circle className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts scheduled</h3>
        <p className="text-gray-600">Enjoy your rest day for {format(selectedDate, "MMMM d, yyyy")}!</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Today's Workout</h2>
          <span className="text-sm text-gray-600">
            {completedCount}/{totalCount} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => onExerciseSelect(exercise)}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              exercise.completed
                ? "border-green-200 bg-green-50"
                : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-md"
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Completion Status */}
              <div className="flex-shrink-0 mt-1">
                {exercise.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-400" />
                )}
              </div>

              {/* Exercise Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-medium ${
                    exercise.completed ? "text-green-800 line-through" : "text-gray-900"
                  }`}
                >
                  {exercise.name}
                </h3>
                <p className={`text-sm mt-1 ${exercise.completed ? "text-green-600" : "text-gray-600"}`}>
                  {exercise.description}
                </p>

                {/* Exercise Details */}
                <div className="flex items-center space-x-4 mt-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <RotateCcw className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{exercise.rounds} rounds</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{exercise.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Weight className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{exercise.weight}</span>
                  </div>
                </div>
              </div>

              {/* Action Indicator */}
              {!exercise.completed && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      {completedCount > 0 && completedCount < totalCount && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-blue-800 font-medium">
            Great progress! {totalCount - completedCount} exercise{totalCount - completedCount !== 1 ? "s" : ""} to go!
          </p>
        </div>
      )}
    </div>
  )
}
