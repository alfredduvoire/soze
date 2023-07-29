import styled from 'styled-components';

const StyledSidebar = styled.div`
    height: 100%;
    width: 20%;

    display: flex;
    flex-direction: column;

    padding: 1em;
    margin: 0px;

    justify-content: space-between;
    align-items: center;

    border: 1px solid green;
`;

const Sidebar = (props) => {
    
    return (
        <StyledSidebar >
            <div>Refresh Counter</div>
            <div>Score Tracker</div>
        </StyledSidebar>
    );
}


export default Sidebar;