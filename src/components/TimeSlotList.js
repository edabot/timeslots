import React, { Component } from 'react';
import styled from 'styled-components';
import TimeSlot from './TimeSlot';

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap
  margin: 0 auto;
`;

const TimeSlotList = ({ timeSlots }) => (
  <List>
    {timeSlots.map(slot => (
      <TimeSlot key={slot.time} slot={slot.time} valid={slot.valid} />
    ))}
  </List>
);

export default TimeSlotList;
