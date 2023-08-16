import { ReactNode } from 'react'

import { NavBar } from './components/NavBar'

function App({ children } : { children: ReactNode}) {
  return (
    <div className='flex flex-col items-center w-screen h-screen'>
      <NavBar />
      <main className='flex flex-col gap-4 max-w-7xl w-full p-4 h-full rounded'>
        <div className='w-full h-full'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default App
