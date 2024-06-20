import React from 'react';
import '../../css/constructors.css';
import Image from '../components/image.js';
import _ from 'lodash';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResponsiveBump } from '@nivo/bump';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Tooltip from '@mui/material/Tooltip';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

const colors_dict = {
	ferrari: '#db4848',
	williams: '#0082FA',
	mclaren: '#FF8700',
	mercedes: '#00D2BE',
	red_bull: '#4662ff',
	team_lotus: '#FFD700',
	'brabham-repco': '#00A550',
	renault: '#FFF500',
	benetton: '#0060B1',
	tyrrell: '#800080',
	alfa: '#900000'
};

function create_random_color() {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

class Constructors extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			filter_type: 'title',
			first_date: moment(new Date(1950, 1, 1)),
			second_date: moment(new Date(2022, 1, 1)),
			selected_years: [],
			constructors: [],
			constructors_filtered: [],
			chart_max_value: 100
		};

		this.load_constructors = this.load_constructors.bind(this);
		this.search_constructors = this.search_constructors.bind(this);

		this.load_constructors();
	}

	load_constructors() {
		fetch('/get-constructors-stats')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({ constructors_filtered: data.constructors });
				this.setState({ constructors: data.constructors });
				console.log('finish fetch get-constructors-stats...');
				console.log(this.state.constructors);
				console.log(this.state.constructors.length);
				this.search_constructors();
				this.setState({ loading: false });
			});
	}

	search_constructors() {
		// console.log('')
		// console.log('searching constructors...')
		let constructors_list = JSON.parse(JSON.stringify([...this.state.constructors]));

		let first_year = this.state.first_date._d.getFullYear();
		let second_year = this.state.second_date._d.getFullYear();
		// Create a range of years between first_year and second_year
		let selected_years = [];
		for (let i = first_year; i <= second_year; i++) {
			selected_years.push(i);
		}
		// console.log('selected_years: ', selected_years)

		let max_value = 0;
		let range_date_list = [];
		for (let i = 0; i < constructors_list.length; i++) {
			let constructor = constructors_list[i];

			// console.log('')
			// console.log('constructor: ', constructor['name'])
			if ('seasons_results' in constructor && constructor['seasons_results']) {
				let seasons_list = Object.keys(constructor['seasons_results']);
				seasons_list = seasons_list.map(season => parseInt(season));
				// console.log('seasons_list: ', seasons_list)

				let intersection = _.intersectionWith(selected_years, seasons_list, _.isEqual);
				// console.log('intersection: ', intersection)

				let new_seasons_results = {};
				intersection.forEach(year => {
					new_seasons_results[year] = constructor['seasons_results'][year];
				});
				// console.log('new_seasons_results: ', new_seasons_results)
				constructor['seasons_results'] = new_seasons_results;

				if (intersection.length > 0) range_date_list.push(constructor);
			}
		}

		range_date_list = range_date_list.filter(constructor => Object.keys(constructor['seasons_results']).length > 0);
		// If the sum inside each year from constructor['seasons_results'] equals zero, then remove constructor from list

		range_date_list = range_date_list.filter(constructor => {
			let seasons_results = constructor['seasons_results'];
			let sum = 0;
			Object.keys(seasons_results).forEach(year => {
				sum += seasons_results[year][this.state.filter_type];
			});
			max_value = Math.max(max_value, sum);

			constructor['id'] = constructor['constructorId'];
			constructor['label'] = constructor['name'];
			constructor['value'] = sum;
			constructor['color'] = constructor['id'] in colors_dict ? colors_dict[constructor['id']] : create_random_color();
			return sum > 0;
		});
		// Round the chart_max_value to the nearest 10
		max_value = Math.ceil(max_value / 10) * 10;

		// Order constructors by the sum of the filter_type
		range_date_list = range_date_list.sort((a, b) => {
			let a_sum = 0;
			let b_sum = 0;
			Object.keys(a['seasons_results']).forEach(year => {
				a_sum += a['seasons_results'][year][this.state.filter_type];
			});
			Object.keys(b['seasons_results']).forEach(year => {
				b_sum += b['seasons_results'][year][this.state.filter_type];
			});
			return b_sum - a_sum;
		});

		// console.log('new_list: ', new_list);
		// console.log('range_date_list: ', range_date_list);
		// console.log('constructors_list: ', constructors_list);
		this.setState({
			constructors_filtered: range_date_list,
			chart_max_value: max_value,
			selected_years: selected_years
		});
	}

	render() {
		if (this.state.constructors.length === 0) {
			return (
				<Backdrop open={this.state.loading}>
					<CircularProgress color='inherit' />
				</Backdrop>
			);
		} else {
			let image_test = require(`../../img/f1_background_ferrari_2.webp`);

			let colors_list = this.state.constructors_filtered.map(constructor => constructor['color']);

			return (
				<div className='constructors-background'>
					<div className='constructors-main-container'>
						<div className='constructors-main-title'>Constructors</div>
						<div className='constructors-options'>
							<div className='constructors-option-box'>
								<div className='constructors-option-box-text'>Range Date</div>
								<div className='constructors-option-box-component'>
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
							<div className='constructors-options-column-1'>
								<div className='constructors-option-box'>
									<div className='constructors-option-box-text'>
										Filter: {this.state.filter_type.charAt(0).toUpperCase() + this.state.filter_type.slice(1)}
									</div>
									<div className='constructors-option-box-component'>
										<FormControl fullWidth>
											<Select
												id='demo-simple-select'
												value={this.state.filter_type}
												onChange={e => this.setState({ filter_type: e.target.value })}
											>
												<MenuItem value={'title'}>Titles</MenuItem>
												<MenuItem value={'wins'}>Wins</MenuItem>
												<MenuItem value={'podiums'}>Podiums</MenuItem>
											</Select>
										</FormControl>
									</div>
								</div>
							</div>
						</div>
						<div className='constructors-main-button' onClick={this.search_constructors}>
							SEARCH
						</div>
						<div className='constructors-charts-container'>
							<div className='constructors-chart'>
								<ResponsivePie
									data={this.state.constructors_filtered}
									colors={colors_list}
									margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
									sortByValue={true}
									innerRadius={0.4}
									cornerRadius={3}
									fit={false}
									activeInnerRadiusOffset={20}
									activeOuterRadiusOffset={20}
									borderWidth={1}
									borderColor={{
										from: 'color',
										modifiers: [['darker', '0.2']]
									}}
									arcLinkLabel={e => e.label}
									arcLinkLabelsSkipAngle={10}
									arcLinkLabelsTextColor='#333333'
									arcLinkLabelsThickness={4}
									arcLinkLabelsColor={{ from: 'color' }}
									arcLabelsSkipAngle={10}
									arcLabelsTextColor='black'
									defs={[
										{
											id: 'dots',
											type: 'patternDots',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											size: 4,
											padding: 1,
											stagger: true
										},
										{
											id: 'lines',
											type: 'patternLines',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											rotation: -45,
											lineWidth: 6,
											spacing: 10
										}
									]}
									legends={[]}
									tooltip={e => {
										let { datum: t } = e;
										return (
											<div className='constructors-chart-tooltip'>
												<div className='constructors-chart-tooltip-name'>{t.label}:</div>
												<div className='constructors-chart-tooltip-value'>{t.value}</div>
											</div>
										);
									}}
								/>
							</div>
							<div className='constructors-chart'>
								<ResponsivePie
									data={this.state.constructors_filtered}
									colors={colors_list}
									margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
									sortByValue={true}
									innerRadius={0.4}
									cornerRadius={3}
									fit={false}
									activeInnerRadiusOffset={20}
									activeOuterRadiusOffset={20}
									borderWidth={1}
									borderColor={{
										from: 'color',
										modifiers: [['darker', '0.2']]
									}}
									arcLinkLabel={e => e.label}
									arcLinkLabelsSkipAngle={10}
									arcLinkLabelsTextColor='#333333'
									arcLinkLabelsThickness={4}
									arcLinkLabelsColor={{ from: 'color' }}
									arcLabelsSkipAngle={10}
									arcLabelsTextColor='black'
									defs={[
										{
											id: 'dots',
											type: 'patternDots',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											size: 4,
											padding: 1,
											stagger: true
										},
										{
											id: 'lines',
											type: 'patternLines',
											background: 'inherit',
											color: 'rgba(255, 255, 255, 0.3)',
											rotation: -45,
											lineWidth: 6,
											spacing: 10
										}
									]}
									legends={[]}
									tooltip={e => {
										let { datum: t } = e;
										return (
											<div className='constructors-chart-tooltip'>
												<div className='constructors-chart-tooltip-name'>{t.label}:</div>
												<div className='constructors-chart-tooltip-value'>{t.value}</div>
											</div>
										);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Constructors;
