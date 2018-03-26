import React, { Component } from 'react';
import styled from 'styled-components';

const ValidTime = styled.div`
  background-color: #92c95c;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 1s;
`;

const InvalidTime = ValidTime.extend`
  background-color: #eee;
  color: #ddd;
  cursor: default;
`;

class TimeSlot extends Component {
  render() {
    if (this.props.valid) {
      return <ValidTime>{this.props.slot.format('h:mm a')}</ValidTime>;
    } else {
      return <InvalidTime>{this.props.slot.format('h:mm a')}</InvalidTime>;
    }
  }
}

export default TimeSlot;
