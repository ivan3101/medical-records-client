import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface ISidebarProps {
  className?: string;
}

const SidebarContainer = styled.nav`
  ${tw`bg-secondary p-6 flex flex-col`};

  width: 100%;
  min-height: calc(100vh - 6rem);
`;

const Footer = styled.div`
  margin-top: auto;
  color: white;
  font-size: 0.7rem;
  text-align: center;
`;

const UnstyledSidebar: FunctionComponent<ISidebarProps> = ({
  children,
  className
}) => {
  return (
    <SidebarContainer>
      <ul className={className}>{children}</ul>
      <Footer>
        <p>Escuela de Odontología</p>
        <p>Escuela de Ingeniería</p>
        <p>Universidad José Antonio Páez</p>
        <p>&copy; 2019 Copyright</p>
        <p>Ivan De Menezes</p>
        <p>Jean Mobayed</p>
      </Footer>
    </SidebarContainer>
  );
};

const Sidebar = styled(UnstyledSidebar)`
  ${tw`list-reset`};
`;

export default Sidebar;
