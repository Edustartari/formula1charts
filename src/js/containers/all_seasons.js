import React from 'react';
import '../../css/all_seasons.css';
import _ from 'lodash';

function SeasonCard(props) {
	let image;
	try {
		image = require(`../../img/season_` + props.year + `.webp`);
	} catch (error) {
		image = require(`../../img/f1_background_ferrari_2.webp`);
	}
	return (
		<a
			href={'/season/' + props.year.toString()}
			style={{ height: props.card_height + 'vh', width: 'calc(100% / ' + props.total_columns + ')' }}
		>
			<div
				className='all-seasons-desktop-card'
				style={{ height: props.card_height + 'vh', backgroundImage: "url('" + image.default + "')" }}
			>
				<div className='all-seasons-desktop-card-text'>{props.year}</div>
			</div>
		</a>
		// <Link to={"/season/" + props.year.toString()} style={{height: props.card_height + 'vh', width: 'calc(100% / ' + props.total_columns + ')'}}>
		// 	<div className='all-seasons-desktop-card' style={{height: props.card_height + 'vh', backgroundImage: "url('" + image.default + "')"}}>
		// 		<div className='all-seasons-desktop-card-text'>{props.year}</div>
		// 	</div>
		// </Link>
	);
}

class AllSeasons extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			total_columns: 1,
			card_height: 100
		};
		this.change_card_size = this.change_card_size.bind(this);

		// When page loads first time, just set page to display the top
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	// Function to change card size
	change_card_size(zoom) {
		let min_height = 25;
		let max_height = 100;
		if (zoom == 'in' && this.state.card_height <= max_height && this.state.card_height >= min_height) {
			this.setState({ total_columns: this.state.total_columns * 2 });
			this.setState({ card_height: this.state.card_height / 2 });
		} else if (zoom == 'out' && this.state.card_height < max_height) {
			this.setState({ total_columns: this.state.total_columns / 2 });
			this.setState({ card_height: this.state.card_height * 2 });
		}
	}

	render() {
		// Create list of years since the year 1951 until 2024, and reverse it
		let years = _.range(1950, 2025).reverse();
		// Create list of season cards
		let season_cards = years.map(year => {
			return <SeasonCard key={year} year={year} {...this.state} />;
		});

		return (
			<div className='all-seasons-desktop-container'>
				<div className='all-seasons-desktop-cards-container'>{season_cards}</div>
				<div className='all-seasons-desktop-buttons'>
					<div className='all-seasons-desktop-buttons-details' onClick={() => this.change_card_size('out')}>
						+
					</div>
					<div className='all-seasons-desktop-buttons-details' onClick={() => this.change_card_size('in')}>
						-
					</div>
				</div>
			</div>
		);
	}
}

export default AllSeasons;
