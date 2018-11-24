import styled from "styled-components";
import {lighten} from "polished";

const SubmitError = styled.div`
  background-color: ${props => lighten(0.55, props.theme.warning)};
  color: ${props => props.theme.warning};
  border: 1px solid ${props => props.theme.warning};
  padding: 0.50rem 0.80rem;
  border-radius: 8px;
  height: auto;
  width: 100%;
  margin-bottom: 7px;
`;

export default SubmitError;