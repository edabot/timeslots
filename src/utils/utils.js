import moment from 'moment-timezone';

const utils = {
  checkOneEvent: (newEvent, event) => {
    if (
      moment(newEvent.end).isSameOrBefore(event.start) ||
      moment(newEvent.start).isSameOrAfter(event.end)
    ) {
      return true;
    }
    return false;
  },

  checkEvents: (newEvent, events) => {
    for (let event of events) {
      if (!utils.checkOneEvent(newEvent, event)) {
        return false;
      }
    }
    return true;
  },

  convertLengthToString: time => {
    let minutes = time % 60,
      hours = (time - minutes) / 60,
      string = '';
    if (hours > 0) {
      string = `${hours} hour`;
      if (hours > 1) {
        string += 's';
      }
      if (minutes > 0) {
        string += ` `;
      }
    }
    if (minutes > 0) {
      string += `${minutes} minutes`;
    }
    return string;
  },

  createStartTimes: (start, end) => {
    let times = [];
    let startTime = moment(start),
      endTime = moment(end);
    while (startTime.isSameOrBefore(endTime)) {
      let object = {
        value: moment(startTime),
        label: startTime.format('h:mm a')
      };
      times.push(object);
      startTime.add(30, 'minutes');
    }
    return times;
  },

  createDurationOptions: durations => {
    let result = [];
    for (let duration of durations) {
      let object = {
        value: duration,
        label: utils.convertLengthToString(duration)
      };
      result.push(object);
    }
    return result;
  },

  createTimeSlots: (start, end, events) => {
    let result = [],
      slotStart = moment(start),
      slotEnd = moment(end);
    for (let i = 0; i < 9; i++) {
      if (utils.checkEvents({ start: slotStart, end: slotEnd }, events)) {
        result.push({ time: moment(slotStart), valid: true });
      } else {
        result.push({ time: moment(slotStart), valid: false });
      }
      slotStart.add(30, 'minutes');
      slotEnd.add(30, 'minutes');
    }
    return result;
  }
};

export default utils;
