import { Field } from "formik";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

const Input = styled(Field)`
  ${tw`block w-full rounded px-2 py-1`};
`;

export default Input;