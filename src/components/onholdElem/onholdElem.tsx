import React, { Component } from "react";
import OnholdBar from "./onholdBar/onholdBar";
import OnholdContent from "./onholdContent/onholdContent";
import styled from "styled-components";

export interface IOnholdElemProps {
  title: string;
}

export interface IOnholdElemState {
  contentVisible: boolean;
}

const OnholdElemContainer = styled.div`
  margin-bottom: 3rem;
`;

class OnholdElem extends Component<IOnholdElemProps, IOnholdElemState> {
  state: IOnholdElemState = {
    contentVisible: false
  };

  onClick = (): void => {
    this.setState(prevState => ({
      contentVisible: !prevState.contentVisible
    }));
  };

  render() {
    const { children, title } = this.props;
    const { contentVisible } = this.state;

    return (
      <OnholdElemContainer>
        <OnholdBar onClick={this.onClick}>{title}</OnholdBar>
        <OnholdContent contentVisible={contentVisible}>
          {children}
        </OnholdContent>
      </OnholdElemContainer>
    );
  }
}

export default OnholdElem;
