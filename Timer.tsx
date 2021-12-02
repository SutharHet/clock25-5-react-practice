import React from 'react';
import '../App.css';
import { useTimer } from 'react-timer-hook';
import InputControls from './InputControls';
import TimerDisplay from './TimerDisplay';

const Timer: React.FC = (): React.ReactElement => {
  const [breakLen, setBreakLen] = React.useState<number>(5);
  const [sessionLen, setSessionLen] = React.useState<number>(25);
  const [curruntState, setCurruntState] = React.useState<string>('session');
  let expiryTimestamp: Date = new Date(new Date().setSeconds(new Date().getSeconds() + sessionLen * 60));
  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: (): void => (stateChange(curruntState)) });
  let audioBeep: HTMLAudioElement;
  React.useEffect(() => {
    audioBeep = document.getElementById('beep') as HTMLAudioElement;
  })
  const beepOnce = (): void =>{
    audioBeep.play();
    setTimeout(() => {
      audioBeep.pause()
    }, 1000)
  }
  const stateChange = (state: string): void => {
    if (state === 'session') { 
      beepOnce();
      setTimeout(() => {
        setCurruntState('break')
        expiryTimestamp = new Date(new Date().setSeconds(new Date().getSeconds() + breakLen * 60))
        restart(expiryTimestamp, true)
      } , 1000)
    }else {
      beepOnce();
      setTimeout(() => {
        setCurruntState('session');
        expiryTimestamp = new Date(new Date().setSeconds(new Date().getSeconds() + sessionLen * 60))
        restart(expiryTimestamp, true)
      } , 1000)
    }
  }
  const resetTimer = (): void => {
    // pause
    setBreakLen(5)
    setSessionLen(25)
    setCurruntState('session');
    expiryTimestamp = new Date(new Date().setSeconds(new Date().getSeconds() + 25 * 60))
    restart(expiryTimestamp, false)
  }

  const lenIncrement = (state: string): any => {
    if (isRunning !== true) {
      if (state === 'session') {
        if (sessionLen + 1 <= 60) {
          let sesh: number = sessionLen + 1
          setSessionLen(sesh)
          expiryTimestamp = new Date(new Date().setSeconds(new Date().getSeconds() + sesh * 60))
          restart(expiryTimestamp, false)
        }
      }
      if (state === 'break') {
        if (breakLen + 1 <= 60) {
          setBreakLen(breakLen + 1)
        }
      }
    }
  }

  const lenDecrement = (state: string): any => {
    if (isRunning !== true) {
      if (state === 'session') {
        if (sessionLen - 1 !== 0) {
          let sesh: number = sessionLen - 1
          setSessionLen(sesh)
          expiryTimestamp = new Date(new Date().setSeconds(new Date().getSeconds() + sesh * 60))
          restart(expiryTimestamp, false)
        }
      }
      if (state === 'break') {
        if (breakLen - 1 !== 0) {
          setBreakLen(breakLen - 1)
        }
      }
    }
  }

  return(
    <div className="container">
      <div className="top">
        <InputControls 
          stateName='break' 
          len={breakLen} 
          lenInc={() => lenIncrement('break')} 
          lenDec={() => lenDecrement('break')} 
        />
        <InputControls 
          stateName='session' 
          len={sessionLen} 
          lenInc={() => lenIncrement('session')} 
          lenDec={() => lenDecrement('session')} 
        />
      </div>
      <div className="main">
        <TimerDisplay 
          state={curruntState}
          minutes={minutes}
          seconds={seconds}
        />
        <audio id="beep" preload="auto" 
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
        <div className="btns">
          <button id="start_stop" onClick={isRunning ? pause : resume}>Start/Stop</button>
          <button id="reset" onClick={() => resetTimer()}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Timer;