import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container, { ContainerProps } from '@material-ui/core/Container';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import theme from '~/lib/theme';
import Header from '../molecules/Header';
import Footer from '../molecules/Footer';

import ReloadModal from '../atoms/ReloadModal';

const LayoutWrapperContainer = styled(Container)`
  && {
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
  }
` as React.ComponentType<ContainerProps>;

const DefaultLayout = (props: any) => (
  <React.Fragment>
    <CssBaseline />
    <ReloadModal />
    <MuiThemeProvider theme={theme}>
      <LayoutWrapperContainer>
        <Header />
        <main>{props.children}</main>
      </LayoutWrapperContainer>
      <Footer />
    </MuiThemeProvider>
  </React.Fragment>
);

export default DefaultLayout;
