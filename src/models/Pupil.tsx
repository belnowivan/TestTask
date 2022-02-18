export type Estimate = { estimate: number, date: string };

export default interface Pupil {
  name: string,
  uuid: string,
  estimates: Array<Estimate>,
}