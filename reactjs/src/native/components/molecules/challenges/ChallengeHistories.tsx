import * as React from 'react';
import { Badge, Text } from 'native-base';
import { formatDatetime } from '~/lib/moment';

import { wrapShowS, wrapShowN } from '~/lib/general';

const { Table, Row } = require('react-native-table-component');

const getType = (type: string) => {
  if (type === 'RESET') {
    return (
      <Badge primary>
        <Text>RESET</Text>
      </Badge>
    );
  }
  return (
    <Badge info>
      <Text>RECORD</Text>
    </Badge>
  );
};

const tableHead = ['日時', '点数', '連続', '累積', '過去', '経過', 'タイプ'];
const HistoryHead = () => (
  <Row
    flexArr={[3, 1, 1, 1, 1, 1, 2]}
    data={tableHead}
    style={{ backgroundColor: '#f1f8ff' }}
  />
);

const ChallengeHistories = (props: any) => {
  const { histories } = props;

  return (
    <Table>
      <HistoryHead />
      {histories
        .sort((x: any, y: any) => y.timestamp.seconds - x.timestamp.seconds)
        .map((history: any) => {
          const rowData = [
            wrapShowS(formatDatetime(history.timestamp.toDate())),
            wrapShowN(history.score),
            wrapShowN(history.days),
            wrapShowN(history.accDays),
            wrapShowN(history.pastDays),
            wrapShowN(history.diff),
            getType(history.type)
          ];
          return (
            <Row
              data={rowData}
              key={history.id}
              flexArr={[3, 1, 1, 1, 1, 1, 2]}
            />
          );
        })}
    </Table>
  );
};

export default ChallengeHistories;