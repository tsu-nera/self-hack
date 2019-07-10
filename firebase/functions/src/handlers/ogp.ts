import * as fs from 'fs';
import admin from '../utils/admin';

const path = require('path');

exports.dashboard = (req: any, res: any) => {
  const [, , challengeId, , userShortId] = req.path.split('/');
  const resourceId = `challenges/${challengeId}/participants/${userShortId}`;

  return admin
    .firestore()
    .doc(resourceId)
    .get()
    .then((doc: any) => {
      if (!doc) {
        res.status(404).end('404 Not Found');
        return;
      }
      const userItem = doc.data();

      const userName = userItem ? userItem.displayName : 'Annonymous';
      const challengeName = userItem ? userItem.challengeName : '';
      const accDays = userItem ? userItem.accDays : 0;

      const title = `${userName}さんの記録 | Titan`;
      const description = `${challengeName}に参加中。${accDays}日達成しました！`;
      const url = `https://titan-fire.com/c/${challengeId}/u/${userShortId}`;

      res.set('Cache-Control', 'public, max-age=600, s-maxage=600');

      fs.readFile(
        path.join(__dirname, '../index.html'),
        'utf8',
        (e: any, html: any) => {
          html = html.replace(
            html.match(/<meta property="og:title"[^>]*>/),
            `<meta property="og:title" content="${title}">`
          );
          html = html.replace(
            html.match(/<meta property="og:description"[^>]*>/),
            `<meta property="og:description" content="${description}">`
          );
          html = html.replace(
            html.match(/<meta property="og:url"[^>]*>/),
            `<meta property="og:url" content="${url}">`
          );
          res.status(200).send(html);
        }
      );
    })
    .catch((err: any) => {
      console.error(err);
    });
};

exports.topic = (req: any, res: any) => {};