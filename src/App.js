import './App.css';
import styled from 'styled-components';
// import Background from './components/background.js';
// import DetailList from './components/detail_list.js';
import Story from './components/story.js'

const StyledAppDiv = styled.div`
  display: flex;
  height: 600px;

  justify-content: center;
  align-items: center;

  border: 1px solid red;
`;


function App() {
  return (
    <StyledAppDiv>
      <Story
        detailList = {[{
          type: 'who',
          connectors: [1, 1],
        }]}
      />
    </StyledAppDiv>
  );
}

export default App;
