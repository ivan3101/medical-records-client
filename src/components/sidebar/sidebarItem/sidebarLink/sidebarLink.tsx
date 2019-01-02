import styled from "styled-components/macro";
import tw from "tailwind.macro";
import RouterLink from "../../../link/routerLink/routerLink";

export const sidebarActiveClass = "active";

export interface ISidebarLink {
  activeClassName: "active";
}

const SidebarLink = styled(RouterLink).attrs({
  activeClassName: sidebarActiveClass
})<ISidebarLink>`
  ${tw`p-4 text-white no-underline font-normal mb-4 h-auto w-full rounded mt-0 inline-flex items-center hover:bg-primary hover:text-white`};

  &.${sidebarActiveClass} {
    ${tw`bg-primary font-bold`};
  }
`;

export default SidebarLink;
