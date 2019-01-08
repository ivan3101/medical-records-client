import styled from "styled-components";
import tw from "tailwind.macro";

const FieldSet = styled.fieldset`
  ${tw`border border-grey-light border-solid rounded mb-3 p-3`};

  :first-of-type {
    ${tw`mt-3`};
  }
`;

export default FieldSet;
