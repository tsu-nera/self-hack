import * as React from 'react';
import MediaQuery from 'react-responsive';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from '~/lib/theme';
import ChallengeButton from '~/web/containers/challenges/ChallengeButtonContainer';
import ChallengeCategoryButton from '~/web/containers/challenges/ChallengeCategoryButtonContainer';

import { challengePeriod, isChallengeClosed } from '~/lib/challenge';
import { getRandomImageURL } from '~/lib/url';

const HeaderInfo = styled.div`
  display: flex;
  margin: 5px;
`;

const MainFeaturedPost = styled(Paper)`
  && {
    position: relative;
    background-color: ${theme.palette.grey[800]};
    color: ${theme.palette.common.white};
    margin-bottom: ${theme.spacing(4)}px;
    background-image: url(${getRandomImageURL()});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
` as React.ComponentType<PaperProps>;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const MainFeaturedPostContent = styled.div`
  position: relative;
  padding: ${theme.spacing(2)}px;
  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(4)}px;
    padding-right: 0;
  }
`;

const HeaderInfoText = styled(Typography)`
  padding-left: 10px;
` as React.ComponentType<TypographyProps>;

const ChallengeHeader = (props: any) => {
  const { challenge, join } = props;

  return (
    <MainFeaturedPost>
      <img
        style={{ display: 'none' }}
        src={getRandomImageURL()}
        alt="background"
      />
      <Overlay />
      <Grid container>
        <Grid item md={9}>
          <MainFeaturedPostContent>
            <HeaderInfo>
              <MediaQuery maxDeviceWidth={750}>
                <h1 style={{ overflowWrap: 'break-word' }}>
                  {challenge.title}
                </h1>
              </MediaQuery>
              <MediaQuery minDeviceWidth={749}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {challenge.title}
                </Typography>
              </MediaQuery>
            </HeaderInfo>
            <HeaderInfo>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                style={{ fontStyle: 'italic' }}
              >
                {challenge.description}
              </Typography>
            </HeaderInfo>
            <HeaderInfo>
              {isChallengeClosed(challenge.closedAt.toDate()) ? (
                <HeaderInfoText color="inherit" variant="subtitle1">
                  {challenge.participantsCount}人参加
                </HeaderInfoText>
              ) : (
                <React.Fragment>
                  {/* <HeaderInfoText color="inherit" variant="subtitle1">
                    価格 {challenge.price || 0}円
                  </HeaderInfoText> */}
                  <HeaderInfoText color="inherit" variant="subtitle1">
                    {challenge.participantsCount}人参加中
                  </HeaderInfoText>
                </React.Fragment>
              )}
              <HeaderInfoText color="inherit" variant="subtitle1">
                {challengePeriod(challenge)}
              </HeaderInfoText>
            </HeaderInfo>
            <HeaderInfo>
              {challenge.categoryRef && (
                <ChallengeCategoryButton categoryRef={challenge.categoryRef} />
              )}
              {!isChallengeClosed(challenge.closedAt.toDate()) ? (
                <ChallengeButton challenge={challenge} join={join} />
              ) : null}
            </HeaderInfo>
          </MainFeaturedPostContent>
        </Grid>
      </Grid>
    </MainFeaturedPost>
  );
};

export default ChallengeHeader;
