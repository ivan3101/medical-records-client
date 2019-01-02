import React, { FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface ISidebarProps {
  className?: string;
}

const SidebarContainer = styled.nav`
  ${tw`bg-secondary fixed p-6`};

  width: 200px;
  min-height: calc(100vh - 6rem);
`;

const UnstyledSidebar: FunctionComponent<ISidebarProps> = ({
  children,
  className
}) => {
  return (
    <SidebarContainer>
      <ul className={className}>{children}</ul>
    </SidebarContainer>
  );
};

const Sidebar = styled(UnstyledSidebar)`
  ${tw`list-reset`};
`;

export default Sidebar;
