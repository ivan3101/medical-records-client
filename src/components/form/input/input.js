import styled from "styled-components";
import { lighten } from 'polished';
import { Field } from 'formik';

const Input = styled(Field)`
  display: block;
  width: 100%;
  height: auto;
  padding: 0.25rem 0.50rem;
  border-radius: 6px;
  border: 2px solid ${props => props.invalid ? props.theme.warning : props.theme.aux};
  background-color: ${props => props.theme.main};
  color: ${props => lighten(0.1, props.theme.text)};
  
  :focus {
    border: 2px solid ${props => props.invalid ? props.theme.warning : props.theme.primary};
  }
  
  ::placeholder {
    color: ${props => lighten(0.3, props.theme.text)};
  }
`;



export default Input;