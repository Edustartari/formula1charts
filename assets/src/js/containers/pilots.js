import React from 'react';
import '../../css/pilots.css';
import Image from '../components/image.js';
import _ from "lodash";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

class Pilots extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const image = require(`../../img/f1_background_ferrari_2.jpg`);
        return(
            <div className='pilots-desktop-container'>
                <div className='pilots-desktop-photos-list'>
                    <div className='pilots-desktop-photo-card'>PILOT PHOTO</div>
                    <div className='pilots-desktop-photo-card'>PILOT PHOTO</div>
                    <div className='pilots-desktop-photo-card'>PILOT PHOTO</div>
                    <div className='pilots-desktop-photo-card'>PILOT PHOTO</div>
                    <div className='pilots-desktop-photo-card'>PILOT PHOTO</div>
                </div>
                <div className='pilots-desktop-chart'>CHART ONE</div>
                <div className='pilots-desktop-chart'>CHART TWO</div>
                <div className='pilots-desktop-menu'>SIDEBAR MENU</div>
            </div>
        )
    }
}

export default Pilots;