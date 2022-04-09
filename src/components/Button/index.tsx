import * as C from './styles';

type Props = {
  label: string;
  icon?: any;
  onclick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onclick}: Props) => {

  return (
    <C.Container onClick={onclick}>
      {icon &&
      <C.IconArea>
        <C.Icon src={icon} alt="Restart icon"/>
      </C.IconArea>
      }
      <C.Label>{label}</C.Label>
    </C.Container>
  )
}