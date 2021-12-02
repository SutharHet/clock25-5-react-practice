import React from 'react';
interface InputData{
  len: number,
  stateName: string,
  lenInc(): void,
  lenDec(): void
}
const InputControls: React.FC<InputData> = (props: InputData): React.ReactElement => {

  return(
    <fieldset>
      <legend id={props.stateName+"-label"}>{props.stateName} Length</legend>
      <div>
        <button id={props.stateName+"-increment"} onClick={props.lenInc}>+</button>
        <div id={props.stateName+"-length"}>{props.len}</div>
        <button id={props.stateName+"-decrement"} onClick={props.lenDec}>-</button>
      </div>
    </fieldset>
  )
}

export default InputControls;