import { v4 as uuidv4 } from 'uuid';
import Pupil from '../models/Pupil';

export type Pupils = Array<Pupil>;

/* eslint-disable @typescript-eslint/no-magic-numbers */
const estimates1 = [2, 5, 3, 5, 0, 5, 0, 2, 5, 4, 5, 5].map(e => ({ estimate: e, date: '21.11.2021' }));
const estimates2 = [0, 3, 3, 4, 0, 3, 0, 2, 0, 4, 2, 3].map(e => ({ estimate: e, date: '21.11.2021' }));
const estimates3 = [0, 0, 5, 2, 0, 3, 5, 2, 5, 5, 4, 2].map(e => ({ estimate: e, date: '21.11.2021' }));
const estimates4 = [0, 0, 2, 2, 0, 5, 5, 5, 5, 5, 5, 5].map(e => ({ estimate: e, date: '21.11.2021' }));
/* eslint-disable @typescript-eslint/no-magic-numbers */


const pupils: Pupils = [
  { uuid: uuidv4(), name: 'Васильева Анна Игоревна', estimates: estimates1 },
  { uuid: uuidv4(), name: 'Игратьевна Катя Игоревна', estimates: estimates2 },
  { uuid: uuidv4(), name: 'Сергеевна Катя Игоревна', estimates: estimates3 },
  { uuid: uuidv4(), name: 'Валерьевна Катя Игоревна', estimates: estimates4 },
];

const getNewPupils = () => pupils.map(pupil => ({ ...pupil, uuid: uuidv4() }));

const morePupils: Pupils = [...pupils, ...getNewPupils().reverse(), ...getNewPupils(), ...getNewPupils().reverse()];

export default (): Promise<Pupils> => {
  return new Promise((resolve) => resolve(morePupils));
};
// emulation of asynchronous data retrieval