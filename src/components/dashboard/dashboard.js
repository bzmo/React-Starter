import React, { Component } from 'react';
import Buttons from './difficulty-buttons.js';
import Stats from './stats.js';

/*
 * The Dashboard component displays the Buttons and Stats components
 */

const Dashboard = ({ minesCount, onResetClick, timer, difficultyConfig }) => {
  return (
    <div>
      <Buttons onResetClick={ (difficulty) => onResetClick(difficulty) }
               difficultyConfig={ difficultyConfig } />
      <Stats minesCount={ minesCount }
             timer={ timer } />
    </div>
  );
};

export default Dashboard;
