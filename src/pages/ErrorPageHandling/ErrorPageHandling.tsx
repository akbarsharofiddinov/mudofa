import React from 'react'

const ErrorPageHandling: React.FC = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        {/* Page not working */}
        <div className="max-w-xl w-full mx-4 md:mx-0 text-center p-8 rounded-2xl border border-slate-200/70 bg-white/70 shadow-2xl backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-800">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Bu sahifa hozircha ishlamayapti
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Iltimos, birozdan so‘ng yana urining yoki bosh sahifaga qayting.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99] transition"
            >
              Bosh sahifa
            </a>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            >
              Qayta urinish
            </button>
          </div>

          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">Xato kodi: 503</div>
        </div>
      </div>
    </>
  )
}

export default ErrorPageHandling