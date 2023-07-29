import './App.css';
import styled from 'styled-components';
// import Background from './components/background.js';
// import DetailList from './components/detail_list.js';
import StoryCompleteModal from './components/story_complete_modal';
import Story from './components/story.js'
import DetailBoard from './components/detail_board.js';
import { useState } from 'react';

const StyledAppDiv = styled.div`
  display: flex;
  height: 600px;

  flex-direction: column;
  justify-content: flex-start;
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

  /////////////////////// Animation Timing Constants
  // For now I've only got one...
  const completeModalTime = 1500;

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
        // let diffState = JSON.parse(JSON.stringify(tempState));

        setGameState(tempState);
        
        setTimeout(() => {
          tempState = handleCompletedStory(tempState);
          setGameState(tempState);
        }, completeModalTime + 200);
    }

    setGameState(tempState);

    return;
  };
  

  // Function to progress game logic after a turn is complete
  const handleCompletedStory = (oldState) => {
    let tempState = {...oldState};

    // TODO: Point tracking logic goes here
    
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


  ////////////////////// STATE INITIALIZERS
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
  };
  
  const [gameState, setGameState] = useState(initialState);

  return (
    <StyledAppDiv>
      {(gameState['isValid'] && gameState['isComplete']) && 
        <StoryCompleteModal duration={completeModalTime}/>
      }
      <DetailBoard
        detailList = {gameState['detailList']}
        handleBoardClick = {handleBoardClick}
      />

      <Story 
        storyDetails = {gameState['storyDetails']}
        handleStoryClick = {handleStoryClick}
        IO = {gameState['IO']}
      />

      { 
        (( !(gameState['isConnecting']) && gameState['storyDetails'].length > 0 ) || 
          (!(gameState['isValid']) && gameState['detailTypeCount']['who'] > 0 
            && gameState['detailTypeCount']['where'] > 0 
            && gameState['detailTypeCount']['when'] > 0)) && 
            <font color="red">
              <p />This story doesn't add up!
            </font>
      }

    </StyledAppDiv>
  );
}

export default App;
