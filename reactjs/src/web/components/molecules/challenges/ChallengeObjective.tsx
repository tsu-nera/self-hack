import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid } from '@material-ui/core';

import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWhyCard
} from './ChallengeObjectiveCard';
import Progress from '../../atoms/CircularProgress';

const ChallengeObjectiveDescription = (props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;

  return (
    <ul>
      <li>{challenge.title}を通じて達成したいことを書きます。</li>
      <li>
        定量的(計測可能、数値)目標、自分でコントロール可能な目標を記入してください。
      </li>
      <li>
        ここに書いたことは
        <Link to={`/c/${challengeId}/goals`}>ゴールボード</Link>
        でみんなと共有されます。
      </li>
      <li>なにをやるのかの入力欄に一言で目標を書いてください。(60字以内)</li>
      <li>なぜやるのかの入力欄に目標に取り組む理由を詳しく書いてください。</li>
    </ul>
  );
};

const ChallengeObjective = (props: any) => {
  const {
    challenge,
    user,
    isMyProfile,
    handleSave,
    objective,
    isLoaded
  } = props;

  const initialWhat = `${challenge.title}に毎日取り組みます！`;

  const [what, setWhat] = useState(initialWhat);
  const [why, setWhy] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setWhat(objective ? objective.what : initialWhat);
      setWhy(objective ? objective.why : '');
    } else {
      setWhat(initialWhat);
      setWhy('');
    }
  }, [initialWhat, isLoaded, objective]);

  const onWhatChange = (e: any) => {
    e.preventDefault();
    setWhat(e.target.value);
  };

  const onWhyChange = (e: any) => {
    e.preventDefault();
    setWhy(e.target.value);
  };

  const ChallengeObjectiveFormButton = (props: any) => {
    const text = edit ? '保存' : '編集';

    if (!isMyProfile) {
      return null;
    }

    const onCancel = () => setEdit(false);

    const onSave = edit
      ? () =>
          handleSave({ what, why, isCreate: !objective }).then(() =>
            setEdit(!edit)
          )
      : () => setEdit(!edit);

    return (
      <React.Fragment>
        {edit && (
          <Button
            variant="contained"
            onClick={onCancel}
            style={{ marginRight: 5 }}
          >
            キャンセル
          </Button>
        )}
        <Button
          variant="contained"
          style={{ fontWeight: 'bold' }}
          onClick={onSave}
        >
          {text}
        </Button>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {!isLoaded && <Progress />}
      {isLoaded && (
        <React.Fragment>
          <div style={{ textAlign: 'right' }}>
            <ChallengeObjectiveFormButton />
          </div>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              {edit ? (
                <React.Fragment>
                  <TextField
                    value={what}
                    variant="outlined"
                    margin="normal"
                    required
                    id="what"
                    label="なにをやるのか(What)"
                    fullWidth
                    onChange={onWhatChange}
                  />
                  <TextField
                    value={why}
                    variant="outlined"
                    margin="normal"
                    id="why"
                    label="なぜやるのか(Why)"
                    fullWidth
                    multiline
                    rows={8}
                    onChange={onWhyChange}
                  />
                  <ChallengeObjectiveDescription challenge={challenge} />
                </React.Fragment>
              ) : (
                <div>
                  <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <ChallengeObjectiveWhatCard text={what} />
                    {!!why && (
                      <ChallengeObjectiveWhyCard text={why} user={user} />
                    )}
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeObjective;