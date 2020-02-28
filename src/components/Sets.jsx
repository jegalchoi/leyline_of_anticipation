import React from 'react'

export const Sets = ({ set, onSetChange }) => {
  return (
    <div>
      
        <label>
          <input
            type="radio"
            name="set"
            // value="TBD"
            checked={set === "TBD"}
            onChange={onSetChange('TBD')}
          > Theros Beyond Death
          </input>
        </label>
        <label>
          <input
            type="radio"
            name="set"
            // value="ELD"
            checked={set === "ELD"}
            onChange={onSetChange('ELD')}
          > Throne of Eldraine
          </input>
        </label>
      
    </div>
  );
}
