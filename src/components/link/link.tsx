import React, { ComponentClass, FunctionComponent } from "react";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface ILink {
  className?: string;
  as: ComponentClass<any> | "a";
}

const UnstyledLink: FunctionComponent<ILink> = props => {
  const { as: Component, children, className, ...rest } = props;
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

const Link = styled(UnstyledLink)`
  ${tw`inline-block cursor-pointer text-blue font-medium hover:text-blue-darker mt-3`};
`;

export default Link;
