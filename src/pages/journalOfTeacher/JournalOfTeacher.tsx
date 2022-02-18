import React, { useEffect, useState, useRef } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel, Button } from '@mui/material';

import { ControlledMenu, useMenuState } from '@szhsin/react-menu';
import messages from './messages';
import getPupils, { Pupils } from '../../__data_emulation/getTableData';
import Pupil from '../../models/Pupil';

import clsx from 'clsx';
import styles from './journalOfTeacher.module.scss';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const MAX_MARK = 5

export default () => {

  const [pupils, setPupils] = useState<Pupils>([]);
  const [openRefs, setOpenRefs] = useState<{ current: React.RefObject<HTMLDivElement> }>();
  const [currentStudent, setCurrentStudent] = useState<{ pupil: Pupil, markIndex: number }>();
  const [input, setInput] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const refs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  const { state, toggleMenu } = useMenuState();

  const tooltipProps = {
    state,
    arrow: true,
    role: 'tooltip',
    align: 'center',
    viewScroll: 'close',
  }

  const setAllPupils = async () => {
    const pupils = await getPupils();
    setPupils(pupils);
  };

  const changeMenu = (uuid: string, indexEstimate: number) => {
    toggleMenu(true);
    setOpenRefs({ current: refs.current[`${uuid}_${indexEstimate}`] });
    const student = pupils.find(e => e.uuid === uuid);
    setCurrentStudent({ pupil: student || currentStudent?.pupil, markIndex: indexEstimate });
  }

  const handleMark = () => {
    if (!currentStudent) {
      return;
    }

    if (isInputError()) {
      return;
    }

    const currentMark = checked ? 0 : Number(input);
    const newPupils = pupils.map((pupil) => {
      if (pupil.uuid === currentStudent?.pupil.uuid) {
        const newEstimates = pupil.estimates.slice();
        newEstimates[currentStudent?.markIndex].estimate = currentMark;
        return { ...pupil, estimates: newEstimates };
      }
      return pupil;
    });
    setPupils(newPupils as Pupils);
    toggleMenu(false);
  }

  const isInputError = () => !(Number(input) > 1 && Number(input) <= MAX_MARK);

  useEffect(() => { setAllPupils(); }, []);

  console.log(pupils)

  const renderBody = () => (<>
    {pupils.map(({ uuid, name, estimates }, index: number) =>
      (<TableRow key={uuid}>
        <TableCell className={styles.sticky} align="center">
          <div className={styles.doubleContent}>
            <div className={styles.item}>{index + 1}</div>
            <div className={styles.name}>{name}</div>
          </div>
        </TableCell>
        {estimates.map(({ estimate }, indexEstimate: number) => 
          <TableCell align="center">
            <div ref={(ref) => refs.current[`${uuid}_${indexEstimate}`] = ref}
              onClick={() => changeMenu(uuid, indexEstimate)}>
              {estimate > 1 ? estimate : 'H'}
            </div>
          </TableCell>)}
        <TableCell className={styles.stickyRight} align="center">
          <div className={styles.doubleContent}>
            <div className={styles.absence}>
              {estimates.filter(({ estimate } ) => estimate === 0).length}
            </div>
            <div className={styles.practicalScore}>
              {Math.round(estimates.reduce((acc, { estimate }) =>
                (acc + estimate), 0) / estimates.length)}
            </div>
            <div className={styles.finalGrade}>
              {Math.round(estimates.reduce((acc, { estimate }) =>
                (acc + estimate), 0) / estimates.length)}
            </div>
          </div>
        </TableCell>
      </TableRow>),
    )}
  </>);

return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 1630 }}>
        <Table className={styles.wrapper} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={clsx(styles.sticky, styles.item)} align="center">
                <div className={styles.doubleContent}>
                  <div className={styles.item}>{messages.item()}</div>
                  <div className={styles.name}>{messages.fullName()}</div>
                </div>
              </TableCell>
              {pupils[0]?.estimates.map(({ date }) => <TableCell align="center">{date}</TableCell>)}
              <TableCell className={clsx(styles.stickyRight, styles.item)} align="center">
                <div className={styles.doubleContent}>
                  <div className={styles.absence}>{messages.absences()}</div>
                  <div className={styles.practicalScore}>{messages.practicalScore()}</div>
                  <div className={styles.finalGrade}>{messages.finalGrade()}</div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderBody()}
          </TableBody>
        </Table>
      </TableContainer>
      <ControlledMenu {...tooltipProps} position='anchor' direction='right' offsetX={15} offsetY={120}
        anchorRef={openRefs} onClose={() => toggleMenu(false)}>
        <div className={styles.modal}>
          <p className={styles.header}>{messages.checkMark()}</p>
          <div className={styles.student}>
            <span className={styles.studentFirstData}>{messages.student()}</span>
            <span className={styles.studentSecond}>{currentStudent?.pupil.name}</span>
          </div>
          <div className={styles.student}>
            <span className={styles.studentFirstData}>{messages.date()}</span>
            <span className={styles.studentSecond}>{
              currentStudent?.pupil.estimates[currentStudent.markIndex].date}
            </span>
          </div>
          <FormControlLabel control={
            <Checkbox checked={checked} onChange={({ target: { checked } }) => setChecked(checked)}/>}
          label={messages.absent()}/>
          <TextField className={styles.input} id="outlined-basic"
            variant="outlined" error={isInputError()}
            helperText={isInputError() && messages.errorInput()}
            onChange={({ target: { value }}) => setInput(value)}/>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} variant="contained" onClick={handleMark}>
              {messages.checkMark()}
            </Button>
          </div>
        </div>
      </ControlledMenu>
    </div>);
};