import React, { Component } from 'react';
import { withDeck, updaters } from 'mdx-deck';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: props.timeLeft,
    };

    const { update, index } = props.deck;
    const { setSteps } = updaters;
    update(setSteps(index, 1));

    this._tick = this._tick.bind(this);
    this._postTick = this._postTick.bind(this);
  }

  componentDidMount() {
    if (this.props.deck.active) {
      this._startTimer();
    }
  }

  componentDidUpdate() {
    if (!this.props.deck.active) {
      this._stopTimer();
      this.setState({
        timeLeft: this.props.timeLeft,
      });
    }
  }

  render() {
    const { timeLeft } = this.state;

    return <div>{timeLeft}</div>;
  }

  _startTimer() {
    this._tick();
  }

  _stopTimer() {
    clearTimeout(this._timeoutId);
  }

  _tick() {
    this.setState(
      ({ timeLeft }) => ({ timeLeft: Math.max(timeLeft - 1, 0) }),
      this._postTick,
    );
  }

  _postTick() {
    if (this.state.timeLeft <= 0) {
      this._stopTimer();
    } else {
      this._timeoutId = setTimeout(this._tick, 1000);
    }
  }
}

export default withDeck(Timer);
