import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import baseSvg from '../../svgs/base.svg'
import base from '../../assets/base.png'
import { items } from '../../data/items';

type Props = {
  item: GridItemType;
  onClick: () => void;
  hoverBackground: string;
  //isPlayerOne: boolean;
}
export const GridItem = ({item, onClick, hoverBackground}: Props) => {

  return (
    <C.Container
      onClick={onClick}
      // isPlayerOne={isPlayerOne}
      showBackground={item.permanentShown || item.shown}
      background={ item.permanentShown ? item.background : hoverBackground }
      //hoverBackground={hoverBackground}
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