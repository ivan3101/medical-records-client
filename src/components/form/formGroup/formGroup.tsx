import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IFormGroup {
  inline?: boolean;
}

const FormGroup = styled.div<IFormGroup>`
  ${tw`w-full mb-5`};
  
  ${props => props.inline ? tw`flex-row` : tw`flex-col`};
`;

export default FormGroup;