import './App.css';
import styled from 'styled-components';
import { useState } from 'react';

import Sidebar from './components/sidebar.js';
import PlayArea from './components/play_area.js';
import PlayerMessageContainer from './components/player_message_container';

const StyledAppDiv = styled.div`
  position: relative;
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

  const NUMDETAILS = 14; // Updating this to try out grid formatting
  const NUMFORSTORY = 5; // This is now used to determine how many slots are needed for a story
  const MAXSCORENEEDED = 8;

  const possibleConnectors = [
    [1, 1], [1, 2], [1, 3],
    [2, 1], [2, 2], [2, 3],
    [3, 1], [3, 2], [3, 3],
  ];
  // Will need to add in "Default" to this
  const possibleTypes = ['who', 'where', 'when', 'why',];

  /////////////////////// Difficulty / Level Progression Constants 
  // Let's begin by figuring out if the detail has a bomb
  const hasBomb = (level) => {
    // Don't have a bomb in the first level
    // Every level after that has an incremental 1% chance to generate a bomb
    return (Math.random() < 0.01 * (level - 1)) && (level > 1);
  };

  // If the detail has a bomb, what's the countdown?
  const generateCounter = (level) => {
    // Bombs have a countdown timer of 6 stories, but can be 1 shorter every 10 levels  
    return ( 6 - Math.min( 2, getRandomInt(Math.floor(level / 10) ) ) );
  }


  /////////////////////// Animation Timing Constants
  const completeModalTime = 2500;
  const refreshEarnedTime = 2000;
  const newPointTime = 1000;
  const blankPointTime = 500;
  const invalidStoryTime = 500;
   
  /////////////////////////////// HELPER FUNCTIONS ////////////////////////////

  // Helper function to generate random integers
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  } ;

  // Helper function to  generate the Detail List
  const generateDetailList = (num = NUMDETAILS, level = 1) => {
    return new Array(num).fill(undefined).map((x, i) => {
      return {
        type: possibleTypes[ getRandomInt(possibleTypes.length) ],
        connectors: possibleConnectors[ getRandomInt(possibleConnectors.length) ],
        selected: false,
        // This is where we actually want to randomly generate a bomb
        // For designing purposes, we'll just have every one exist for now
        counter: (hasBomb(level) ? generateCounter(level) : -1),

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
    
    // Reset Detail Type Counts
    // Would be more resilient if this wasn't hard-coded
    tempState['detailTypeCount'] = {
      who: 0,
      where: 0,
      when: 0,
      why: 0,
    };
    
    // Reset valid + complete checks
    tempState['isValid'] = false;
    tempState['isComplete'] = false;
    tempState['isConnecting'] = false;
    
    
    // Set the Detail List
    // It would be cool if we didn't clear any of the details that have bombs on them...
    // ... so we need to do this a little bit more careful with how we do it
    let nonBombList = [];
    for (let i = 0; i < tempState['detailList'].length; i++) {
      if (tempState['detailList'][i]['counter'] === -1) {
        nonBombList.push(i);
      }
    }
    
    // Trying this becauset the animation isn't triggering for the new details when they appear after a refresh
    // So let's try setting the old ones as selected first, before replacing them
    for (let i = 0; i < nonBombList.length; i++) {
      tempState['detailList'][nonBombList[i]]['selected'] = true;
    }

    // And we may have to set the state to get this to register
    // setGameState(tempState);

    // For each non-bombed detail, generate a replacement and assign it in the tempState
    const replacementList = generateDetailList(nonBombList.length, tempState['level']);
    for (let i = 0; i < nonBombList.length; i++) {
      tempState['detailList'][nonBombList[i]] = replacementList[i];
    }

    // Clear the story
    tempState['storyDetails'] = [];

    return tempState;

  };

  
  // Function to generate a list for slot colors
  // Added the minus 2, so that we never put it in first or last slot
  const generateSlotColorList = (num = NUMFORSTORY - 2, difficulty = 1) => {

    // TODO add "why"
    const possibleColors = ["who", "when", "where",]

    // I think it's more interesting if it's typically the same # as the level...
    // Except it is still kind of random
    // This makes it so that it's always at least one
    difficulty = Math.max( getRandomInt(difficulty + 1), 1);

    let tempList = new Array(num).fill("any");
    let randList = [];

    while (randList.length < difficulty) {
      let candidateInt = getRandomInt(tempList.length);
      if (randList.indexOf(candidateInt) === -1) {
      randList.push(candidateInt);
      tempList[candidateInt] = possibleColors[getRandomInt(possibleColors.length)];
      }
    }

    // Adding logic to pad out the array so that first + last are always "any"
    tempList.unshift("any");
    tempList.push("any");
    return tempList;
  };


  // Function to handle a completed story that's wrong
  const handleIncorrectStory = (oldState) => {
    let tempState = {...oldState};

    

  };


  // Function to progress game logic after a turn is complete
  const handleCompletedStory = (oldState) => {
    let tempState = {...oldState};


    // TODO: Figure out how refreshes are earned now...
    /*
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
    */
    // Add one to the score and update the multiplier
    tempState['score'] = tempState['score'] + 1;
    tempState['multiplier'] = tempState['multiplier'] + 1;

    // Check if we've hit the scoreNeeded
    if (tempState['score'] === tempState['scoreNeeded']) {
      // End the level
      // TODO: encapsulate this into its own function
      // TODO: Add level logic
      tempState['level'] = tempState['level'] + 1;

      // Set the score back to 0 and generate a new max score
      tempState['score'] = 0;
      tempState['scoreNeeded'] = generateScoreNeeded();
    }
    
    // Don't carea bout this anymore
    /*
    // Reset Detail Type Counts
    tempState['detailTypeCount'] = {
      who: 0,
      where: 0,
      when: 0,
    };
    */

    // Reset valid + complete checks
    tempState['isValid'] = false;
    tempState['isComplete'] = false;
    tempState['isConnecting'] = false;
    
    // Change IO Connectors
    tempState['IO'] = tempState['nextIO'];
    tempState['nextIO'] = possibleConnectors[ getRandomInt(possibleConnectors.length) ];
    
    // TODO: Is this fun? Modify the slot color list\
    // Adding minus 2 because we never want it to be first or last slot
    tempState['slotColorList'] = generateSlotColorList(NUMFORSTORY - 2, tempState['level']);
    
    /*
    // TEMP RULE: Only refresh detailBoard if board is empty
    if (tempState['detailList'].length === 0) {
      */

      // Now we need to decrement any bomb timers, and check if there's an explosion!!!!
      for (let i = 0; i < tempState['detailList'].length; i++) {
        if (tempState['detailList'][i]['counter'] > -1) {
          tempState['detailList'][i]['counter'] = tempState['detailList'][i]['counter'] - 1;

          // Now we check if that's caused an explosion
          // Second part of the logic excludes any details that were used in the story from the check
          if ((tempState['detailList'][i]['counter'] === 0) && !(tempState['detailList'][i]['selected'])){
            // Trigger a game over....
            tempState['showPlayerMessage'] = true;
            setPlayerMessage("Boom! \nGame Over...");
            setGameState(tempState);
            return;
          }
        }
      }


      // Refresh missing details in list
      const refreshIndices = tempState['storyDetails'].map( (x) => {
        return x['boardIdx'];
      });
      
      for (let i = 0; i < refreshIndices.length; i++) {
        // tempState['detailList'][i] = generateDetailList(NUMDETAILS);
        tempState['detailList'][refreshIndices[i]] = generateDetailList(1, tempState['level'])[0];
      }

    // }
  
    // Clear the story
    tempState['storyDetails'] = [];
      
      return tempState;

  };


  // Function to move from one level to another
  const handleLevelComplete = (oldState) => {
    let tempState = {...oldState};
    // We need to clear the points and add that to the overall score (which currently doesn't exist)
    // Figure out what the new Point Max is for the new level
    // Refresh all the details
    // Update the detective Name
    // Increment the level #
    // Update the level-twist (e.g., No doubles, etc.)

    // Most of these should have some animation associated with it


  };


  // Function for displaying Dialogue so that it can happen with different times
  const displayDialogue = (txt) => {
    let tempStory = {...storyState};

    tempStory['dialogueText'] = txt;
    setStoryState(tempStory);
    setShowCompleteModal(true);

    setTimeout(() => {
      setShowCompleteModal(false);
    }, completeModalTime + 200);

    return;
  };


  /////////////////////////////// CLICK HANDLERS //////////////////////////////

  // Handle Click on Details on Board
  const handleBoardClick = (idx) => {
    // Adjust Selected Status of Detail
    // Push copy of Detail to Story list
    // Call game-state check

    let tempState = {...gameState};
    let tempStory = {...storyState};

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
    
    // I don't think we actually care about this anymore
    /*
    // Update detailTypeCount
    tempState['detailTypeCount'][ tempState['detailList'][idx]['type'] ] = tempState['detailTypeCount'][ tempState['detailList'][idx]['type'] ] + 1; // Not sure if I can -- this, so I'm doing it long-hand    
    */

    // Check to see if the connections all match
    [ tempState['isValid'], tempState['isConnecting'] ] = checkStoryConnections(tempState['storyDetails'], tempState['IO'], tempState['slotColorList']);

    // Changing how we define a "complete" story -- instead of one of each, we need just a length
    // Then Check if the story is complete
    /*
    if (tempState['detailTypeCount']['who'] > 0 
      && tempState['detailTypeCount']['where'] > 0 
      && tempState['detailTypeCount']['when'] > 0) {
    */
    if (tempState['storyDetails'].length === NUMFORSTORY) {
      
      tempState['isComplete'] = true;
    }
      
    // If the story is complete, we need to check if it's valid...
    if (tempState['isComplete']) {

      if (tempState['isValid']) {

        // Display congratulations text                 
        let txt = storyCompleteDialogue[getRandomInt(storyCompleteDialogue.length)];
        displayDialogue(txt);

        setGameState(tempState);
      } else {

        // If the story is NOT valid...
        // We need to 
        // 1. Display some bad animation & dialogue
        // 2. Clear the story
        // 3. Remove a point & set mult to 1x
        // 4. And potentially end the game
        
        // 1. Display the error animation & dialogue
        let txt = incorrectDialogues[getRandomInt(incorrectDialogues.length)];
        displayDialogue(txt);
        
        // Also set story complete false
        tempState['isComplete'] = false;

        setInvalidStory(true);
        
        setTimeout(() => {
          setInvalidStory(false);

          // 2. Clear the story
          // We'll use the handleStoryClick function on all the indices
          let loopnum = tempState['storyDetails'].length;
          for (let i = 0; i < loopnum; i++) {
            tempState = handleStoryClick(0, tempState);
          }
          
          // 3. Remove a point & set mult to 1x
          if (tempState['score'] > 0) {
  
            setPointLossIdx(gameState['score']); 
            tempState['score'] = tempState['score'] - 1;
            tempState['multiplier'] = 1;
          } else {
            // TODO THIS IS WHERE THE GAME WOULD END
            // THIs actually should be checked first, and the stuff before this should be moved after
            tempStory['dialogueText'] = gameLossDialogues[getRandomInt(gameLossDialogues.length)];
            setStoryState(tempStory);
            // TODO and end the game...
          }
          // Not sure if best to do this here or not -- worried about race conditions
          setGameState(tempState);
        }, invalidStory + 200);

      } 
    }
    
    // This is super janky, but seems to be working
    // Potential race condition....
    setTimeout(() => {
      if (tempState['isValid'] && tempState['isComplete']) {
        tempStory['dialogueText'] = storyCompleteDialogue[getRandomInt(storyCompleteDialogue.length)];
        setStoryState(tempStory);
        tempState = handleCompletedStory(tempState);
      }

      setGameState(tempState);
    }, (tempState['isValid'] && tempState['isComplete']) ? completeModalTime + 200 : 0);

    return;
  };
  

  // Handle Click on Story Details
  const handleStoryClick = (idx, oldState = null) => {
    // Adjust Selected Status of Detail
    // Remove copy of Detail from Story list
    // Call game-state check
    
    // If we're passed in a state to use, then use that, otherwise pull the current state
    let tempState = (oldState !== null) ? {...oldState} : {...gameState};
    
    tempState['detailList'][ tempState['storyDetails'][idx]['boardIdx'] ]['selected'] = false;
    
    let removedDetail = tempState['storyDetails'].splice(idx, 1)[0];

    // Now here's where we do all the game checks and update logic, etc.
    // Update detailTypeCount
    tempState['detailTypeCount'][removedDetail['type']] = tempState['detailTypeCount'][removedDetail['type']] - 1; // Not sure if I can -- this, so I'm doing it long-hand

    // If there's still details in the story, Check to see if the connections all match
    if (tempState['storyDetails'].length > 0 ) {
      [ tempState['isValid'], tempState['isConnecting'] ] = checkStoryConnections(tempState['storyDetails'], tempState['IO'], tempState['slotColorList']);
    } else {
      [tempState['isValid'], tempState['isConnecting'] ] = [false, false];
    }

    // THis is hacky -- it's because sometimes we'd rather have it pass the tempstate back out instead of settting it within the helper
    if (oldState === null) {
      setGameState(tempState);
    }
    return tempState;
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
        // And reset the multiplier
        tempState['multiplier'] = 1;

      }
    } else {
      tempState['numRefreshes'] = tempState['numRefreshes'] - 1;
      // And reset the multiplier
      tempState['multiplier'] = 1;
    }

    // This is really hacky
    // Setting all details as selected so that they disappear, so that the refresh animation plays appropriately
    // ...Actually, first we need to get the list of non-Bomb details
    // ...Because since we're not refreshing the Bombs, they can't get set to Selected
    // ...Otherwise they dont' come back...
    let nonBombList = [];
    for (let i = 0; i < tempState['detailList'].length; i++) {
      if (tempState['detailList'][i]['counter'] === -1) {
        nonBombList.push(i);
      }
    }

    for (let i = 0; i < nonBombList.length; i++) {
      tempState['detailList'][nonBombList[i]]['selected'] = true;
    }
    setGameState(tempState);

    // Refresh detail and story and decrement number of refreshes
    // This timeout is part of the hacky nonsense above
    setTimeout(() => {
      tempState = refreshDetails(tempState);
      setGameState(tempState);
    }, 100)

    return;
  }


  // Function to check if all the connectors are valid
  const checkStoryConnections = (storyDetails, IO, slotColorList) => {
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


    // This is where we also check whether any of the color slots are correct
    let tempValid = true;
    for (let i = 0; i < storyDetails.length; i++) {
      // Check if the color is wrong
      if (slotColorList[i] !== storyDetails[i]['type']
        && slotColorList[i] !== "any"
      ) {
        tempValid = false;
      } 
    }

    // If tempValid is false, then the other two need to be made false
    if (!tempValid) {
      isValid = false;
      isConnecting = false;
    }

    return [isValid, isConnecting];
  }

  /////////////////////////////// STORY THINGS //////////////////////////////
  const incorrectDialogues = [
    ["That's not what you said earlier...", "You're lying!"],
    ["I'm losing my patience.", "You better straigthen up!"],
  ];

  const storyCompleteDialogue = [
    ["Story checks out", "But I've got another question..."],
    ["That makes sense.", "But what about..."],
  ];

  const levelCompleteDialogue = [
    ["Alright", "You're free to go"],
    ["That's enough", "You're in the clear"],
    ["We're done here.", "Thanks for your cooperation."],
  ];

  const gameLossDialogues = [
    ["AHA!", "You're caught red-handed"],
    ["Got you!", "You're under arrest!"],
    ["No more lies", "It's a cell for you"],
  ];

  const detectiveNames = [
    "Marimoto", "Frederico", "Navokov", "Frezia", "Mazuki",
  ]

  /////////////////////////////// STATE INITIALIZERS //////////////////////////////
  const initialState = {
    detailList: generateDetailList(NUMDETAILS, 1),
    storyDetails: [],
    detailTypeCount: {
      who: 0,
      where: 0,
      when: 0,
      why: 0,
    },
    isValid: false,
    isConnecting: false,
    isComplete: false,
    IO: possibleConnectors[ getRandomInt(possibleConnectors.length) ],
    nextIO: possibleConnectors[ getRandomInt(possibleConnectors.length) ],
    numRefreshes: 0,
    score: 0,
    scoreNeeded: 3,
    multiplier: 1,
    level: 1,
    slotColorList: generateSlotColorList(),
    showPlayerMessage: false,
  };
  
  const [gameState, setGameState] = useState(initialState);

  const initialStory = {
    dialogueText: storyCompleteDialogue[getRandomInt(storyCompleteDialogue.length)],
    detectiveName: detectiveNames[getRandomInt(detectiveNames.length)],
  }

  const [storyState, setStoryState] = useState(initialStory);

  const [showRefreshEarned, setShowRefreshEarned] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [pointLossIdx, setPointLossIdx] = useState(0);
  const [invalidStory, setInvalidStory] = useState(false);

  const [playerMessage, setPlayerMessage] = useState("GAME OVER");

  return (
    <StyledAppDiv>

      {gameState['showPlayerMessage'] && 
        <PlayerMessageContainer
          msg={playerMessage}
        />
      }

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
        nextIO = {gameState['nextIO']}
        multiplier={gameState['multiplier']}
        detectiveName={storyState['detectiveName']}
        dialogueText={storyState['dialogueText']}
        storyLengthRequirement={NUMFORSTORY}
        slotColorList={gameState['slotColorList']}
      />

    </StyledAppDiv>
  );
}

export default App;
