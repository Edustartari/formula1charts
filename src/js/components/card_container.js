/* eslint-disable-next-line */
import React, { memo } from 'react';
import Image from '../components/image.js';

const CardContainer = (props) => {

  const highlight_background = (action, id) => {
    let card = document.getElementById(id);
    let image_card = card.getElementsByClassName('image-component-container')[0];
    if (action === 'active') {
      card.style.padding = '40px';
      card.style.transition = 'all 0.5s ease-in-out';
      image_card.style.borderRadius = '50px';
      image_card.style.transition = 'all 0.5s ease-in-out';
      image_card.style.boxShadow = '-5px 5px 70px 40px rgba(0, 0, 0, 0.5)';
    } else {
      card.style.padding = '0px';
      card.style.transition = 'all 0.5s ease-in-out';
      image_card.style.borderRadius = '0px';
      image_card.style.transition = 'all 0.5s ease-in-out';
      image_card.style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    }
  }

  return (
    <div
      id={props.image + '_1'}
      className='home-desktop-card'
      onMouseEnter={() => highlight_background('active', props.image + '_1')}
      onMouseLeave={() => highlight_background('deactive', props.image + '_1')}
    >
      <div className='home-desktop-card-text'>
        <div className='home-desktop-card-title'>{props.title}</div>
        <div className='home-desktop-card-subtitle'>
          {props.subtitle}
        </div>
      </div>
      <Image name={props.image} />
      <div className='home-desktop-card-opacity'></div>
    </div>
  );
}

export { CardContainer }

