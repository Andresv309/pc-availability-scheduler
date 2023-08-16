import { TiWeatherSunny, TiWeatherPartlySunny, TiWeatherNight } from 'react-icons/ti'
import { ICellRendererParams } from '@ag-grid-community/core'
import { SESSION } from '../../constants/emuns'

const sessionIcons = {
  [SESSION.MORNING]: <TiWeatherPartlySunny />,
  [SESSION.AFTERNOON]: <TiWeatherSunny />,
  [SESSION.NIGHT]: <TiWeatherNight />,
};

function SessionTypeRenderer (props: ICellRendererParams<unknown, keyof typeof SESSION>) {
  const cellValue = (props.valueFormatted ? props.valueFormatted : props.value) 

  return (
    <span className='flex items-center gap-2'>
      {cellValue && sessionIcons[cellValue]}
      {cellValue}
    </span>
  )
}

export default SessionTypeRenderer

