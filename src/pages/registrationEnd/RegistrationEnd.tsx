import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const fieldsMap: { [key: string]: (data: string) => React.ReactElement } = {
  code: (data: string) => <Typography variant='h5'>{`Рейс номер: ${data}`}</Typography>,
  fio: (data: string) => <Typography variant='h5'>{`Пассажир: ${data}`}</Typography>,
  place: (data: string) => <Typography variant='h5'>{`Место: ${data}`}</Typography>,
};

export default () => {
  const data = localStorage.getItem('flightRegistrations') as string;
  const dataFormObject = JSON.parse(data);
  
  return (<Box sx={{ width: '600px', padding: '30px' }}>
    {Object.keys(dataFormObject).map((key: string) => {
      console.log(key);
      return fieldsMap[key] ? fieldsMap[key](dataFormObject[key]) : null;
    })}
    <Typography>
      Успешно зарегистрирован на рейс! Вам на почту напревленно письмо м подтверждением и файлом регистрации.
    </Typography>
  </Box>);
};