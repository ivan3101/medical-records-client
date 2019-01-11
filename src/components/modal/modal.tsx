import React, { FunctionComponent, MouseEventHandler } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import CloseButton from "./closeButton/closeButton";
import ModalContent from "./modalContent/modalContent";

export interface IModalContainerProps {
  show: boolean;
}

export interface IModalProps extends IModalContainerProps {
  closeCb: MouseEventHandler<HTMLDivElement>;
}

const ModalContainer = styled.div<IModalContainerProps>`
  ${tw`fixed pin-t pin-l w-full h-full opacity-0 invisible z-40`};

  background-color: rgba(0, 0, 0, 0.5);
  transform: ${props => (props.show ? "scale(1)" : "scale(1.1)")};
  transition: ${props =>
    props.show
      ? "visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s"
      : "visibility 0s" + " linear 0.25s, opacity 0.25s 0s, transform 0.25s"};

  ${props => (props.show ? tw`opacity-100 visible` : tw`opacity-0 invisible`)};
`;

const Modal: FunctionComponent<IModalProps> = ({ show, closeCb, children }) => {
  return (
    <ModalContainer onClick={closeCb} show={show}>
      <ModalContent>
        <CloseButton onClick={closeCb}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
