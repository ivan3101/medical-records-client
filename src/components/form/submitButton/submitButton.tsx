import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface ISubmitButton {
  disabled?: boolean;
}

const SubmitButton = styled.button.attrs({
  type: 'submit'
})<ISubmitButton>`
  ${tw`px-4 py-2 font-bold rounded w-full`};
  
  ${props => props.disabled ?
    tw`bg-grey-darker text-white cursor-not-allowed`
    :
    tw`bg-primary text-white hover:bg-blue-darker`
  }
`;

export default SubmitButton;