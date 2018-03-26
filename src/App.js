import React, { Component } from 'react';
import './App.css';
import events from './constants/events';
import moment from 'moment-timezone';
import Dropdown from 'react-dropdown';
import TimeSlotList from './components/TimeSlotList';
import durations from './constants/durations';
import utils from './utils/utils';
import styled from 'styled-components';

const Picker = styled.div`
  margin: 100px auto;
  width: 700px;
`;

const Dropdowns = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  > div:last-child {
    margin-left: 1rem;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      eventStart: moment('2017-02-21 09:00'),
      eventEnd: moment('2017-02-21 09:30'),
      duration: { value: 30, label: '30 minutes' },
      startTimes: utils.createStartTimes(
        '2017-02-21 09:00',
        '2017-02-21 15:00'
      ),
      durationOptions: utils.createDurationOptions(durations),
      timeSlots: utils.createTimeSlots(
        '2017-02-21 09:00',
        '2017-02-21 09:30',
        events
      ),
      events: events
    };
  }

  updateDuration = (duration, start = this.state.eventStart) => {
    let eventEnd = moment(start).add(duration.value, 'minutes');
    this.setState({ duration: duration, eventEnd: eventEnd });
    this.updateSlots(start, eventEnd);
  };

  updateStart = start => {
    let newStart = moment(start.value);
    this.setState({ eventStart: newStart });
    this.updateDuration(this.state.duration, newStart);
  };

  updateSlots = (start, end) => {
    let newSlots = utils.createTimeSlots(start, end, this.state.events);
    this.setState({ timeSlots: newSlots });
  };

  render() {
    return (
      <div className="App">
        <Picker>
          <Dropdowns>
            <Dropdown
              options={this.state.startTimes}
              onChange={this.updateStart}
              value={this.state.eventStart.format('h:mm a')}
              placeholder="Select an option"
            />
            <Dropdown
              options={this.state.durationOptions}
              onChange={this.updateDuration}
              value={this.state.duration.label}
              placeholder="Select a duration"
            />
          </Dropdowns>
          <TimeSlotList timeSlots={this.state.timeSlots} />
        </Picker>
      </div>
    );
  }
}

export default App;
