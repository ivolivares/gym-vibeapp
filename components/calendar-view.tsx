"use client"

import { useState } from "react"
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WorkoutData } from "@/app/page"

interface CalendarViewProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  workoutData: WorkoutData | null
}

type ViewMode = "daily" | "weekly" | "monthly"

export function CalendarView({ selectedDate, onDateSelect, workoutData }: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("daily")

  const hasWorkout = (date: Date): boolean => {
    if (!workoutData) return false
    const dateString = format(date, "yyyy-MM-dd")
    return workoutData.workouts.some((w) => w.date === dateString)
  }

  const getCompletionStatus = (date: Date): "completed" | "partial" | "none" => {
    if (!workoutData) return "none"
    const dateString = format(date, "yyyy-MM-dd")
    const workout = workoutData.workouts.find((w) => w.date === dateString)
    if (!workout) return "none"

    const completed = workout.exercises.filter((e) => e.completed).length
    const total = workout.exercises.length

    if (completed === total && total > 0) return "completed"
    if (completed > 0) return "partial"
    return "none"
  }

  const navigateDate = (direction: "prev" | "next") => {
    if (viewMode === "daily") {
      onDateSelect(direction === "prev" ? subDays(selectedDate, 1) : addDays(selectedDate, 1))
    } else if (viewMode === "weekly") {
      onDateSelect(direction === "prev" ? subDays(selectedDate, 7) : addDays(selectedDate, 7))
    } else {
      onDateSelect(direction === "prev" ? subMonths(selectedDate, 1) : addMonths(selectedDate, 1))
    }
  }

  const renderDailyView = () => (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="text-center">
        <div className="text-lg font-semibold">{format(selectedDate, "EEEE")}</div>
        <div className="text-sm text-gray-600">{format(selectedDate, "MMMM d, yyyy")}</div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  const renderWeeklyView = () => {
    const weekStart = startOfWeek(selectedDate)
    const weekEnd = endOfWeek(selectedDate)
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-lg font-semibold">
            {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const isSelected = isSameDay(day, selectedDate)
            const status = getCompletionStatus(day)
            return (
              <button
                key={day.toISOString()}
                onClick={() => onDateSelect(day)}
                className={`p-2 text-center rounded-lg transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : hasWorkout(day)
                      ? status === "completed"
                        ? "bg-green-100 text-green-800"
                        : status === "partial"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-100"
                }`}
              >
                <div className="text-xs">{format(day, "EEE")}</div>
                <div className="text-sm font-medium">{format(day, "d")}</div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderMonthlyView = () => {
    const monthStart = startOfMonth(selectedDate)
    const monthEnd = endOfMonth(selectedDate)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-lg font-semibold">{format(selectedDate, "MMMM yyyy")}</div>
          <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const isSelected = isSameDay(day, selectedDate)
            const isCurrentMonth = day.getMonth() === selectedDate.getMonth()
            const status = getCompletionStatus(day)

            return (
              <button
                key={day.toISOString()}
                onClick={() => onDateSelect(day)}
                className={`p-2 text-center rounded-lg transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : !isCurrentMonth
                      ? "text-gray-300"
                      : hasWorkout(day)
                        ? status === "completed"
                          ? "bg-green-100 text-green-800"
                          : status === "partial"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                }`}
              >
                <div className="text-sm">{format(day, "d")}</div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-b">
      {/* View Mode Tabs */}
      <div className="flex border-b">
        {(["daily", "weekly", "monthly"] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${
              viewMode === mode ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Calendar Content */}
      {viewMode === "daily" && renderDailyView()}
      {viewMode === "weekly" && renderWeeklyView()}
      {viewMode === "monthly" && renderMonthlyView()}
    </div>
  )
}
