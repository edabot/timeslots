import utils from './utils';
import events from '../constants/events';

const event1 = {
  start: '2017-02-21T10:15:00-05:00',
  end: '2017-02-21T10:30:00-05:00'
};

const event1copy = {
  start: '2017-02-21T10:15:00-05:00',
  end: '2017-02-21T10:30:00-05:00'
};

const eventOverlapEnd = {
  start: '2017-02-21T10:15:00-05:00',
  end: '2017-02-21T11:30:00-05:00'
};

const eventOverlapStart = {
  start: '2017-02-21T09:15:00-05:00',
  end: '2017-02-21T10:20:00-05:00'
};

const event2 = {
  start: '2017-02-21T11:15:00-05:00',
  end: '2017-02-21T11:30:00-05:00'
};

const eventsTest = {
  start: '2017-02-21T11:45:00-05:00',
  end: '2017-02-21T12:00:00-05:00'
};

it('event test fails', () => {
  expect(utils.checkOneEvent(event1, event1copy)).toBeFalsy();
  expect(utils.checkOneEvent(event1, eventOverlapEnd)).toBeFalsy();
  expect(utils.checkOneEvent(event1, eventOverlapStart)).toBeFalsy();
});

it('event test success', () => {
  expect(utils.checkOneEvent(event1, event2)).toBeTruthy();
});

it('events test success', () => {
  expect(utils.checkEvents(eventsTest, events)).toBeTruthy();
});

it('events test fail', () => {
  expect(utils.checkEvents(event1, events)).toBeFalsy();
});

it('converts time', () => {
  expect(utils.convertLengthToString(30)).toEqual('30 minutes');
  expect(utils.convertLengthToString(60)).toEqual('1 hour');
  expect(utils.convertLengthToString(90)).toEqual('1 hour 30 minutes');
  expect(utils.convertLengthToString(210)).toEqual('3 hours 30 minutes');
});

it('makes durations', () => {
  expect(utils.createDurationOptions([10]).length).toEqual(1);
  expect(utils.createDurationOptions([10, 20, 30])[2].label).toEqual(
    '30 minutes'
  );
});

it('makes time slots', () => {
  expect(
    utils.createTimeSlots(event1.start, event1.end, events)[1].valid
  ).toBeFalsy();
  expect(
    utils.createTimeSlots(event1.start, event1.end, events)[2].valid
  ).toBeTruthy();
});
