import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export const primaryColor = '#f44336';
export const secondaryColor = '#2196f3';
export const carouselBlack = '#1a1917';
export const carouselGray = '#888888';

export const leaderboardMyColor = '#FFE4E1';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  },
  typography: {
    fontFamily: 'M Plus 1p'
  }
});

export default theme;
