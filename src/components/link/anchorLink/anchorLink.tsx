import React, { AnchorHTMLAttributes, FunctionComponent } from "react";
import Link from "../link";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const AnchorLink: FunctionComponent<AnchorProps> = props => {
  return <Link as={"a"} target={"__blank"} {...props} />;
};

export default AnchorLink;
