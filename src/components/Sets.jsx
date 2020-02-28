import React from 'react'

export const Sets = ({ set, onChange }) => {
  return (
    <div>
      <label>Theros Beyond Death</label>
      <input
        type="radio"
        name="set"
        value="THB"
        checked={set === "THB"}
        onChange={e => onChange(e)}
      />

      <label>Throne of Eldraine</label>
      <input
        type="radio"
        name="set"
        value="ELD"
        checked={set === "ELD"}
        onChange={e => onChange(e)}
      />
    </div>
  );
}
