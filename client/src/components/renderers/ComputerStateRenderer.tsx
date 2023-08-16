import { ICellRendererParams } from '@ag-grid-community/core';
import { COMPUTER_STATE } from '../../constants/emuns';
import { GiPlainCircle } from 'react-icons/gi'

const cardIDTypeIcons = {
  [COMPUTER_STATE.WORKING]: <GiPlainCircle color="green"/>,
  [COMPUTER_STATE.MAINTENANCE]: <GiPlainCircle color="purple"/>,
  [COMPUTER_STATE.OUT_OF_SERVICE]: <GiPlainCircle color="orange"/>,
  [COMPUTER_STATE.BROKEN]: <GiPlainCircle color="red"/>,
};

function ComputerStateRenderer (props: ICellRendererParams) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <span className='flex items-center gap-2'>
      {cellValue && cardIDTypeIcons[cellValue]}
      {cellValue}
    </span>
  )
}

export default ComputerStateRenderer

