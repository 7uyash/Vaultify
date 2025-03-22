"use client"

import { useEffect, useState } from "react"

export function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-sky-400 to-sky-600">
            <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-sky-400 to-sky-600"></div>
            </div>
          </div>
          <span className="font-bold text-xl">Vaultify</span>
        </div>

        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

