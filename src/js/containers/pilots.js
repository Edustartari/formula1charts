import React from 'react';
import '../../css/pilots.css';
import Image from '../components/image.js';
import _ from 'lodash';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResponsiveRadar } from '@nivo/radar';
import Switch from '@mui/material/Switch';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FuzzySearch from 'fuzzy-search';

// const drivers = content.drivers;

function PilotsOverlay(props) {
	const [driver_name, set_driver_name] = React.useState('');
	const [filtered_driver, set_filtered_driver] = React.useState('');
	const [filtered_list, set_filtered_list] = React.useState(props.drivers);

	function filter_driver(value) {
		console.log('');
		console.log('value: ', value);

		let drivers_list = props.drivers;

		if (value.length > 0) {
			let searcher = new FuzzySearch(props.drivers, ['name'], { caseSensitive: false });
			drivers_list = searcher.search(value);
		}
		set_filtered_list(drivers_list);
		set_driver_name(value);
		console.log('drivers_list: ', drivers_list);
	}

	function close_dialog(confirm) {
		console.log('');
		console.log('close_dialog');
		console.log('confirm: ', confirm);
		if (confirm) {
			props.select_driver(props.open_dialog, filtered_driver);
		}
		props.handle_change('open_dialog', false);
		set_driver_name('');
		set_filtered_driver('');
		set_filtered_list(props.drivers);
	}

	console.log('filtered_driver: ', filtered_driver);

	return (
		<Dialog className='pilots-dialog' onClose={() => close_dialog(false)} open={props.open_dialog.length > 0 ? true : false}>
			<div className='pilots-overlay'>
				<div className='pilots-overlay-title'>Select driver:</div>
				<TextField
					value={driver_name}
					id='standard-basic'
					label='Driver Name'
					variant='standard'
					onChange={event => filter_driver(event.target.value)}
				/>
				<div className='pilots-overlay-input'>
					{filtered_list.length > 0 && (
						<div className='pilots-overlay-input-filter'>
							{filtered_list.map(driver => {
								return (
									<div
										key={driver['id']}
										className='pilots-overlay-input-item'
										onClick={() => set_filtered_driver(driver)}
										style={{ backgroundColor: filtered_driver['id'] === driver['id'] ? '#8baaff' : '' }}
									>
										{driver['name']}
									</div>
								);
							})}
						</div>
					)}
				</div>
				<div className='pilots-overlay-button-container'>
					<div
						className='pilots-overlay-button-erase'
						onClick={() => {
							set_filtered_list(props.drivers), set_filtered_driver(''), set_driver_name('');
						}}
					>
						ERASE
					</div>
					<div className='pilots-overlay-button' onClick={() => close_dialog(true)}>
						CONFIRM
					</div>
				</div>
			</div>
		</Dialog>
	);
}

