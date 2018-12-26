import { Field, FieldProps } from "formik";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IInput extends FieldProps {
  isinvalid: number;
}

const Input = styled(Field).attrs({
  type: 'text'
})<IInput>`
  ${tw`block w-full rounded px-2 py-1 bg-white border-2 text-black`};
  
  :focus {
    box-shadow: 0 0 6px 0 ${props => props.isinvalid ? '#cc1f1a' : '#3490dc'};
  }
  
  ${props => props.isinvalid ? tw`border-red-dark focus:border-red-dark` : tw`border-grey-dark focus:border-blue`};
`;

export default Input;