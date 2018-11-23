import styled from "styled-components";

const Sidebar = styled.div`
      width: 100%;
      min-height: 100vh;
      overflow: hidden;
      background-color: ${props => props.theme.secondary};
      padding: 25px;
    `;

export default Sidebar;
