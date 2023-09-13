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
import { ResponsiveRadar } from '@nivo/radar'
import Switch from '@mui/material/Switch';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

class AllTime extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            range: 5,
            nationality: 'World',
            filter_type: 'titles',
            first_date:  moment(new Date(1950, 1, 1)),
            second_date:  moment(new Date()),
            drivers: [],
            drivers_filtered: [],
            nationalities: {},
        }

        this.load_drivers = this.load_drivers.bind(this);
        this.load_nationalities = this.load_nationalities.bind(this);
        this.search_drivers = this.search_drivers.bind(this);

        this.load_nationalities();
        this.load_drivers();
    }

    load_nationalities(){
        fetch('/load-nationalities')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({nationalities: data.nationalities});
            console.log('finish fetch...')
            console.log(this.state.nationalities)
            console.log(Object.keys(this.state.nationalities).length)
            this.setState({loading: false});
        })
    }

    load_drivers(){
        fetch('/pilots-list')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({drivers_filtered: data.drivers});
            this.setState({drivers: data.drivers});
            console.log('finish fetch...')
            console.log(this.state.drivers)
            console.log(this.state.drivers.length)
            this.setState({loading: false});
        })
    }

    search_drivers(){
        console.log('')
        console.log('searching drivers...')
        let drivers_list = [...this.state.drivers];
        let new_list = drivers_list.filter(driver => {
            let has_nationality = driver['nationality'] && driver['nationality']['nationality_title'] === this.state.nationality;
            /* let inside_date_range = 
            if(has_nationality && ) */
            return
        })


    }

    // Add several filters to help usrs interact with charts???
    // For example: select all pilots with 2 titles
    // For example: select all pilots from the 1980s
    // For example: select all pilots from specific country

    render(){

        if (this.state.drivers.length === 0 || Object.keys(this.state.nationalities).length === 0) {
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
                            <div className='all-time-options-column-1'>
                                <div className='all-time-option-box'>
                                    <div className='all-time-option-box-text'>Nationality: {this.state.nationality}</div>
                                    <div className='all-time-option-box-component'>
                                        <FormControl fullWidth>
                                            <Select
                                                id="demo-simple-select"
                                                value={this.state.nationality}
                                                onChange={(e) => this.setState({nationality: e.target.value})}
                                            >
                                                {Object.entries(this.state.nationalities).map(([key, value]) => {
                                                    return(
                                                    <MenuItem key={key} value={value.nationality_title}>
                                                            <div className='all-time-option-box-component-nationality-item'>
                                                                <img src={value.nationality_flag} />
                                                                <div className='all-time-option-box-component-nationality-item-text'>{value.nationality_title}</div>
                                                            </div>
                                                    </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className='all-time-option-box'>
                                    <div className='all-time-option-box-text'>Number of drivers: {this.state.range}</div>
                                    <div className='all-time-option-box-component'>
                                        <FormControl fullWidth>
                                            <Select
                                                id="demo-simple-select"
                                                value={this.state.range}
                                                onChange={(e) => this.setState({range: e.target.value})}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={7}>7</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className='all-time-option-box'>
                                <div className='all-time-option-box-text'>Range Date</div>
                                <div className='all-time-option-box-component'>
                                    <LocalizationProvider className='all-time-option-box-component-date' dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            openTo="year"
                                            disableFuture={true}
                                            label="From"
                                            value={this.state.first_date}
                                            onChange={(newValue) => this.setState({first_date: newValue})}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider className='all-time-option-box-component-date' dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            openTo="year"
                                            disableFuture={true}
                                            label="To"
                                            value={this.state.second_date}
                                            onChange={(newValue) => this.setState({second_date: newValue})}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider className='all-time-option-box-component-date' dateAdapter={AdapterMoment}>
                                        <YearCalendar
                                            /* onChange={(newValue) => this.setState({second_date: newValue})} */
                                            onChange={(newValue) => console.log(newValue)}
                                            minDate={moment(new Date(1950, 1, 1))}
                                            maxDate={moment(new Date())}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className='all-time-option-box'>
                                {/* <div className='all-time-option-box-text'>Filter: {this.state.filter_type}</div> */}
                                <div className='all-time-option-box-text'>Filter: {this.state.filter_type.charAt(0).toUpperCase() + this.state.filter_type.slice(1)}</div>
                                <div className='all-time-option-box-component'>
                                    <FormControl fullWidth>
                                        <Select
                                            id="demo-simple-select"
                                            value={this.state.filter_type}
                                            onChange={(e) => this.setState({filter_type: e.target.value})}
                                        >
                                            <MenuItem value={'titles'}>Titles</MenuItem>
                                            <MenuItem value={'poles'}>Poles</MenuItem>
                                            <MenuItem value={'wins'}>Wins</MenuItem>
                                            <MenuItem value={'podiums'}>Podiums</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='all-time-option-box'>
                                <div className='all-time-option-box-text'>Absolute</div>
                                <div className='all-time-option-box-component'>option component</div>
                            </div>
                        </div>
                        <div className='all-time-main-button'>SEARCH</div>
                        <div className='all-time-charts'>
                            {this.state.drivers_filtered.slice(0, this.state.range).map((driver, index) => {
                                return(
                                    <div className='all-time-chart-box' style={{width: "calc(100% / " + this.state.range + ")"}}>
                                        <div className='all-time-chart-box-info'>
                                            <div className='all-time-chart-box-info-photo' style={{backgroundImage: "url(" + image_test.default + ")"}}></div>
                                            <div className='all-time-chart-box-info-text'>Driver Name</div>
                                        </div>
                                        <div className='all-time-chart-details'>CHART</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AllTime;