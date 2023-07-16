import styled from 'styled-components'

const StyledIOBlock = styled.div`
color: red
margin: 0.5em;
height: 7em;
width: 4em;

border: 3px solid gold;
border-radius: 3px;

`;

const IO = (props) => {

    return (
        <StyledIOBlock>
            {props.num}
        </StyledIOBlock>
    );
}


export default IO;