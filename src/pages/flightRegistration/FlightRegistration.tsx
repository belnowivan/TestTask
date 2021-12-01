import * as React from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useFormik } from 'formik';

import SeatPicker from 'react-seat-picker';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import routes from '../../app/routes';
import { rows } from './seats';
import messages from './messages';
import styles from './flightRegistration.module.scss';

const MIN_DOC_SERIA = 1000;
const MAX_DOC_SERIA = 9999;
const MIN_DOC_NUMBER = 100000;
const MAX_DOC_NUMBER = 999999;

const defaultData = {
  code: '',
  fio: '',
  docSeries: '',
  docNumber: '',
  card: '',
  place: '',
  notification: true,
  restrictions: false,
};

const inputsSchema = Yup.object().shape({
  code: Yup.string().nullable(false).required('Поле обязательно'),
  fio: Yup.string().nullable(false).required('Поле обязательно'),
  docSeries: Yup.number().typeError('Допустимы тоолько цифры')
    .required('Поле обязательно').min(MIN_DOC_SERIA, 'Должно быть 4 фицры').max(MAX_DOC_SERIA, 'Должно быть 4 фицры'),
  docNumber: Yup.number().typeError('Допустимы тоолько цифры')
    .required('Поле обязательно').min(MIN_DOC_NUMBER, 'Должно быть 6 фицр').max(MAX_DOC_NUMBER, 'Должно быть 6 фицр'),
  place: Yup.string().nullable(false).required('Поле обязательно'),
  notification: Yup.string().nullable(false),
  restrictions: Yup.bool().oneOf([false], 'В таком слуае, воспользуйтесь оффлайн регистрацией, в аэропорту'),
});

export default () => {

  const { uuid }: { uuid: string } = useParams();
  const history = useHistory();

  const { handleChange, handleSubmit, values, errors, setValues } = useFormik({
    initialValues: { ...defaultData, code: uuid },
    validationSchema: inputsSchema,
    validateOnMount: false,
    onSubmit: () => {
      const dataToStr = JSON.stringify(values);
      window.localStorage.setItem('flightRegistrations', dataToStr);
      console.log(values);
      history.push(routes.registrationEnd(uuid));
    },
  });

  return (
    <Box sx={{ width: '200px', padding: '50px' }}>
      <TextField className={styles.textField}
        label={messages.code}
        error={!!errors.code}
        helperText={errors.code}
        name='code'
        InputProps={{
          readOnly: true,
          disabled: true,
        }}
        onChange={handleChange}
        value={values.code}
      >
      </TextField>
      <TextField className={styles.textField}
        label={messages.fio}
        error={!!errors.fio}
        helperText={errors.fio}
        name='fio'
        onChange={handleChange}
        value={values.fio}
      >
      </TextField>
      <TextField className={styles.textField}
        label={messages.docSeries}
        error={!!errors.docSeries}
        helperText={errors.docSeries}
        name='docSeries'
        onChange={handleChange}
        value={values.docSeries}
      >
      </TextField>
      <TextField className={styles.textField}
        label={messages.docNumber}
        error={!!errors.docNumber}
        helperText={errors.docNumber}
        name='docNumber'
        onChange={handleChange}
        value={values.docNumber}
      >
      </TextField>
      <TextField className={styles.textField}
        label={messages.card}
        error={!!errors.card}
        helperText={errors.card}
        name='card'
        onChange={handleChange}
        value={values.card}
      >
      </TextField>
      <TextField className={styles.textField}
        label={messages.place}
        error={!!errors.place}
        helperText={errors.place}
        name='place'
        value={values.place}
        InputProps={{
          readOnly: true,
          disabled: true,
        }}
      >
      </TextField>
      <div className={styles.seatPickerWrpper}>
        <SeatPicker rows={rows}
          maxReservableSeats={1}
          addSeatCallback={({ row, number, id }, cb) => {
            const newTooltip = `${id}, обычное место`;
            setValues({ ...values, place: number });
            cb(row, number, id, newTooltip);
          }}
          removeSeatCallback={({ row, number, id }, cb) => {
            const newTooltip = `${id}, обычное место`;
            setValues({ ...values, place: number });
            cb(row, number, id, newTooltip);
          }}
        />
      </div>
      <div className={styles.checkbox}>
        <Typography component="div" gutterBottom>
          {messages.notificationDescr}
        </Typography>
        <Checkbox name='notification' onChange={handleChange}
          defaultChecked size='medium' className={styles.textField} checked={values.notification}/>
      </div>
      <div className={styles.checkbox}>
        <Typography component="div" gutterBottom>
          {messages.restrictionsDescr}
        </Typography>
        <br/>
        <RadioGroup
          defaultValue={false}
          name='restrictions'
          value={values.restrictions}
          onChange={handleChange}
        >
          <FormControlLabel value={false} control={<Radio/>} label="Не имею"/>
          <FormControlLabel value={true} control={<Radio/>} label="Имею"/>
        </RadioGroup>
        {errors.restrictions && <FormHelperText error>{errors.restrictions}</FormHelperText>}
      </div>
      <Button variant="contained" onClick={() => { handleSubmit(); }}>Зарегистрироваться</Button>
    </Box>
  );
};