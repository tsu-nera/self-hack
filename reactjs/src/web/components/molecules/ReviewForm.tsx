import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  RadioGroup,
  Grid,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import moment from '~/lib/moment';
import {
  REVIEW_TYPE_DAILY,
  REVIEW_TYPE_WEEKLY,
  REVIEW_TYPE_MONTHLY
} from '~/constants/review';

const ReviewForm = (props: any) => {
  const {
    redirectPath,
    history,
    saveHandler,
    loading,
    userReview,
    isCreate
  } = props;

  const [text, setText] = useState('');
  const [type, setType] = useState(REVIEW_TYPE_DAILY);

  const [startedAt, setStartedAt] = useState(moment().format('YYYY-MM-DD'));
  const [endedAt, setEndedAt] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    if (!isCreate && !loading) {
      setText(userReview.text);
      setType(userReview.type);
      setStartedAt(moment(userReview.startedAt.toDate()).format('YYYY-MM-DD'));
      setEndedAt(moment(userReview.endedAt.toDate()).format('YYYY-MM-DD'));
    }
  }, [isCreate, loading, userReview]);

  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onTypeChange = (e: any) => {
    e.preventDefault();
    setType(e.target.value);
  };

  const onStartedAtChange = (e: any) => {
    e.preventDefault();
    const date = e.target.value;
    setStartedAt(date);
  };
  const onEndedAtChange = (e: any) => {
    e.preventDefault();
    const date = e.target.value;
    setEndedAt(date);
  };

  const onSave = () => {
    if (text.length === 0) {
      window.alert('投稿内容がありません。'); // eslint-disable-line
      return;
    }

    const title = `${type}: ${startedAt} ${
      type !== REVIEW_TYPE_DAILY ? `- ${endedAt}` : ''
    }`;

    saveHandler(title, text, type, new Date(startedAt), new Date(endedAt))
      .then(() => window.alert('投稿しました。')) // eslint-disable-line
      .then(() => history.push(redirectPath));
  };

  return (
    <React.Fragment>
      <Grid container direction="row">
        <Grid item xs>
          <TextField
            id="startedAt"
            label="開始日"
            type="date"
            value={startedAt}
            onChange={onStartedAtChange}
          />
          {type !== REVIEW_TYPE_DAILY && (
            <TextField
              id="endedAt"
              label="終了日"
              type="date"
              value={endedAt}
              onChange={onEndedAtChange}
            />
          )}
        </Grid>
        <Grid item xs>
          <RadioGroup name="タイプ" value={type} onChange={onTypeChange} row>
            <FormControlLabel
              value={REVIEW_TYPE_DAILY}
              control={<Radio color="primary" />}
              label={REVIEW_TYPE_DAILY}
            />
            <FormControlLabel
              value={REVIEW_TYPE_WEEKLY}
              control={<Radio color="primary" />}
              label={REVIEW_TYPE_WEEKLY}
            />
            <FormControlLabel
              value={REVIEW_TYPE_MONTHLY}
              control={<Radio color="primary" />}
              label={REVIEW_TYPE_MONTHLY}
            />
          </RadioGroup>
        </Grid>
      </Grid>
      <TextField
        value={text}
        variant="outlined"
        margin="normal"
        fullWidth
        id="text"
        name="text"
        label="内容"
        rows={12}
        multiline
        onChange={onTextChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ fontWeight: 'bold' }}
        onClick={onSave}
      >
        投稿
      </Button>
    </React.Fragment>
  );
};

export default withRouter(ReviewForm);
