import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 25px;
  background-color: ${props => props.theme.aux};
`;

export default Container;
