import { useEffect } from 'react'

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3
                    bg-navy-3 border border-gold/50 text-cream text-sm
                    px-4 py-3 rounded-xl shadow-2xl animate-slide-up">
      <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
      {message}
    </div>
  )
}