class Pilots extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			drivers: [],
			driver_1: {},
			driver_2: {},
			driver_3: {},
			driver_4: {},
			driver_5: {},
			radar_list_absolute: [],
			radar_list_percentage: [],
			toggle_option: 'absolute',
			open_dialog: false
		};
		this.select_driver = this.select_driver.bind(this);
		this.load_content = this.load_content.bind(this);
		this.handle_change = this.handle_change.bind(this);

		this.load_content();
	}

	handle_change(key, value) {
		this.setState({ [key]: value });
	}

	load_content() {
		fetch('/pilots-list')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({ drivers: data.drivers });
				console.log('finish fetch...');
				console.log(this.state.drivers);

				let drivers_list = _.filter(this.state.drivers, function (o) {
					return o.wins > 0;
				});
				let random_drivers = _.sampleSize(drivers_list, 5);
				for (let i = 0; i < random_drivers.length; i++) {
					this.select_driver('driver_' + (i + 1), random_drivers[i]);
				}
				this.setState({ loading: false });
			});
	}

	select_driver(key, value) {
		console.log('');
		console.log('select_driver');
		console.log('key: ', key);
		console.log('value: ', value);
		let driver_id = value.id;
		let current_driver = this.state[key];
		console.log('this.state.drivers: ', this.state.drivers);
		let selected_driver = _.find(this.state.drivers, { id: driver_id });
		console.log('selected_driver: ', selected_driver);
		this.setState({ [key]: selected_driver });

		let temporary_radar_list_absolute = this.state.radar_list_absolute;
		let temporary_radar_list_percentage = this.state.radar_list_percentage;

		// Remove the keys in which the driver with the current key appears from the radar_list_absolute
		for (let item of temporary_radar_list_absolute) {
			if (current_driver['name'] in item) {
				delete item[current_driver['name']];
			}
		}
		for (let item of temporary_radar_list_percentage) {
			if (current_driver['name'] in item) {
				delete item[current_driver['name']];
			}
		}

		let driver_dict = {
			absolute: {
				total_seasons: selected_driver.total_seasons,
				titles: selected_driver.titles,
				// 'races': selected_driver.races,
				poles: selected_driver.poles,
				wins: selected_driver.wins,
				podiums: selected_driver.podiums
			},
			percentage: {
				titles_percentage: selected_driver.titles_percentage,
				poles_percentage: selected_driver.poles_percentage,
				wins_percentage: selected_driver.wins_percentage,
				podiums_percentage: selected_driver.podiums_percentage
			}
		};

		if (temporary_radar_list_absolute.length === 0) {
			for (const [key, value] of Object.entries(driver_dict['absolute'])) {
				temporary_radar_list_absolute.push({
					absolute: key,
					[selected_driver.name]: value
				});
			}
			for (const [key, value] of Object.entries(driver_dict['percentage'])) {
				temporary_radar_list_percentage.push({
					percentage: key,
					[selected_driver.name]: value
				});
			}
		} else {
			for (let item of temporary_radar_list_absolute) {
				if (item['absolute'] in driver_dict['absolute']) {
					item[selected_driver.name] = driver_dict['absolute'][item['absolute']];
				}
			}
			for (let item of temporary_radar_list_percentage) {
				if (item['percentage'] in driver_dict['percentage']) {
					item[selected_driver.name] = driver_dict['percentage'][item['percentage']];
				}
			}
		}

		this.setState({
			radar_list_absolute: temporary_radar_list_absolute,
			radar_list_percentage: temporary_radar_list_percentage
		});
	}

	// Add several filters to help usrs interact with charts???
	// For example: select all pilots with 2 titles
	// For example: select all pilots from the 1980s
	// For example: select all pilots from specific country

	render() {
		let image_test = require(`../../img/f1_background_ferrari_2.webp`);
		let driver_1_image = '';
		let driver_2_image = '';
		let driver_3_image = '';
		let driver_4_image = '';
		let driver_5_image = '';
		try {
			driver_1_image = require(`../../img/${this.state.driver_1.image}`);
		} catch (error) {
			driver_1_image = require(`../../img/default_image.webp`);
		}
		try {
			driver_2_image = require(`../../img/${this.state.driver_2.image}`);
		} catch (error) {
			driver_2_image = require(`../../img/default_image.webp`);
		}
		try {
			driver_3_image = require(`../../img/${this.state.driver_3.image}`);
		} catch (error) {
			driver_3_image = require(`../../img/default_image.webp`);
		}
		try {
			driver_4_image = require(`../../img/${this.state.driver_4.image}`);
		} catch (error) {
			driver_4_image = require(`../../img/default_image.webp`);
		}
		try {
			driver_5_image = require(`../../img/${this.state.driver_5.image}`);
		} catch (error) {
			driver_5_image = require(`../../img/default_image.webp`);
		}

		const theme = {
			fontSize: '16px'
		};
		console.log('driver_1_image: ', driver_1_image);

		if (this.state.loading) {
			return (
				<Backdrop open={this.state.loading}>
					<CircularProgress color='inherit' />
				</Backdrop>
			);
		} else {
			return (
				<div className='pilots-desktop-container'>
					<div className='pilots-desktop-menu'>
						<div
							className='pilots-desktop-menu-button'
							onClick={() =>
								this.setState({ toggle_option: this.state.toggle_option === 'absolute' ? 'percentage' : 'absolute' })
							}
							style={this.state.toggle_option === 'absolute' ? {} : { backgroundColor: '#ffcccc', borderColor: '#ff9292' }}
						>
							{this.state.toggle_option === 'percentage' && 'Percentage'}
							<Switch checked={this.state.toggle_option === 'absolute' ? true : false} />
							{this.state.toggle_option === 'absolute' && 'Absolute'}
						</div>
					</div>
					<div className='pilots-desktop-photos-list'>
						<div className='pilots-desktop-photo-card' onClick={() => this.setState({ open_dialog: 'driver_1' })}>
							<img src={driver_1_image.default} />
							<div className='pilots-desktop-photo-card-title'>
								<div className='pilots-desktop-photo-card-title-text'>{this.state.driver_1['name']}</div>
								<span className='material-icons'>expand_more</span>
							</div>
						</div>
						<div className='pilots-desktop-photo-card' onClick={() => this.setState({ open_dialog: 'driver_2' })}>
							<img src={driver_2_image.default} />
							<div className='pilots-desktop-photo-card-title'>
								<div className='pilots-desktop-photo-card-title-text'>{this.state.driver_2['name']}</div>
								<span className='material-icons'>expand_more</span>
							</div>
						</div>
						<div className='pilots-desktop-photo-card' onClick={() => this.setState({ open_dialog: 'driver_3' })}>
							<img src={driver_3_image.default} />
							<div className='pilots-desktop-photo-card-title'>
								<div className='pilots-desktop-photo-card-title-text'>{this.state.driver_3['name']}</div>
								<span className='material-icons'>expand_more</span>
							</div>
						</div>
						<div className='pilots-desktop-photo-card' onClick={() => this.setState({ open_dialog: 'driver_4' })}>
							<img src={driver_4_image.default} />
							<div className='pilots-desktop-photo-card-title'>
								<div className='pilots-desktop-photo-card-title-text'>{this.state.driver_4['name']}</div>
								<span className='material-icons'>expand_more</span>
							</div>
						</div>
						<div className='pilots-desktop-photo-card' onClick={() => this.setState({ open_dialog: 'driver_5' })}>
							<img src={driver_5_image.default} />
							<div className='pilots-desktop-photo-card-title'>
								<div className='pilots-desktop-photo-card-title-text'>{this.state.driver_5['name']}</div>
								<span className='material-icons'>expand_more</span>
							</div>
						</div>
					</div>
					<div className='pilots-desktop-chart'>
						<div className='pilots-desktop-chart-details'>
							<ResponsiveRadar
								data={
									this.state.toggle_option === 'absolute'
										? this.state.radar_list_absolute
										: this.state.radar_list_percentage
								}
								keys={[
									this.state.driver_1['name'],
									this.state.driver_2['name'],
									this.state.driver_3['name'],
									this.state.driver_4['name'],
									this.state.driver_5['name']
								]}
								indexBy={this.state.toggle_option === 'absolute' ? 'absolute' : 'percentage'}
								valueFormat='>-.0f'
								margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
								borderColor={{ from: 'color', modifiers: [] }}
								gridLevels={6}
								gridLabelOffset={36}
								dotColor={{ from: 'color', modifiers: [] }}
								dotBorderWidth={2}
								dotBorderColor={{ from: 'color', modifiers: [] }}
								colors={{ scheme: 'category10' }}
								blendMode='multiply'
								motionConfig={{
									mass: 1,
									tension: 171,
									friction: 26,
									clamp: false,
									precision: 0.01,
									velocity: 0
								}}
								legends={[
									{
										anchor: 'top-left',
										direction: 'column',
										translateX: -50,
										translateY: -40,
										itemWidth: 80,
										itemHeight: 20,
										itemTextColor: '#999',
										symbolSize: 12,
										symbolShape: 'circle',
										effects: [
											{
												on: 'hover',
												style: {
													itemTextColor: '#000'
												}
											}
										]
									}
								]}
								theme={theme}
							/>
							{this.state.toggle_option === 'percentage' && (
								<div className='pilots-desktop-chart-details-note'>
									Titles: according to total seasons disputed
									<br />
									Wins, podiums and poles: according to total races
								</div>
							)}
						</div>
					</div>
					<div className='pilots-desktop-chart'>CHART TWO</div>
					<PilotsOverlay handle_change={this.handle_change} select_driver={this.select_driver} {...this.state} />
				</div>
			);
		}
	}
}

export default Pilots;
