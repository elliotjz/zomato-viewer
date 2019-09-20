import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { getOpeningHours, isOpenNow } from './utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('converts timing info to daily opening hours', () => {
  const timings1 = 'Closed (Mon-Tue),8 PM to 11 PM (Wed-Thu),8 PM to 12 Midnight (Fri-Sat),7:30 PM to 11 PM (Sun)';
  const timings2 = '6 AM to 5 PM (Mon-Fri),6:30 AM to 5 PM (Sat),7 AM to 5 PM (Sun)';
  const timings3 = '7:30 AM to 4 PM (Mon, Wed, Thu, Fri), Closed (Tue),8 AM to 4 PM (Sat-Sun)';
  const timings4 = '7:30 AM to 3:30 PM (Mon-Fri),8 AM to 3:30 PM (Sat-Sun)';
  const timings5 = '12 Noon to 10:30 PM (Mon-Sun)';
  const timings6 = '8 AM to 3 PM (Mon),8 AM to 1 PM, 6 PM to 9 PM (Tue-Sun)';

  const sunday = new Date('September 15, 2019 09:00:00');
  const monday = new Date('September 16, 2019 09:00:00');
  const tuesday = new Date('September 17, 2019 09:00:00');
  const wednesday = new Date('September 18, 2019 09:00:00');
  const thursday = new Date('September 19, 2019 09:00:00');
  const friday = new Date('September 20, 2019 09:00:00');
  const saturday = new Date('September 21, 2019 09:00:00');

  expect(getOpeningHours(timings1, monday)).toEqual('Closed');
  expect(getOpeningHours(timings1, tuesday)).toEqual('Closed');
  expect(getOpeningHours(timings2, wednesday)).toEqual('6 AM to 5 PM');
  expect(getOpeningHours(timings3, thursday)).toEqual('7:30 AM to 4 PM');
  expect(getOpeningHours(timings4, friday)).toEqual('7:30 AM to 3:30 PM');
  expect(getOpeningHours(timings4, saturday)).toEqual('8 AM to 3:30 PM');
  expect(getOpeningHours(timings1, sunday)).toEqual('7:30 PM to 11 PM');
  expect(getOpeningHours(timings5, friday)).toEqual('12 Noon to 10:30 PM');
  expect(getOpeningHours(timings6, friday)).toEqual('8 AM to 1 PM, 6 PM to 9 PM');
});

it('calculates whether a restaurant is open', () => {
  const openingHours1 = 'Closed';
  const openingHours2 = '6 AM to 5 PM';
  const openingHours3 = '7:30 AM to 4:30 PM';
  const openingHours4 = '8 PM to 12 Midnight';
  const openingHours5 = '12 Noon to 9 PM';
  const openingHours6 = '8 AM to 1 PM, 6 PM to 9 PM';
  const openingHours7 = '24 Hours';

  const nine = new Date('September 15, 2019 09:00:00');
  const five59 = new Date('September 15, 2019 05:59:00');
  const six = new Date('September 15, 2019 06:00:00');
  const seven19 = new Date('September 15, 2019 07:19:00');
  const seven30 = new Date('September 15, 2019 07:30:00');
  const eleven59 = new Date('September 15, 2019 11:59:00');
  const twelve = new Date('September 15, 2019 12:00:00');
  const sixteen22 = new Date('September 15, 2019 16:22:00');
  const sixteen35 = new Date('September 15, 2019 16:35:00');
  const seventeen10 = new Date('September 15, 2019 17:10:00');
  const twenty = new Date('September 15, 2019 20:00:00');
  const twentyOne10 = new Date('September 15, 2019 21:10:00');

  // calculates a closed restaurant
  expect(isOpenNow(openingHours1, nine)).toEqual(false);

  // calculates a restaurant that is about to open
  expect(isOpenNow(openingHours2, five59)).toEqual(false);
  expect(isOpenNow(openingHours3, seven19)).toEqual(false);

  // calculates a restaurant that has just opened
  expect(isOpenNow(openingHours2, six)).toEqual(true);
  expect(isOpenNow(openingHours3, seven30)).toEqual(true);

  // calculates a restaurant that is about to close
  expect(isOpenNow(openingHours2, sixteen35)).toEqual(true);
  expect(isOpenNow(openingHours3, sixteen22)).toEqual(true);

  // calculates a restaurant that has just closed
  expect(isOpenNow(openingHours3, sixteen35)).toEqual(false);
  expect(isOpenNow(openingHours2, seventeen10)).toEqual(false);

  // deals with MIDNIGHT
  expect(isOpenNow(openingHours4, twentyOne10)).toEqual(true);

  // deals with Noon
  expect(isOpenNow(openingHours5, eleven59)).toEqual(false);
  expect(isOpenNow(openingHours5, twelve)).toEqual(true);

  // Deals with two open periods in a day
  expect(isOpenNow(openingHours6, nine)).toEqual(true);
  expect(isOpenNow(openingHours6, sixteen22)).toEqual(false);
  expect(isOpenNow(openingHours6, twenty)).toEqual(true);
  expect(isOpenNow(openingHours6, twentyOne10)).toEqual(false);

  // Deals with white space
  expect(isOpenNow(` ${openingHours6}`, nine)).toEqual(true);

  // Deals with 24 hour opening times
  expect(isOpenNow(`${openingHours7}`, nine)).toEqual(true);
});
