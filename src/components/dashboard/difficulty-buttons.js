import React from 'react';

/*
 * The Buttons component displays buttons for all difficulty levels within
 *    difficultyConfig
 */

const Buttons = ({onResetClick, difficultyConfig}) => {
  const keys = [];

  // The keys in difficultyConfig hold the difficulty levels
  for (let key in difficultyConfig) {
    if (!difficultyConfig.hasOwnProperty(key)) { continue; }
    keys.push(key);
  }

  // Return all values found in keys as button elements
  const difficulties = keys.map((key) => {
    return (
      <button className="difficulty-button" key={key}
              onClick={ () => onResetClick(key) }>
              {key}
      </button>
    );
  });

  return (
    <div className="container">
      { difficulties }
    </div>
  );
}

export default Buttons;
