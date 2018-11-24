import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 25px;
  background-color: ${props => props.theme.aux};
`;

export default Container;
