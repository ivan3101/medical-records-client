import styled from "styled-components/macro";
import tw from "tailwind.macro";
import RouterLink from "../../../link/routerLink/routerLink";

const SidebarLink = styled(RouterLink)`
  ${tw`p-4 text-white no-underline font-normal mb-4 h-auto w-full rounded mt-0 inline-flex items-center hover:bg-primary hover:text-white`};
`;

export default SidebarLink;
