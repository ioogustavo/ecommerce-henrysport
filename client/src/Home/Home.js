import React from 'react';
import redux from 'redux';
import { Link } from 'react-router-dom';
import './home.css'
import Slider from '../components/Slider/slider.js';
import Slider2 from '../components/Slider/slider2.js';

export default function welcome() {
  return (
    <div >
      <Slider />

      

      <Slider2 />

    </div>
  );
}