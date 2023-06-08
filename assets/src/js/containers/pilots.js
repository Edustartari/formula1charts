import React from 'react';
import '../../css/pilots.css';
import Image from '../components/image.js';
import _ from "lodash";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

class Pilots extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            age: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            age: event.target.value
        });
    }

    // Add several filters to help usrs interact with charts???
    // For example: select all pilots with 2 titles
    // For example: select all pilots from the 1980s
    // For example: select all pilots from specific country

    render(){
        let image_test = require(`../../img/f1_background_ferrari_2.jpg`);
        console.log(image_test)
        return(
            <div className='pilots-desktop-container'>
                <div className='pilots-desktop-menu'>
                    <div className='pilots-desktop-menu-button'>
                        TOGGLE OPTION
                    </div>
                </div>
                <div className='pilots-desktop-photos-list'>
                    <div className='pilots-desktop-photo-card'>
                        <img src={image_test.default} />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={this.state.age}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='pilots-desktop-photo-card'>
                        <img src={image_test.default} />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={this.state.age}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='pilots-desktop-photo-card'>
                        <img src={image_test.default} />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={this.state.age}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='pilots-desktop-photo-card'>
                        <img src={image_test.default} />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={this.state.age}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='pilots-desktop-photo-card'>
                        <img src={image_test.default} />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={this.state.age}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='pilots-desktop-chart'>CHART ONE</div>
                <div className='pilots-desktop-chart'>CHART TWO</div>
            </div>
        )
    }
}

export default Pilots;