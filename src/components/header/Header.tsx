import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import styles from './header.module.scss';

import routes from '../../app/routes';

const pages = [
  { name: 'Справочная информация', path: routes.info(), key: 'info' },
  { name: 'Контакты', path: routes.contacts(), key: 'contacts' },
];

export default () =>
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        {pages.map(({ name, path, key }) => (
          <Link className={styles.link} href={path} key={key}>{name}</Link>
        ))}
      </Toolbar>
    </AppBar>
  </Box>;
