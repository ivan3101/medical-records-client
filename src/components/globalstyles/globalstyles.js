import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
 //@import url('https://fonts.googleapis.com/css?family=Quicksand');
  
 html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
} 
`;

export default GlobalStyles;