import React from 'react';
import '../../css/season.css';
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
                Testing pilots page
            </div>
        )
    }
}

export default Pilots;