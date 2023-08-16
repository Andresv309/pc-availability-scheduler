import { Link } from "react-router-dom"
import StudentLogo from '../images/studentLogo.png'

export function NavBar() {
  return (
    <nav className='flex justify-between items-center bg-slate-900 w-full py-2 px-8 h-16'>
      <div>
        <Link to="/">
          <div className='flex items-center gap-2 text-lg'>
            <span className="flex items-center gap-4">
              <img width={32} src={StudentLogo} alt="Logo de Estudiante" />
              Sistema de Asignación de Computadores
            </span>
            <span className='text-emerald-300'>
              ADSO
            </span>
          </div>
        </Link>
      </div>
      <div>
        <ul className='flex gap-4'>
          <li className='hover:underline hover:text-emerald-300' ><Link to="/estudiantes">Estudiantes</Link></li>
          <li className='hover:underline hover:text-emerald-300' ><Link to="/computadores">Computadores</Link></li>
          <li className='hover:underline hover:text-emerald-300' ><Link to="/aula">Aula</Link></li>
          <li className='hover:underline hover:text-emerald-300' ><Link to="/asignacion">Asignación</Link></li>
        </ul>
      </div>
    </nav>
  )
}