import React from 'react';
import '../../css/all_seasons.css';
import Image from '../components/image.js';
import _ from "lodash";

class AllSeasons extends React.Component  {	
	constructor(props) {
		super(props);

		this.state = {
			total_columns: 1,
			card_height: 100,
		};
		this.change_card_size = this.change_card_size.bind(this);
	}

	// Function to change card size
	change_card_size(zoom){
		console.log('')
		console.log('change_card_size')
		let min_columns = 1;
		let max_columns = 8;
		let min_height = 25;
		let max_height = 100;
		console.log('zoom')
		console.log(zoom)
		console.log('this.state.card_height')
		console.log(this.state.card_height)
		console.log('max_height')
		console.log(max_height)
		console.log('min_height')
		console.log(min_height)
		if(zoom == 'in' && this.state.card_height <= max_height && this.state.card_height >= min_height){
			this.setState({total_columns: this.state.total_columns * 2})
			this.setState({card_height: this.state.card_height / 2})
		} else if(zoom == 'out' && this.state.card_height < max_height){
			this.setState({total_columns: this.state.total_columns / 2})
			this.setState({card_height: this.state.card_height * 2})
		}
		// if(zoom == 'in' && this.state.card_height <= max_height){
		// 	this.setState({total_columns: this.state.total_columns * 2})
		// 	this.setState({card_height: this.state.card_height / 2})
		// } else if(zoom == 'out' && this.state.card_height < max_height){
		// 	this.setState({total_columns: this.state.total_columns / 2})
		// 	this.setState({card_height: this.state.card_height * 2})
		// }
	}		
	
	render(){
		const image = require(`../../img/f1_background_ferrari_2.jpg`);
		return(
			<div className='all-seasons-desktop-container'>
				<div className='all-seasons-desktop-cards-container'>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2022</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2021</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2020</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2019</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2018</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2017</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2016</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
					<div className='all-seasons-desktop-card' style={{height: this.state.card_height + 'vh', width: 'calc(100% / ' + this.state.total_columns + ')', backgroundImage: "url('" + image.default + "')"}}>
						<div className='all-seasons-desktop-card-text'>2015</div>
					</div>
				</div>
				<div className='all-seasons-desktop-buttons'>
					<div className='all-seasons-desktop-buttons-details' onClick={() => this.change_card_size('out')}>+</div>
					<div className='all-seasons-desktop-buttons-details' onClick={() => this.change_card_size('in')}>-</div>
				</div>
			</div>
		)
	}
}
  
export default AllSeasons;