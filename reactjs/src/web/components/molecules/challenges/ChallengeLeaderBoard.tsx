import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Progress from '../../atoms/CircularProgress';

import UserAvatar from '../../atoms/UserAvatar';

import { leaderboardMyColor, brandWhite } from '~/lib/theme';

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const ChallengeLeaderBoard = (props: any) => {
  const { users, loading, error, resourceId, fetchUsers, myId } = props;

  useEffect(() => {
    fetchUsers(resourceId);
  }, [fetchUsers, resourceId]);

  const LeaderBoardHead = () => (
    <TableHead>
      <TableRow>
        <TableCell>順位</TableCell>
        <TableCell />
        <TableCell>ユーザ</TableCell>
        <TableCell>スコア</TableCell>
        <ConditionalTableCell>大会連続</ConditionalTableCell>
        <ConditionalTableCell>最長</ConditionalTableCell>
        <ConditionalTableCell>過去連続</ConditionalTableCell>
        <ConditionalTableCell>投稿数</ConditionalTableCell>
        <ConditionalTableCell>最新</ConditionalTableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {users && (
        <Table size="small">
          <LeaderBoardHead />
          <TableBody>
            {users.map((user: any) => {
              const StyledTableRow = styled(TableRow)`
                && {
                  background-color: ${user.shortId === myId
                    ? leaderboardMyColor
                    : brandWhite};
                }
              `;

              return (
                <StyledTableRow
                  key={user.id}
                  style={{
                    backgroundColor:
                      user.id === myId ? leaderboardMyColor : brandWhite
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.rank}位
                  </TableCell>
                  <TableCell>
                    <UserAvatar photoURL={user.photoURL} userId={user.id} />
                  </TableCell>
                  <TableCell>
                    <Link style={{ color: 'inherit' }} to={user.profilePath}>
                      {user.displayName}
                    </Link>
                  </TableCell>
                  <TableCell>{user.score}</TableCell>
                  <ConditionalTableCell>{user.days}</ConditionalTableCell>
                  <ConditionalTableCell>{user.maxDays}</ConditionalTableCell>
                  <ConditionalTableCell>
                    {user.pastDays || user.days}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {user.histories ? user.histories.length : 0}
                  </ConditionalTableCell>
                  <ConditionalTableCell>{user.latest}</ConditionalTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
