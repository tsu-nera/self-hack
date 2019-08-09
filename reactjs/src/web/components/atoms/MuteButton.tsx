import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withRouter } from 'react-router-dom';

const MuteButton = (props: any) => {
  const { user, updateHandler, removeHandler, isExistLazy, history } = props;
  const [open, setOpen] = useState(false);
  const [mute, setMute] = useState({ result: false, data: null });

  useEffect(() => {
    isExistLazy().then((response: any) => {
      setMute(response);
    });
  }, [isExistLazy]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateHandler()
      .then(() => window.alert('ミュートが完了しました。')) // eslint-disable-line
      .then(() => setOpen(false))
      .then(() => history.push(window.location.pathname)); // eslint-disable-line
  };

  const handleRemove = () => {
    removeHandler(mute.data)
      .then(
        () => window.alert('ミュートを解除しました。') // eslint-disable-line
      )
      .then(() => history.push(window.location.pathname)); // eslint-disable-line
  };

  return (
    <React.Fragment>
      {mute.result ? (
        <div role="button" onClick={handleRemove}>
          <p style={{ textDecoration: 'underline' }}>ミュート解除</p>
        </div>
      ) : (
        <div role="button" onClick={handleOpen}>
          <p style={{ textDecoration: 'underline' }}>ミュート</p>
        </div>
      )}
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {user.displayName}さんをミュートしますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ミュートすると、そのユーザの投稿は表示されなくなります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            いいえ
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            autoFocus
          >
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default withRouter(MuteButton);
