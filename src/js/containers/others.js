import React from 'react';
import '../../css/others.css';
import Image from '../components/image.js';
import _ from 'lodash';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ResponsiveWaffle } from '@nivo/waffle'
import Switch from '@mui/material/Switch';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Tooltip from '@mui/material/Tooltip';
import countries_colors from '../components/countries_colors.js';


import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

let data = [
	{
	  "id": "cats",
	  "label": "Cats",
	  "value": 28.460355251565687
	},
	{
	  "id": "dogs",
	  "label": "Dogs",
	  "value": 25.101893575150154
	},
	{
	  "id": "rabbits",
	  "label": "Rabits",
	  "value": 5.900944133628169
	}
  ]

class Others extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			range: 5,
			nationality: 'World',
			filter_type: 'title',
			first_date: moment(new Date(1950, 1, 1)),
			second_date: moment(new Date(2022, 1, 1)),
			drivers: [],
			drivers_filtered: [],
			drivers_filtered_by_type: [],
			nationalities: {},
			chart_max_value: 100
		};

		this.load_drivers = this.load_drivers.bind(this);
		this.load_nationalities = this.load_nationalities.bind(this);
		this.search_drivers = this.search_drivers.bind(this);

		this.load_nationalities();
		this.load_drivers();
	}

	load_nationalities() {
		fetch('/load-nationalities')
			.then(response => response.json())
			.then(data => {
				this.setState({ nationalities: data.nationalities });
			});
	}

	load_drivers() {
		fetch('/pilots-complete-info')
			.then(response => response.json())
			.then(data => {
				this.setState({ drivers_filtered: data.drivers });
				this.setState({ drivers: data.drivers });
				this.search_drivers();
			});
	}

	search_drivers() {
		let drivers_list = JSON.parse(JSON.stringify([...this.state.drivers]));
		let new_list = [];
		if (this.state.nationality === 'World') {
			new_list = drivers_list;
		} else {
			for (let i = 0; i < drivers_list.length; i++) {
				let driver = drivers_list[i];
				let has_nationality = driver['nationality'] && driver['nationality']['nationality_title'] === this.state.nationality;
				if (has_nationality) new_list.push(driver);
			}
		}

		let first_year = this.state.first_date._d.getFullYear();
		let second_year = this.state.second_date._d.getFullYear();
		// Create a range of years between first_year and second_year
		let selected_years = [];
		for (let i = first_year; i <= second_year; i++) {
			selected_years.push(i);
		}

		let range_date_list_all = [];
		for (let i = 0; i < new_list.length; i++) {
			let driver = new_list[i];

			if ('seasons_results' in driver && driver['seasons_results']) {
				let seasons_list = Object.keys(driver['seasons_results']);
				seasons_list = seasons_list.map(season => parseInt(season));

				let intersection = _.intersectionWith(selected_years, seasons_list, _.isEqual);

				let new_seasons_results = {};
				intersection.forEach(year => {
					new_seasons_results[year] = driver['seasons_results'][year];
				});
				driver['seasons_results'] = new_seasons_results;

				if (intersection.length > 0) range_date_list_all.push(driver);
			}
		}

		let range_date_list_by_filter = range_date_list_all.filter(driver => Object.keys(driver['seasons_results']).length > 0);
		// If the sum inside each year from driver['seasons_results'] equals zero, then remove driver from list
		let max_value = 0;
		let filters_list = ['title', 'wins', 'poles', 'podiums'];
		range_date_list_by_filter = range_date_list_by_filter.filter(driver => {
			let seasons_results = driver['seasons_results'];
			let sum = 0;
			Object.keys(seasons_results).forEach(year => {
				sum += seasons_results[year][this.state.filter_type];
			});
			max_value = Math.max(max_value, sum);
			for (let filter of filters_list) {
				if (!(this.state.filter_type === filter)) {
					let sum_temp = 0;
					Object.keys(seasons_results).forEach(year => {
						sum_temp += seasons_results[year][filter];
					});
					max_value = Math.max(max_value, sum_temp);
				}
			}
			return sum > 0;
		});
		// Round the chart_max_value to the nearest 10
		max_value = Math.ceil(max_value / 10) * 10;

		
		let nationality_temp_all = {};
		for (let i = 0; i < range_date_list_all.length; i++) {
			let nationality = range_date_list_all[i]['nationality']['nationality_acronym'];
			if (nationality === 'GDR' || nationality === 'FRG'){
				nationality = 'GER'
			}
			if (!nationality) continue;
			if (nationality in nationality_temp_all){
				nationality_temp_all[nationality] += 1;
			} else {
				nationality_temp_all[nationality] = 1;
			}
		}
		
		let nationality_temp_by_filter = {};
		for (let i = 0; i < range_date_list_by_filter.length; i++) {
			let nationality = range_date_list_by_filter[i]['nationality']['nationality_acronym'];
			if (nationality === 'GDR' || nationality === 'FRG'){
				nationality = 'GER'
			}
			if (!nationality) continue;
			if (nationality in nationality_temp_by_filter){
				nationality_temp_by_filter[nationality] += 1;
			} else {
				nationality_temp_by_filter[nationality] = 1;
			}
		}
		
		// Put all the keys in an array and sort it by the values
		let nationality_all = [];
		Object.keys(nationality_temp_all).forEach(item => {
			nationality_all.push({
				id: item,
				label: this.state.nationalities[item]['nationality_title'],
				value: nationality_temp_all[item]
			})
		});

		let nationality_by_filter = [];
		Object.keys(nationality_temp_by_filter).forEach(item => {
			nationality_by_filter.push({
				id: item,
				label: this.state.nationalities[item]['nationality_title'],
				value: nationality_temp_by_filter[item]
			})
		});

		// Sort the array by the values
		nationality_all = nationality_all.sort((a, b) => {
			if ( a.value < b.value ){
				return 1;
			}
			if ( a.value > b.value ){
				return -1;
			}
			return 0;
		});

		nationality_by_filter = nationality_by_filter.sort((a, b) => {
			if ( a.value < b.value ){
				return 1;
			}
			if ( a.value > b.value ){
				return -1;
			}
			return 0;
		});

		this.setState({
			drivers_filtered: nationality_all,
			drivers_filtered_by_type: nationality_by_filter,
			chart_max_value: max_value
		});
	}

	render() {
		if (this.state.drivers.length === 0 || Object.keys(this.state.nationalities).length === 0) {
			return (
				<Backdrop open={true}>
					<CircularProgress color='inherit' />
				</Backdrop>
			);
		} else {
			let image_test = require(`../../img/f1_background_ferrari_2.webp`);

			return (
				<div className='others-background'>
					<div className='others-main-container'>
						<div className='others-main-title'>Others</div>
						<div className='others-options'>
							<div className='others-option-box'>
								<div className='others-option-box-text'>Range Date</div>
								<div className='others-option-box-component'>
									<LocalizationProvider dateAdapter={AdapterMoment}>
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												disableFuture={true}
												label='From'
												views={['year']}
												minDate={moment(new Date(1950, 1, 1))}
												maxDate={moment(new Date(2022, 1, 1))}
												value={this.state.first_date}
												onChange={newValue => this.setState({ first_date: newValue })}
											/>
											<DatePicker
												disableFuture={true}
												label='To'
												views={['year']}
												minDate={moment(new Date(1950, 1, 1))}
												maxDate={moment(new Date(2022, 1, 1))}
												value={this.state.second_date}
												onChange={newValue => this.setState({ second_date: newValue })}
											/>
										</DemoContainer>
									</LocalizationProvider>
								</div>
							</div>
							<div className='others-option-box'>
								<div className='others-option-box-text'>
									Filter: {this.state.filter_type.charAt(0).toUpperCase() + this.state.filter_type.slice(1)}
								</div>
								<div className='others-option-box-component'>
									<FormControl fullWidth>
										<Select
											id='demo-simple-select'
											value={this.state.filter_type}
											onChange={e => this.setState({ filter_type: e.target.value })}
										>
											<MenuItem value={'title'}>Titles</MenuItem>
											<MenuItem value={'wins'}>Wins</MenuItem>
											<MenuItem value={'poles'}>Poles</MenuItem>
											<MenuItem value={'podiums'}>Podiums</MenuItem>
										</Select>
									</FormControl>
								</div>
							</div>
						</div>
						<div className='others-main-button' onClick={this.search_drivers}>
							SEARCH
						</div>
						<div className='others-charts-container'>
							<div className='others-chart'>
								<div className='others-chart-text'>Total drivers between period {this.state.first_date._d.getFullYear()} - {this.state.second_date._d.getFullYear()}</div>
								<ResponsiveWaffle
									data={this.state.drivers_filtered}
									total={this.state.drivers_filtered.reduce((acc, item) => acc + item.value, 0)}
									colors={{ scheme: 'paired' }}
									// colors={colors_list}
									rows={35}
									columns={20}
									padding={1}
									fillDirection="bottom"
									valueFormat=".2f"
									margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
									borderRadius={3}
									borderColor={{
										from: 'color',
										modifiers: [
											[
												'darker',
												0.3
											]
										]
									}}
									motionStagger={2}
									legends={[
										{
											anchor: 'top-left',
											direction: 'column',
											justify: false,
											translateX: -60,
											translateY: 0,
											itemsSpacing: 4,
											itemWidth: 100,
											itemHeight: 20,
											itemDirection: 'left-to-right',
											itemOpacity: 1,
											itemTextColor: '#777',
											symbolSize: 20,
											effects: [
												{
													on: 'hover',
													style: {
														itemTextColor: '#000',
														itemBackground: '#f7fafb'
													}
												}
											]
										}
									]}
								/>
							</div>
							<div className='others-chart'>
								<div className='others-chart-text'>Total drivers with {this.state.filter_type} for each country</div>
								<ResponsiveWaffle
									data={this.state.drivers_filtered_by_type}
									total={this.state.drivers_filtered_by_type.reduce((acc, item) => acc + item.value, 0)}
									colors={{ scheme: 'paired' }}
									rows={35}
									columns={20}
									padding={1}
									fillDirection="bottom"
									valueFormat=".2f"
									margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
									borderRadius={3}
									borderColor={{
										from: 'color',
										modifiers: [
											[
												'darker',
												0.3
											]
										]
									}}
									motionStagger={2}
									legends={[
										{
											anchor: 'top-left',
											direction: 'column',
											justify: false,
											translateX: -60,
											translateY: 0,
											itemsSpacing: 4,
											itemWidth: 100,
											itemHeight: 20,
											itemDirection: 'left-to-right',
											itemOpacity: 1,
											itemTextColor: '#777',
											symbolSize: 20,
											effects: [
												{
													on: 'hover',
													style: {
														itemTextColor: '#000',
														itemBackground: '#f7fafb'
													}
												}
											]
										}
									]}
								/>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Others;
