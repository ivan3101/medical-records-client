import React, { FunctionComponent } from "react";
import ReactPagination, { ReactJsPaginationProps } from "react-js-pagination";
import styled from "styled-components/macro";
import tw from "tailwind.macro";

export interface IPagination extends ReactJsPaginationProps {
  className?: string;
}

const UnstyledPagination: FunctionComponent<IPagination> = ({
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <ReactPagination {...props} />
    </div>
  );
};

const Pagination = styled(UnstyledPagination)`
  ${tw`text-center`};

  ul {
    ${tw`inline-block pl-0 my-6 rounded-sm list-reset`}

    li {
      ${tw`inline`};

      a {
        ${tw`relative float-left py-2 px-3 leading-normal no-underline text-blue border border-solid border-grey-light ml-px`};
      }
    }

    li.disabled {
      a {
        ${tw`cursor-not-allowed text-grey-dark bg-white border border-solid border-grey-light`};
      }
    }

    li.active {
      a {
        ${tw`z-10 text-white bg-blue border-blue cursor-default`};
      }
    }
  }
`;

export default Pagination;
