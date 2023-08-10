import './App.css'
import { Section } from './components/Section'


function App() {

  return (
    <div className='flex justify-center w-screen h-screen bg-slate-900'>
      <div className='flex flex-col gap-4 max-w-7xl w-full p-8 bg-slate-700'>
        <h1 className='text-2xl'>
          <strong>Java Crud Application</strong>
        </h1>
        <div className='w-full h-full bg-slate-900 p-4 rounded'>
          <Section />
        </div>
      </div>
    </div>
  )
}

export default App
