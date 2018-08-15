import React from 'react'

import './style.css';

const Score = (props) => {
  return (
    <div className="Score">
      <div className="score-display">
        Score: {props.score}
      </div>
      <div className="goal-display">
        Goal: {props.goal}
      </div>
    </div>
  )
}


export default Score;

