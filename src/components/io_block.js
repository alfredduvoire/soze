import styled from 'styled-components'

const StyledIOBlock = styled.div`
color: red;
margin: 0.5em;
height: 7em;
Width: 5%;

text-align: center;

border: 3px solid gold;
border-radius: 6px;

`;

const IO = (props) => {

    return (
        <StyledIOBlock>
            <h3>{props.num}</h3>
        </StyledIOBlock>
    );
}


export default IO;