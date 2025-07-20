"use client"

import { useState, useEffect } from "react"
import { CalendarView } from "@/components/calendar-view"
import { ExerciseList } from "@/components/exercise-list"
import { ExerciseDetail } from "@/components/exercise-detail"
import { SuccessScreen } from "@/components/success-screen"
import { format } from "date-fns"

export interface Exercise {
  id: string
  name: string
  description: string
  mediaUrl: string
  rounds: number
  quantity: string
  weight: string
  completed: boolean
}

export interface WorkoutDay {
  date: string
  exercises: Exercise[]
}

export interface WorkoutData {
  workouts: WorkoutDay[]
}

export default function HomePage() {
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load workout data
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch("/data/workouts.json")
        const data = await response.json()
        setWorkoutData(data)
      } catch (error) {
        console.error("Failed to load workout data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadWorkouts()
  }, [])

  // Get exercises for selected date
  const getExercisesForDate = (date: Date): Exercise[] => {
    if (!workoutData) return []
    const dateString = format(date, "yyyy-MM-dd")
    const workout = workoutData.workouts.find((w) => w.date === dateString)
    return workout?.exercises || []
  }

  // Update exercise completion status
  const updateExercise = (exerciseId: string, completed: boolean) => {
    if (!workoutData) return

    const updatedWorkouts = workoutData.workouts.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, completed } : exercise,
      ),
    }))

    setWorkoutData({ workouts: updatedWorkouts })

    // Check if all exercises for the day are completed
    const todayExercises = getExercisesForDate(selectedDate)
    const allCompleted = todayExercises.every((ex) => (ex.id === exerciseId ? completed : ex.completed))

    if (allCompleted && todayExercises.length > 0) {
      setShowSuccess(true)
    }
  }

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise)
  }

  const handleExerciseAction = (action: "confirm" | "discard") => {
    if (!selectedExercise) return

    updateExercise(selectedExercise.id, action === "confirm")
    setSelectedExercise(null)
  }

  const handleBackToView = () => {
    setShowSuccess(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workouts...</p>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return <SuccessScreen onBackToView={handleBackToView} />
  }

  if (selectedExercise) {
    return (
      <ExerciseDetail
        exercise={selectedExercise}
        onAction={handleExerciseAction}
        onBack={() => setSelectedExercise(null)}
      />
    )
  }

  const todayExercises = getExercisesForDate(selectedDate)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold text-center">Gym Tracker</h1>
        </div>

        {/* Calendar View */}
        <CalendarView selectedDate={selectedDate} onDateSelect={setSelectedDate} workoutData={workoutData} />

        {/* Exercise List */}
        <ExerciseList exercises={todayExercises} selectedDate={selectedDate} onExerciseSelect={handleExerciseSelect} />
      </div>
    </div>
  )
}
