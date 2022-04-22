import styled from "styled-components";

type ContainerProps = {
  showBackground: boolean;
  background: string;
  //hoverBackground: string;
  // isPlayerOne: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${props => props.showBackground ? props.background : '#E2E3E3'};
  height: 100px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.background};
  }
`

type IconProps = {
  opacity?: number;
}

export const Icon = styled.img<IconProps>`
  height: 60px;
  width: 60px;
  opacity: 1;
`

export const Icon2 = styled.img<IconProps>`
  height: 40px;
  width: 40px;
  opacity: ${ props => props.opacity ?? 1 };
`
