import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const countrys = [
  { code: 'bg', number: '+359 000 92 392', name: 'Болгария' },
  { code: 'de', number: '+49 983 231 42 84', name: 'Германия' },
  { code: 'at', number: '+43 482 748 98 71', name: 'Австрия' },
  { code: 'us', number: '+1 643 487 26 89', name: 'Сша' },
  { code: 'jp', number: '+81 123 987 33 99', name: 'Япония' },
  { code: 'se', number: '+46 873 092 27 78', name: 'Швеция' },
];

export default () =>
  <Box sx={{ width: '100%', maxWidth: 700, paddingLeft: '40px' }}>
    <Typography variant="h3" component="div" gutterBottom>
      Контакты
    </Typography>
    <br/>
    <Typography variant="h4" component="div" gutterBottom>
      Контактный Центр
    </Typography>
    <Typography variant="subtitle1" gutterBottom component="div">
      +7 909 999 00 99, +7 495 900 999 99 00
    </Typography>
    <Typography variant="subtitle1" gutterBottom component="div">
      Бесплатно по России: 8 000 000-0000
    </Typography>
    <br/>
    <Typography variant="h4" gutterBottom component="div">
      Бесплатные номера вне территории России:
    </Typography>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {countrys.map(({ code, number, name }) =>
        <ListItem>
          <ListItemIcon>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${code}.png`}
              srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
              alt="" />
          </ListItemIcon>
          <ListItemText primary={name} secondary={number}/>
        </ListItem>)}
    </List>
  </Box>;