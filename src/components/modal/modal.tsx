import React, { FunctionComponent, MouseEventHandler } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";
import CloseButton from "./closeButton/closeButton";
import ModalContent from "./modalContent/modalContent";
import Overlay from "./overlay/overlay";

export interface IModalProps {
  className?: string;
  closeCb: MouseEventHandler<HTMLDivElement>;
  show?: boolean;
}

const UnstyledModal: FunctionComponent<IModalProps> = ({
  className,
  children,
  closeCb
}) => {
  return (
    <div className={className}>
      <Overlay onClick={closeCb} />
      <ModalContent>
        {children}

        <CloseButton onClick={closeCb} />
      </ModalContent>
    </div>
  );
};

const Modal = styled(UnstyledModal)`
  ${tw`fixed pin-t pin-l w-full h-full z-30`};

  display: ${props => (props.show ? "block" : "none")};
`;

export default Modal;
