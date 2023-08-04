import styled from 'styled-components'

const StyledDetailGap = styled.div`
color: #999999;
background-color: #DDDDDD;
margin: 0 20px;
height: 80%;
aspect-ratio: 9 / 16;
box-sizing: border-box;

display: flex;
justify-content: center;
align-items: center;

font-size: 64px;
font-weight: bold;
padding-bottom: 1%;

border: 3px solid #EEEEEE;
border-radius: 6px;
box-shadow: 3px 3px 3px #999999;
`;



const DetailGap = (props) => {

    return (
        <StyledDetailGap>
            +
        </StyledDetailGap>
    );
}


export default DetailGap;