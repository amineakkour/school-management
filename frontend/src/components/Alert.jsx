import { useEffect, useState } from "react"

export default function Alert({alertText, setAlertText, delay = 5_000}) {
  const [dispaly, setDispaly] = useState(true);

  useEffect(() => {
    if(alertText){
      var id = setTimeout(() => setAlertText(''), delay);
    }
    return () => clearTimeout(id);
  }, [alertText])

  return (
  <div id="alert-2" className={`${dispaly ? "block" : "hidden"} z-50 absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-2 p-3 px-2 md:p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>

    <span className="sr-only">Info</span>

    <div className="ms-3 text-xs md:text-sm font-medium min-w-40 md:min-w-52">
      {alertText || "Quelque chose ne va pas, veuillez réessayer plus tard"}
    </div>

    <button onClick={() => setDispaly(false)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
      <span className="sr-only">Close</span>
      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>

  </div>
  )
}