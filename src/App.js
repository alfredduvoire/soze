import './App.css';
import styled from 'styled-components';
// import Background from './components/background.js';
// import DetailList from './components/detail_list.js';
import Story from './components/story.js'
import DetailBoard from './components/detail_board.js';

const StyledAppDiv = styled.div`
  display: flex;
  height: 600px;

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
    return Array(num).map((x, i) => {
      return {
        type: possibleTypes[ getRandomInt(possibleTypes.length - 1) ],
        connectors: possibleConnectors[ getRandomInt(possibleConnectors.length - 1) ],
      };
    });
  };

  return (
    <StyledAppDiv>
      <DetailBoard
        detailList = {generateDetailList(NUMDETAILS)}
      />
      <Story 
        storyDetails = {[]}
      />
    </StyledAppDiv>
  );
}

export default App;
