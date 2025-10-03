import React from 'react';
import '../../css/constructors.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ResponsivePie } from '@nivo/pie';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

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

function replace_underscore(text) {
	return text.replace(/_/g, ' ');
}

class Constructors extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter_type: 'title',
			first_date: moment(new Date(1950, 1, 1)),
			second_date: moment(new Date(2022, 1, 1)),
			selected_years: [],
			constructors: [],
			constructors_filtered: [],
			chart_max_value: 100,
			on_hover_value: 'ferrari'
		};

		this.load_constructors = this.load_constructors.bind(this);
		this.search_constructors = this.search_constructors.bind(this);

		this.load_constructors();
	}

	load_constructors() {
		fetch('/get-constructors-stats')
			.then(response => response.json())
			.then(data => {
				this.setState({ constructors_filtered: data.constructors });
				this.setState({ constructors: data.constructors });
				this.search_constructors();
			});
	}

	search_constructors() {
		let constructors_list = JSON.parse(JSON.stringify([...this.state.constructors]));

		let first_year = this.state.first_date._d.getFullYear();
		let second_year = this.state.second_date._d.getFullYear();
		// Create a range of years between first_year and second_year
		let selected_years = [];
		for (let i = first_year; i <= second_year; i++) {
			selected_years.push(i);
		}

		let max_value = 0;
		let range_date_list = [];
		for (let i = 0; i < constructors_list.length; i++) {
			let constructor = constructors_list[i];

			if ('seasons_results' in constructor && constructor['seasons_results']) {
				let seasons_list = Object.keys(constructor['seasons_results']);
				seasons_list = seasons_list.map(season => parseInt(season));

				let intersection = selected_years.filter(year => seasons_list.includes(year));

				let new_seasons_results = {};
				intersection.forEach(year => {
					new_seasons_results[year] = constructor['seasons_results'][year];
				});
				constructor['seasons_results'] = new_seasons_results;

				if (intersection.length > 0) range_date_list.push(constructor);
			}
		}

		range_date_list = range_date_list.filter(constructor => Object.keys(constructor['seasons_results']).length > 0);
		// If the sum inside each year from constructor['seasons_results'] equals zero, then remove constructor from list

		let max_pilots_value = 0;
		range_date_list = range_date_list.filter(constructor => {
			let seasons_results = constructor['seasons_results'];
			let sum = 0;
			let pilots_stats = {};
			Object.keys(seasons_results).forEach(year => {
				sum += seasons_results[year][this.state.filter_type];
				
				if(!(this.state.filter_type === 'title')){
					let pilots_dict = seasons_results[year]['pilots_' + this.state.filter_type]
					Object.keys(pilots_dict).forEach(pilot => {
						if(pilot in pilots_stats){
							pilots_stats[pilot] += pilots_dict[pilot];
						}else if(pilots_dict[pilot] > 0){
							pilots_stats[pilot] = pilots_dict[pilot];
						}
					});
				} else {
					let pilots_dict = seasons_results[year]['pilots_wins']
					Object.keys(pilots_dict).forEach(pilot => {
						if(pilot in pilots_stats && seasons_results[year]['title'] === 1){
							pilots_stats[pilot] += 1;
						}else if(seasons_results[year]['title'] === 1){
							pilots_stats[pilot] = 1;
						}
					});
				}
				
			});
			max_value = Math.max(max_value, sum);

			constructor['id'] = constructor['constructorId'];
			constructor['label'] = constructor['name'];
			constructor['value'] = sum;
			constructor['color'] = constructor['id'] in colors_dict ? colors_dict[constructor['id']] : create_random_color();
			constructor['children'] = [];
			let children_temporary = [];

			Object.keys(pilots_stats).forEach(pilot => {
				children_temporary.push({
					'id': pilot,
					'label': pilot,
					'value': pilots_stats[pilot],
					'color': constructor['color'],
					'constructorId': constructor['constructorId']
				});
			});

			// Get only the 5 pilots with the highest values
			children_temporary = children_temporary.sort((a, b) => b['value'] - a['value']);
			children_temporary = children_temporary.slice(0, 5);
			constructor['children'] = children_temporary;

			if (sum > 0) {
				max_pilots_value = Math.max(max_pilots_value, constructor['children'].length);
			}

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

		this.setState({
			constructors_filtered: range_date_list,
			chart_max_value: max_value,
			selected_years: selected_years
		});
	}

	render() {
		if (this.state.constructors.length === 0) {
			return (
				<Backdrop open={true}>
					<CircularProgress color='inherit' />
				</Backdrop>
			);
		} else {
			let image_test = require(`../../img/f1_background_ferrari_2.webp`);

			let colors_list = this.state.constructors_filtered.map(constructor => constructor['color']);
			let pilots_colors_list = [];
			let pilots_list = [];
			try {
				let filter_by = this.state.constructors_filtered.filter(item => item['constructorId'] === this.state.on_hover_value)

				pilots_list = filter_by[0]['children'];

				let pilots_color = filter_by[0]['color'];
				
				// Make a list with different tinalities from pilots_colors_list
				for (let i = 0; i < 5; i++) {
					let color = pilots_color;
					color = color.replace('#', '');
					let r = parseInt(color.substring(0, 2), 16);
					let g = parseInt(color.substring(2, 4), 16);
					let b = parseInt(color.substring(4, 6), 16);
					r = Math.min(255, r + 20 * i);
					g = Math.min(255, g + 20 * i);
					b = Math.min(255, b + 20 * i);
					let new_color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
					pilots_colors_list.push(new_color);
				}
				// Replace the first color with the original color
				pilots_colors_list[0] = pilots_color;

			} catch (error) {}

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
											<div id='constructor-date-picker-from'>
												<DatePicker
													disableFuture={true}
													label='From'
													views={['year']}
													minDate={moment(new Date(1950, 1, 1))}
													maxDate={moment(new Date(2022, 1, 1))}
													value={this.state.first_date}
													onChange={newValue => this.setState({ first_date: newValue })}
												/>
											</div>
											<div id='constructor-date-picker-to'>
												<DatePicker
													disableFuture={true}
													label='To'
													views={['year']}
													minDate={moment(new Date(1950, 1, 1))}
													maxDate={moment(new Date(2022, 1, 1))}
													value={this.state.second_date}
													onChange={newValue => this.setState({ second_date: newValue })}
												/>
											</div>
										</DemoContainer>
									</LocalizationProvider>
								</div>
							</div>
							<div className='constructors-options-column-1'>
								<div className='constructors-option-box' id='constructors-accomplishments-select-container'>
									<div className='constructors-option-box-text'>
										Filter: {this.state.filter_type.charAt(0).toUpperCase() + this.state.filter_type.slice(1)}
									</div>
									<div className='constructors-option-box-component'>
										<FormControl fullWidth>
											<Select
												id='constructors-accomplishments-select'
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
						<div className='constructors-search-button' onClick={this.search_constructors}>
							SEARCH
						</div>
						<div className='constructors-charts-container'>
							<div className='constructors-chart'>
								<div></div>
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
									onMouseEnter={(e) => {
										this.setState({ on_hover_value: e.id });
									}}
								/>
							</div>
							<div className='constructors-chart'>
								<div className='constructors-chart-footer-note'>{this.state.filter_type === 'title' ? "Drivers' that won the Constructors' Championship" : ""}</div>
								<ResponsivePie
									data={pilots_list}
									colors={pilots_colors_list}
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
									arcLinkLabel={e => replace_underscore(e.label)}
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
												<div className='constructors-chart-tooltip-name'>{replace_underscore(t.label)}:</div>
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
