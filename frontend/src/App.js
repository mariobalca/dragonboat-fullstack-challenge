import React from "react";

import styled from "styled-components";
import { StylesProvider, withTheme } from "@material-ui/core/styles";

import ProjectsList from "./app/features/ProjectsList";

const App = (props) => {
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <Content>
          <ProjectsList />
        </Content>
      </Wrapper>
    </StylesProvider>
  );
};

const Wrapper = styled.div`
  &&&& {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
  }
`;

const Content = withTheme(styled.div`
  min-width: 1024px;
  max-width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.grey};
`);

export default withTheme(App);
