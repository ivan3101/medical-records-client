import React, { FunctionComponent } from "react";
import { RouterLinkProps } from "../../link/routerLink/routerLink";
import SidebarLink, { sidebarActiveClass } from "./sidebarLink/sidebarLink";

const SidebarItem: FunctionComponent<RouterLinkProps> = ({
  children,
  to,
  className
}) => {
  return (
    <li className={className}>
      <SidebarLink to={to} activeClassName={sidebarActiveClass}>
        {children}
      </SidebarLink>
    </li>
  );
};

export default SidebarItem;
