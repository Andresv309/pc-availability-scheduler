import { ICellRendererParams } from '@ag-grid-community/core';
import { MdFace, MdFace5 } from 'react-icons/md'
import { CARDID_TYPE } from '../../constants/emuns';

const cardIDTypeIcons = {
  [CARDID_TYPE.CC]: <MdFace />,
  [CARDID_TYPE.TI]: <MdFace5 />,
};

function CardIDType (props: ICellRendererParams) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <span className='flex items-center gap-2'>
      {cellValue && cardIDTypeIcons[cellValue]}
      {cellValue}
    </span>
  )
}

export default CardIDType

