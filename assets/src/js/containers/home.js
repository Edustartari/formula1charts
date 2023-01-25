import React from 'react';
import '../../css/home.css';
import Image from '../components/image.js';
import TextTransition, { presets } from "react-text-transition";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

// Create class component to home-desktop-card
class CardContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            subtitle: this.props.subtitle
        }
    }
    render(){
        return(
            <div 
                className='home-desktop-card' 
                // onMouseEnter={() => this.setState({subtitle: this.props.subtitle})}
                // onMouseLeave={() => this.setState({subtitle: ''})}
            >
                <div className='home-desktop-card-text'>
                    <div className='home-desktop-card-title'>{this.props.title}</div>
                    <div className='home-desktop-card-subtitle'>
                        {/* <TextTransition
                            springConfig={{ tension: 300, friction: 10 }}
                        > */}
                            {this.state.subtitle}
                        {/* </TextTransition> */}
                    </div>
                </div>
                <Image name={this.props.image}/>
                <div className='home-desktop-card-opacity'></div>
            </div>
        )
    }
}

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {}

        this.change_menu = this.change_menu.bind(this);
    }

    change_menu(){
        // get home-desktop-container element and find the top position
        const home_desktop_container = document.getElementById('home-desktop-container');
        const home_desktop_container_top = home_desktop_container.getBoundingClientRect().top;
        const home_desktop_menu = document.getElementById('home-desktop-menu');
        const home_desktop_menu_item = document.getElementById('home-desktop-menu-item');
        if(home_desktop_container_top < -(40)){
            // Get home-desktop-menu element and add class
            home_desktop_menu.style.position = 'fixed';
            home_desktop_menu.style.zIndex = 2;
            home_desktop_menu.style.backgroundColor = 'white';

            // Get home-desktop-menu-item element and add class
            home_desktop_menu_item.style.color = 'black';
            home_desktop_menu_item.style.margin = '0 20px 0 0';
            home_desktop_menu_item.style.fontWeight = '600';
            home_desktop_menu_item.style.border = '1px solid black';
        } else {
            // Get home-desktop-menu element and add class
            home_desktop_menu.style.position = 'absolute';
            home_desktop_menu.style.zIndex = 2;
            home_desktop_menu.style.backgroundColor = 'transparent';

            // Get home-desktop-menu-item element and add class
            home_desktop_menu_item.style.color = 'white';
            home_desktop_menu_item.style.margin = '60px 40px 0 0';
            home_desktop_menu_item.style.fontWeight = 'normal';
            home_desktop_menu_item.style.border = '1px solid white';
        }
        home_desktop_menu.style.transition = 'all 0.3s ease';
        home_desktop_menu_item.style.transition = 'all 0.3s ease';
    }

    componentDidMount() {
        window.addEventListener('scroll', this.change_menu);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.change_menu);
    }
    
    render(){
        const image = require(`../../img/f1_background_ferrari_2.jpg`);
        return(
            <div className='home-desktop-container' id='home-desktop-container'>
                <div className='home-desktop-menu' id='home-desktop-menu'>
                    <div className='home-desktop-menu-item' id='home-desktop-menu-item'>MENU</div>
                </div>
                <div className='home-desktop-card home-desktop-first-card' style={{backgroundImage: "url('" + image.default + "')"}}>
                    <div className='home-desktop-card-text'>
                        <div className='home-desktop-card-title'>FORMULA 1</div>
                        <div className='home-desktop-card-subtitle'>CHARTS</div>
                    </div>
                    <div className='home-desktop-card-opacity'></div>
                </div>
                <Link to="/all-seasons">
                    <CardContainer
                        title='BY SEASON'
                        subtitle='Check out championship fight standings in each race'
                        slug='formula-1'
                        image='f1_background_mercedes_5'
                    />
                </Link>
                <Link to="/pilots">
                    <CardContainer
                        title='PILOTS COMPARATIVE'
                        subtitle='Compare title, wins, poles and more'
                        slug='formula-1'
                        image='f1_background_pilot_1'
                    />
                </Link>
                <CardContainer
                    title='ALL TIME COMPARATIVE'
                    subtitle='Check out all main conquests by year'
                    slug='formula-1'
                    image='f1_background_ferrari_2'
                />
                <CardContainer
                    title='CONSTRUCTOR STATISTICS'
                    subtitle='See all main achievements'
                    slug='formula-1'
                    image='f1_background_ferrari_3'
                />
                <CardContainer
                    title='OTHERS COOL STATS'
                    subtitle='Interesting numbers from races and pilots'
                    slug='formula-1'
                    image='f1_background_mercedes_4'
                />
            </div>
        )
    }
}
  
export default Home;