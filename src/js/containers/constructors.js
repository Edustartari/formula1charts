import React from 'react';
import '../../css/constructors.css';
import Image from '../components/image.js';
import _ from "lodash";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { ResponsiveBump } from '@nivo/bump';

class Constructors extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        let image;
        try {
            image = require(`../../img/season_` + content.year + `_car.webp`);
        } catch (error) {
            image = require(`../../img/f1_background_ferrari_2.webp`);
        }

        return(
            <div className='constructors-desktop-container'>
                Constructors page
            </div>
        )
    }
}

export default Constructors;