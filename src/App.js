import './App.css';
import styled from 'styled-components';
// import Background from './components/background.js';
// import DetailList from './components/detail_list.js';
import Story from './components/story.js'
import DetailBoard from './components/detail_board.js';
import { useState } from 'react';

const StyledAppDiv = styled.div`
  display: flex;
  height: 600px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
`;


function App() {

  const NUMDETAILS = 16;
  const possibleConnectors = [
    [1, 1], [1, 2], [1, 3],
    [2, 1], [2, 2], [2, 3],
    [3, 1], [3, 2], [3, 3],
  ];
  const possibleTypes = ['who', 'where', 'when'];

  // Helper function to generate random integers
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  } ;


  const generateDetailList = (num = NUMDETAILS) => {
    return new Array(num).fill(undefined).map((x, i) => {
      return {
        type: possibleTypes[ getRandomInt(possibleTypes.length) ],
        connectors: possibleConnectors[ getRandomInt(possibleConnectors.length) ],
        selected: false,
      };
    });
  };

  /////////////////////// Click handler functions
  // Handle Click on Details on Board
  const handleBoardClick = (idx) => {
    // Adjust Selected Status of Detail
    // Push copy of Detail to Story list
    // Call game-state check

    let tempState = {...gameState};

    // First check whether it's already selected
    if (tempState['detailList'][idx]['selected']) {
      // Currently, I'm thinking that if it's already selected, and you click, nothing happens
      // You've gotta click on the story-detail to unselect it
      return;

    } else {

      // Otherwise, select it
      let storyDetail = {...tempState['detailList'][idx]};
      storyDetail['boardIdx'] = idx;

      tempState['storyDetails'].push(
        storyDetail
      );

      tempState['detailList'][idx]['selected'] = true;
    }
    
    // Now here's where we do all the game checks and update logic, etc.
    
    setGameState(tempState);
    return;
  };
  
  
  // Handle Click on Story Details
  const handleStoryClick = (idx) => {
    // Adjust Selected Status of Detail
    // Remove copy of Detail from Story list
    // Call game-state check
    
    let tempState = {...gameState};
    
    tempState['detailList'][ tempState['storyDetails'][idx]['boardIdx'] ]['selected'] = false;
    
    tempState['storyDetails'].splice(idx, 1);

    // Now here's where we do all the game checks and update logic, etc.

    setGameState(tempState);
    return;
  };

  ////////////////////// STATE INITIALIZERS
  const initialState = {
    detailList: generateDetailList(NUMDETAILS),
    storyDetails: [],
  };
  
  const [gameState, setGameState] = useState(initialState);

  return (
    <StyledAppDiv>
      <DetailBoard
        detailList = {gameState['detailList']}
        handleBoardClick = {handleBoardClick}
      />
      <Story 
        storyDetails = {gameState['storyDetails']}
        handleStoryClick = {handleStoryClick}
      />
    </StyledAppDiv>
  );
}

export default App;
