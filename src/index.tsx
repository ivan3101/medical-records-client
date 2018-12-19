import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import tw from "tailwind.macro";
import * as serviceWorker from "./serviceWorker";

const Button = styled.button`
  ${tw`font-mono text-sm text-red hover:text-blue`};
  background-color: #ffffff;
  padding: 25px;
`;

ReactDOM.render(
    <div>
        <Button>Hello world</Button>
    </div>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
