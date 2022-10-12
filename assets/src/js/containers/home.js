import React from 'react';
import '../../css/home.css';
import Image from '../components/image.js';
import TextTransition, { presets } from "react-text-transition";

// Create class component to home-desktop-card
class CardContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            subtitle: ''
        }
    }
    render(){
        return(
            <div 
                className='home-desktop-card' 
                onMouseEnter={() => this.setState({subtitle: this.props.subtitle})}
                onMouseLeave={() => this.setState({subtitle: ''})}
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
    }

    render(){
        return(
            <div className='home-desktop-container'>
                <div className='home-desktop-menu'>MENU</div>
                <div className='home-desktop-card home-desktop-first-card'>
                    <div className='home-desktop-card-text'>
                        <div className='home-desktop-card-title'>FORMULA 1</div>
                        <div className='home-desktop-card-subtitle'>CHARTS</div>
                    </div>
                    <Image name={'f1_background_ferrari_2'}/>
                    <div className='home-desktop-card-opacity'></div>
                </div>
                <CardContainer
                    title='BY SEASON'
                    subtitle='Check out championship fight standings in each race'
                    slug='formula-1'
                    image='f1_background_mercedes_5'
                />
                <CardContainer
                    title='PILOTS COMPARATIVE'
                    subtitle='Compare title, wins, poles and more'
                    slug='formula-1'
                    image='f1_background_pilot_1'
                />
                <CardContainer
                    title='CONSTRUCTOR STATISTICS'
                    subtitle='See all main achievements'
                    slug='formula-1'
                    image='f1_background_ferrari_3'
                />
                <CardContainer
                    title='ALL TIME COMPARATIVE'
                    subtitle='Check out all main conquests by year'
                    slug='formula-1'
                    image='f1_background_ferrari_2'
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