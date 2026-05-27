
/* eslint-disable-next-line */
import React from 'react';
import '../../css/home.css';
import { Link } from 'react-router-dom';
import { CardContainer } from '../components/card_container.js'

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
