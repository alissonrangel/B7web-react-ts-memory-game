import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import baseSvg from '../../svgs/base.svg'
import base from '../../assets/base.png'
import { items } from '../../data/items';

type Props = {
  item: GridItemType;
  onClick: () => void;
}
export const GridItem = ({item, onClick}: Props) => {

  return (
    <C.Container
      onClick={onClick}
      showBackground={item.permanentShown || item.shown}
    >      
      { !item.permanentShown && !item.shown &&
        <C.Icon src={base} alt="Base icon"/>
      }
      {
        (item.permanentShown || item.shown) && item.item !== null &&
        <C.Icon2 src={ items[item.item].icon} alt="Game Icon"/>
      }
    </C.Container>
  )
}