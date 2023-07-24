import styled from 'styled-components'

const StyledDetailGap = styled.div`
color: #555555;
background-color: #CCCCCC;
margin: 0.5em;
height: 7em;
width: 5.5em;

text-align: center;

border: 3px solid #555555;
border-radius: 6px;
`;



const DetailGap = (props) => {

    return (
        <StyledDetailGap>
            <h1>+</h1>
        </StyledDetailGap>
    );
}


export default DetailGap;