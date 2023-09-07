import React from 'react';
import '../../css/all_time.css';
import Image from '../components/image.js';
import _ from "lodash";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { ResponsiveRadar } from '@nivo/radar'
import Switch from '@mui/material/Switch';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FuzzySearch from "fuzzy-search";

class AllTime extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            drivers_range: 5
        }
    }

    // Add several filters to help usrs interact with charts???
    // For example: select all pilots with 2 titles
    // For example: select all pilots from the 1980s
    // For example: select all pilots from specific country

    render(){

        if (this.state.loading) {
            return (
                <Backdrop open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
        } else {

            let image_test = require(`../../img/f1_background_ferrari_2.jpg`);

            return(
                <div className='all-time-background'>
                    <div className='all-time-main-container'>
                        <div className='all-time-main-title'>All Time Comparison</div>
                        <div className='all-time-options'>
                            <div className='all-time-option-box'>
                                <div className='all-time-option-box-text'>option</div>
                                <div className='all-time-option-box-component'>option component</div>
                            </div>
                            <div className='all-time-option-box'>
                                <div className='all-time-option-box-text'>option</div>
                                <div className='all-time-option-box-component'>option component</div>
                            </div>
                            <div className='all-time-option-box'>
                                <div className='all-time-option-box-text'>Range of drivers: {this.state.drivers_range}</div>
                                <div className='all-time-option-box-component'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.drivers_range}
                                            label="Age"
                                            onChange={(e) => this.setState({drivers_range: e.target.value})}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={9}>9</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='all-time-option-box'>
                                <div className='all-time-option-box-text'>option</div>
                                <div className='all-time-option-box-component'>option component</div>
                            </div>
                        </div>
                        <div className='all-time-main-button'>SEARCH</div>
                        <div className='all-time-charts'>
                            <div className='all-time-chart-box'>
                                <div className='all-time-chart-box-info'>
                                    <div className='all-time-chart-box-info-photo' style={{backgroundImage: "url(" + image_test.default + ")"}}></div>
                                    <div className='all-time-chart-box-info-text'>Driver Name</div>
                                </div>
                                <div className='all-time-chart-details'>CHART</div>
                            </div>
                            <div className='all-time-chart-box'>
                                <div className='all-time-chart-box-info'>
                                    <div className='all-time-chart-box-info-photo' style={{backgroundImage: "url(" + image_test.default + ")"}}></div>
                                    <div className='all-time-chart-box-info-text'>Driver Name</div>
                                </div>
                                <div className='all-time-chart-details'>CHART</div>
                            </div>
                            <div className='all-time-chart-box'>
                                <div className='all-time-chart-box-info'>
                                    <div className='all-time-chart-box-info-photo' style={{backgroundImage: "url(" + image_test.default + ")"}}></div>
                                    <div className='all-time-chart-box-info-text'>Driver Name</div>
                                </div>
                                <div className='all-time-chart-details'>CHART</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AllTime;