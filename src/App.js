import './App.css';
import styled from 'styled-components';
import { useState } from 'react';

import Sidebar from './components/sidebar.js';
import PlayArea from './components/play_area.js';

const StyledAppDiv = styled.div`
  display: flex;

  margin: 5px;
  padding: 5px;
  height: 95%;
  width: 95%;

  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

function App() {

  const NUMDETAILS = 16;
  const NUMFORSTORY = 3;
  const MAXSCORENEEDED = 8;

  const possibleConnectors = [
    [1, 1], [1, 2], [1, 3],
    [2, 1], [2, 2], [2, 3],
    [3, 1], [3, 2], [3, 3],
  ];
  const possibleTypes = ['who', 'where', 'when'];

  /////////////////////// Animation Timing Constants
  const completeModalTime = 2000;
  const refreshEarnedTime = 2000;
  const newPointTime = 1000;
  const blankPointTime = 500;
   
  /////////////////////////////// HELPER FUNCTIONS ////////////////////////////

  // Helper function to generate random integers
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  } ;

  // Helper function to  generate the Detail List
  const generateDetailList = (num = NUMDETAILS) => {
    return new Array(num).fill(undefined).map((x, i) => {
      return {
        type: possibleTypes[ getRandomInt(possibleTypes.length) ],
        connectors: possibleConnectors[ getRandomInt(possibleConnectors.length) ],
        selected: false,
      };
    });
  };

  // Helper function to generate a new scoreNeeded
  // Todo: make this semi-random dependent on what level they're on
  const generateScoreNeeded = () => {
    return getRandomInt(MAXSCORENEEDED - 2) + 3;
  }

  // Function to refresh the detail board and story
  const refreshDetails = (oldState) => {
    let tempState = {...oldState};

    // Replace all the details in the detailBoard and clear the story
    // Do we need to clear the story so frequently that it's its own function?
    // Refreshing the detail board should be...

    // Reset Detail Type Counts
    tempState['detailTypeCount'] = {
      who: 0,
      where: 0,
      when: 0,
    };
    
    // Reset valid + complete checks
    tempState['isValid'] = false;
    tempState['isComplete'] = false;
    tempState['isConnecting'] = false;

    // Set the Detail List
    tempState['detailList'] = generateDetailList(NUMDETAILS);

    // Clear the story
    tempState['storyDetails'] = [];

    return tempState;

  };


  // Function to progress game logic after a turn is complete
  const handleCompletedStory = (oldState) => {
    let tempState = {...oldState};

    // TODO: Point tracking logic goes here
    // Check if it's longer than necessary, and give refresh
    if (tempState['storyDetails'].length > NUMFORSTORY) { 
      // Animate Refresh Earned
      setShowRefreshEarned(true);
      
      // I think the animation Booleans need to be their own state -- they can't be part of Game State
      setTimeout(() => {
        setShowRefreshEarned(false);
      }, refreshEarnedTime + 200);

      // Now give the refresh
      tempState['numRefreshes'] = tempState['numRefreshes'] + 1;

    }

    // Add one to the score
    tempState['score'] = tempState['score'] + 1;

    // Check if we've hit the scoreNeeded
    if (tempState['score'] === tempState['scoreNeeded']) {
      // End the level
      // TODO: encapsulate this into its own function
      // TODO: Add level logic

      // Set the score back to 0 and generate a new max score
      tempState['score'] = 0;
      tempState['scoreNeeded'] = generateScoreNeeded();
    }
    
    // Reset Detail Type Counts
    tempState['detailTypeCount'] = {
      who: 0,
      where: 0,
      when: 0,
    };
    
    // Reset valid + complete checks
    tempState['isValid'] = false;
    tempState['isComplete'] = false;
    tempState['isConnecting'] = false;
    
    // Change IO Connectors
    tempState['IO'] = possibleConnectors[ getRandomInt(possibleConnectors.length) ];
    
    // Refresh missing details in list
    const refreshIndices = tempState['storyDetails'].map( (x) => {
      return x['boardIdx'];
    });
    
    for (let i = 0; i < refreshIndices.length; i++) {
      tempState['detailList'][ refreshIndices[i] ] = generateDetailList(1)[0];
    }

    // Clear the story
    tempState['storyDetails'] = [];
    
    return tempState;
  };


  /////////////////////////////// CLICK HANDLERS //////////////////////////////

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
    // Update detailTypeCount
    tempState['detailTypeCount'][ tempState['detailList'][idx]['type'] ] = tempState['detailTypeCount'][ tempState['detailList'][idx]['type'] ] + 1; // Not sure if I can -- this, so I'm doing it long-hand    
    
    // Check to see if the connections all match
    [ tempState['isValid'], tempState['isConnecting'] ] = checkStoryConnections(tempState['storyDetails'], tempState['IO']);

    if ( tempState['isValid']  ) {
    
      // Then Check if the story is complete
      if (tempState['detailTypeCount']['who'] > 0 
        && tempState['detailTypeCount']['where'] > 0 
        && tempState['detailTypeCount']['when'] > 0) {
          
        tempState['isComplete'] = true;
      }
    }
      
    // Call next function
    if (tempState['isValid'] && tempState['isComplete']) {

        // We need to set state so that the animation fires? 
        setShowCompleteModal(true);
        
        setTimeout(() => {
          // I think it's best practice to do this, so that we dont' have state race conditions
          setShowCompleteModal(false);
        }, completeModalTime + 200);
        
        tempState = handleCompletedStory(tempState);
    }

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
    
    let removedDetail = tempState['storyDetails'].splice(idx, 1)[0];

    // Now here's where we do all the game checks and update logic, etc.
    // Update detailTypeCount
    tempState['detailTypeCount'][removedDetail['type']] = tempState['detailTypeCount'][removedDetail['type']] - 1; // Not sure if I can -- this, so I'm doing it long-hand

    // If there's still details in the story, Check to see if the connections all match
    if (tempState['storyDetails'].length > 0 ) {
      [ tempState['isValid'], tempState['isConnecting'] ] = checkStoryConnections(tempState['storyDetails'], tempState['IO']);
    }

    setGameState(tempState);
    return;
  };

  // Handle Click on Refresh Button
  const handleRefreshClick = () => {
    let tempState = {...gameState};
    
    // Check whether refresh is valid
    if (gameState['numRefreshes'] < 1) {
      // If they don't have any refreshes it costs a point
      if (gameState['score'] < 1) {
        // Currently nothing happens though in theory it should end the game
        return;
      } else {

        setPointLossIdx(gameState['score']); 
        
        tempState['score'] = tempState['score'] - 1;
      }
    } else {
      tempState['numRefreshes'] = tempState['numRefreshes'] - 1;
    }

    // Refresh detail and story and decrement number of refreshes
    tempState = refreshDetails(tempState);

    setGameState(tempState);
    return;
  }


  // Function to check if all the connectors are valid
  const checkStoryConnections = (storyDetails, IO) => {
    let isValid = false;
    let isConnecting = false;

    // THIS IS SUPER MESSY, BUT I DON'T CARE RIGHT NOW
    // first check the Input of I against the first Detail connector
    if ( IO[0] === storyDetails[0]['connectors'][0]) {
      
      let midValid = true;
      for (let i = 0; i < storyDetails.length - 1; i++) {
        if (storyDetails[i]['connectors'][1] !== storyDetails[i + 1]['connectors'][0]) {
          midValid = false;
        }
      }

      if (midValid) {
        isConnecting = true;

        if ( storyDetails[ storyDetails.length - 1]['connectors'][1] === IO[1]) {
          // Finally
          isValid = true;
        }
      }
    }

    return [isValid, isConnecting];
  }

  /////////////////////////////// STATE INITIALIZERS //////////////////////////////
  const initialState = {
    detailList: generateDetailList(NUMDETAILS),
    storyDetails: [],
    detailTypeCount: {
      who: 0,
      where: 0,
      when: 0,
    },
    isValid: false,
    isConnecting: false,
    isComplete: false,
    IO: possibleConnectors[ getRandomInt(possibleConnectors.length) ],
    numRefreshes: 0,
    score: 0,
    scoreNeeded: 3,
  };
  
  const [gameState, setGameState] = useState(initialState);

  const [showRefreshEarned, setShowRefreshEarned] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [pointLossIdx, setPointLossIdx] = useState(0);

  return (
    <StyledAppDiv>

      <Sidebar 
        handleRefreshClick={handleRefreshClick}
        numRefreshes={gameState['numRefreshes']}
        refreshEarned={showRefreshEarned}
        refreshEarnedTime={refreshEarnedTime}
        score={gameState['score']}
        scoreNeeded={gameState['scoreNeeded']}
        newPointTime={newPointTime}
        blankPointTime={blankPointTime}
        pointLossIdx = {pointLossIdx}
      />
      
      <PlayArea 
        isValid = {gameState['isValid']}
        isComplete = {gameState['isComplete']}
        showCompleteModal = {showCompleteModal}
        completeModalTime = {completeModalTime}
        detailList = {gameState['detailList']}
        handleBoardClick = {handleBoardClick}
        storyDetails = {gameState['storyDetails']}
        handleStoryClick = {handleStoryClick}
        IO = {gameState['IO']}
        isConnecting = {gameState['isConnecting']}
        detailTypeCount = {gameState['detailTypeCount']}
      />

    </StyledAppDiv>
  );
}

export default App;
