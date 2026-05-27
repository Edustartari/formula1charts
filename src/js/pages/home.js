
/* eslint-disable-next-line */
import React from 'react';
import '../../css/home.css';
import Image from '../components/image.js';
import { Link } from 'react-router-dom';

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

const Home = () => {

  const image = require(`../../img/f1_background_ferrari_2.webp`);
  return (
    <div className='home-desktop-container' id='home-desktop-container'>
      <div className='home-desktop-card home-desktop-first-card' style={{ backgroundImage: "url('" + image.default + "')" }}>
        <div className='home-desktop-card-text'>
          <div className='home-desktop-card-title'>FORMULA 1</div>
          <div className='home-desktop-card-subtitle'>CHARTS</div>
        </div>
        <div className='home-desktop-card-opacity'></div>
      </div>
      <Link to='/all-seasons'>
        <CardContainer
          title='BY SEASON'
          subtitle='Check out championship fight standings in each race'
          slug='formula-1'
          image='f1_background_mercedes_5'
        />
      </Link>
      <Link to='/pilots'>
        <CardContainer
          title='PILOTS COMPARATIVE'
          subtitle='Compare title, wins, poles and more'
          slug='formula-1'
          image='f1_background_pilot_1'
        />
      </Link>
      <Link to='/all-time'>
        <CardContainer
          title='ALL TIME COMPARATIVE'
          subtitle='Check out all main conquests by year'
          slug='formula-1'
          image='f1_background_ferrari_2'
        />
      </Link>
      <Link to='/constructors'>
        <CardContainer
          title='CONSTRUCTOR STATISTICS'
          subtitle='See all main achievements'
          slug='formula-1'
          image='f1_background_ferrari_3'
        />
      </Link>
      <Link to='/others'>
        <CardContainer
          title='OTHERS COOL STATS'
          subtitle='Interesting numbers from races and pilots'
          slug='formula-1'
          image='f1_background_mercedes_4'
        />
      </Link>
    </div>
  );
}

export default Home;
