export default {
  flightRegistration: (uuid: string) => `/flight/${uuid}`,
  info: () => '/info',
  registrationEnd: (uuid: string) => `/registrationEnd/${uuid}`,
  contacts: () => '/contacts',
};
