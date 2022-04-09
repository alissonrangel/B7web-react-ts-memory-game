import React, { useEffect, useState } from 'react';
import * as C from './App.styles';
import logoImage from './assets/logo4.png';
import restartImage from './svgs/restart.svg';
import { InfoItem } from './components/InfoItem';
import {Button} from './components/Button';

import { GridItemType } from './types/GridItemType';

import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

function App() {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, [])

  useEffect(() => {
    const timer = setInterval(() =>{
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);

    return () => clearInterval(timer);

  },[playing, timeElapsed])

  useEffect(() => {
    if( shownCount === 2){
      let opened = gridItems.filter( item =>  item.shown === true);

      if (opened.length === 2) {
        let tmpGrid = [...gridItems];
        if (opened[0].item === opened[1].item) {          
          for (const i in tmpGrid) {
            if (tmpGrid[i].shown === true) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          } 
          setGridItems(tmpGrid);     
          setShownCount(0);                             
        } else {                    
          setTimeout(() => {            
            for (const i in tmpGrid) {
              if (tmpGrid[i].shown === true) {              
                tmpGrid[i].shown = false;
              }            
            }
            setGridItems(tmpGrid);     
            setShownCount(0);            
          }, 1000);
        }                        
        setMoveCount(moveCount + 1);
      }
    }
  },[shownCount, gridItems]);

  useEffect(() => {
    if (moveCount > 0 && gridItems.every(i => i.permanentShown === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);    
    setMoveCount(0);
    setShownCount(0);
    
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let j = 0; j < items.length; j++) {
        let pos = -1;
        while ( pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = j;
      }      
    }

    setGridItems(tmpGrid);

    setPlaying(true);

  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;

        setShownCount(shownCount + 1);
      }
      
      setGridItems(tmpGrid);
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="300" alt="" />
        </C.LogoLink>
        <C.InfoArea>          
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={`${moveCount}`} />
        </C.InfoArea>
        <Button label="Reiniciar!" icon={restartImage} onclick={resetAndCreateGrid} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {
            gridItems.map((item, index) => (
              <GridItem 
                key={index}
                item={item}
                onClick={() => handleItemClick(index) }
              />
            )
            )
          }
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;
