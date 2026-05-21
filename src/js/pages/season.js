import React from 'react';
import '../../css/season.css';
import { ResponsiveBump } from '@nivo/bump';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

class Season extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 0
		};
	}

	handleChange = (event, newValue) => {
		this.setState({ tab: newValue });
	}

	render() {
		let image;
		try {
			image = require(`../../img/season_` + content.year + `_car.webp`);
		} catch (error) {
			image = require(`../../img/f1_background_ferrari_2.webp`);
		}

		let counter = 0;

		return (
			<div className='season-desktop-container'>
				<div className='season-desktop-card season-desktop-first-card' style={{ backgroundImage: "url('" + image.default + "')" }}>
					<div className='season-desktop-card-text'>
						<div className='season-desktop-card-subtitle'>{content.year}</div>
						<div className='season-desktop-card-title'>{content.champion_name}</div>
					</div>
					<div className='season-desktop-card-opacity'></div>
				</div>
				<div className='season-desktop-text'>
					<div className='season-desktop-text-title'>{content.season_title}</div>
					<div className='season-desktop-text-description'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at finibus mauris. Pellentesque sagittis malesuada
						purus non auctor. Nulla sodales odio a nisi congue ultrices. Mauris tristique vitae dui nec ornare. Nullam vitae
						massa ac orci hendrerit volutpat. Phasellus non justo congue, congue elit lobortis, hendrerit mi. Mauris vestibulum
						ornare euismod. Suspendisse consectetur, augue a facilisis aliquet, ipsum diam placerat arcu, non posuere libero
						quam ut purus. Mauris vel sapien at mi accumsan condimentum. Mauris nec venenatis lectus, id congue est. Integer
						pellentesque eros et tortor ultrices sollicitudin.
					</div>
				</div>
				<div className='season-desktop-filters'>
					<Tabs value={this.state.tab} onChange={this.handleChange} aria-label="basic tabs example">
						<Tab label={'Grid By Position'} value={0} />
						<Tab label={'Grid By Points'} value={1} />
					</Tabs>
				</div>
				<div className='season-desktop-chart'>
					{this.state.tab === 0 &&
						<ResponsiveBump
							data={content.grid_by_position}
							colors={{ scheme: 'category10' }}
							lineWidth={3}
							activeLineWidth={6}
							inactiveLineWidth={3}
							inactiveOpacity={0.15}
							pointSize={10}
							activePointSize={16}
							inactivePointSize={0}
							pointColor={{ theme: 'background' }}
							pointBorderWidth={3}
							activePointBorderWidth={3}
							pointBorderColor={{ from: 'serie.color' }}
							axisTop={{
								tickSize: 5,
								tickPadding: 5,
								tickRotation: -60,
								legend: '',
								legendPosition: 'middle',
								legendOffset: -36
							}}
							axisBottom={{
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 50,
								legend: '',
								legendPosition: 'middle',
								legendOffset: 32
							}}
							axisLeft={{
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: 'position',
								legendPosition: 'middle',
								legendOffset: -40
							}}
							margin={{ top: 70, right: 100, bottom: 70, left: 60 }}
							// tooltip={(point) => {
							//     // return <div>{point['z']}</div>;
							//     return <div>TESTING!</div>;
							// }}
						/>
					}
					{this.state.tab === 1 &&
						<ResponsiveBump
							data={content.grid_by_points}
							interpolation="linear"
							xPadding={0}
							colors={{ scheme: 'category10' }}
							lineWidth={3}
							activeLineWidth={7}
							inactiveLineWidth={3}
							inactiveOpacity={0.15}
							pointSize={10}
							activePointSize={16}
							inactivePointSize={0}
							pointColor={{ theme: 'background' }}
							pointBorderWidth={3}
							activePointBorderWidth={3}
							pointBorderColor={{ from: 'serie.color' }}
							axisTop={{
								tickSize: 5,
								tickPadding: 5,
								tickRotation: -60,
								legend: '',
								legendPosition: 'middle',
								legendOffset: -36
							}}
							axisBottom={{
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 50,
								legend: '',
								legendPosition: 'middle',
								legendOffset: 32
							}}
							axisLeft={{
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: 'points',
								legendPosition: 'middle',
								legendOffset: -40,
								format: (v) => {
									counter += 1
									let text = v * -1;
									return counter % 2 === 0 ? '' : text;
								},
							}}
							margin={{ top: 70, right: 100, bottom: 70, left: 60 }}
							// tooltip={(point) => {
							//     // return <div>{point['z']}</div>;
							//     return <div>TESTING!</div>;
							// }}
						/>
					}
				</div>
			</div>
		);
	}
}

export default Season;
