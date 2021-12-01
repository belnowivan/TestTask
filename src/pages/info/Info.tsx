import * as React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import messages from './messages';
import styles from './info.module.scss';

const info = [
  { header: 'Я лечу с животным. Могу ли я купить билет на сайте?', text: messages.first },
  { header: 'Что нельзя провозить в багаже?', text: messages.second },
  { header: 'Я опоздал на регистрацию, но мой самолет еще не улетел. Меня не пустят?', text: messages.thirt },
  { header: 'За сколько времени до вылета можно сдать багаж?', text: messages.fourt },
  { header: 'В аэропортах каких городов есть репринтеры?', text: messages.five },
  { header: 'Как пользоваться мобильным посадочным талоном?', text: messages.six },
];

export default () =>
  <Grid item xs={12}>
    <Grid container justifyContent="center" spacing={5}>
      {info.map(({ header, text }) => (
        <Grid key={header} item>
          <Paper sx={{ height: 400, width: 550 }} className={styles.card}>
            <Typography variant="h4" component="div" gutterBottom>
              {header}
            </Typography>
            <br/>
            <Typography variant="h5" component="div" gutterBottom>
              {text}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Grid>;