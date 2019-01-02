import React, { FunctionComponent } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import Link from "../link";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type RouterLinkProps = Omit<NavLinkProps, "href">;

const RouterLink: FunctionComponent<RouterLinkProps> = props => {
  return <Link as={NavLink} {...props} />;
};

export default RouterLink;
