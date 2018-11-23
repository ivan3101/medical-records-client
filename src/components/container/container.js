import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  height: 100vh;
  padding: 25px;
  background-color: ${props => props.theme.aux};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default Container;
