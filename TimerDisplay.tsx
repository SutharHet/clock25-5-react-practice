import React from 'react';
interface Data{
  state: string,
  minutes: number,
  seconds: number
}
const TimerDisplay: React.FC<Data> = (props: Data): React.ReactElement => {

  return(
    <div>
      <div id="timer-label">{props.state}</div>
      <div id="time-left">
        {props.minutes < 10? "0"+props.minutes : props.minutes}:{props.seconds < 10? "0"+props.seconds : props.seconds}
      </div>
    </div>
  )
}

export default TimerDisplay;