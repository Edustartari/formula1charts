import React from 'react';
import '../../css/season.css';
import Image from '../components/image.js';
import _ from "lodash";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { ResponsiveBump } from '@nivo/bump'

const data_test = [
    {
      "id": "Serie 1",
      "data": [
        {
          "x": 2000,
          "y": 10
        },
        {
          "x": 2001,
          "y": 9
        },
        {
          "x": 2002,
          "y": 1
        },
        {
          "x": 2003,
          "y": 7
        },
        {
          "x": 2004,
          "y": 3
        }
      ]
    },
    {
      "id": "Serie 2",
      "data": [
        {
          "x": 2000,
          "y": 11
        },
        {
          "x": 2001,
          "y": 7
        },
        {
          "x": 2002,
          "y": 10
        },
        {
          "x": 2003,
          "y": 6
        },
        {
          "x": 2004,
          "y": 11
        }
      ]
    },
    {
      "id": "Serie 3",
      "data": [
        {
          "x": 2000,
          "y": 7
        },
        {
          "x": 2001,
          "y": 10
        },
        {
          "x": 2002,
          "y": 9
        },
        {
          "x": 2003,
          "y": 11
        },
        {
          "x": 2004,
          "y": 9
        }
      ]
    },
    {
      "id": "Serie 4",
      "data": [
        {
          "x": 2000,
          "y": 5
        },
        {
          "x": 2001,
          "y": 6
        },
        {
          "x": 2002,
          "y": 8
        },
        {
          "x": 2003,
          "y": 3
        },
        {
          "x": 2004,
          "y": 10
        }
      ]
    },
    {
      "id": "Serie 5",
      "data": [
        {
          "x": 2000,
          "y": 8
        },
        {
          "x": 2001,
          "y": 4
        },
        {
          "x": 2002,
          "y": 7
        },
        {
          "x": 2003,
          "y": 1
        },
        {
          "x": 2004,
          "y": 1
        }
      ]
    },
    {
      "id": "Serie 6",
      "data": [
        {
          "x": 2000,
          "y": 4
        },
        {
          "x": 2001,
          "y": 11
        },
        {
          "x": 2002,
          "y": 5
        },
        {
          "x": 2003,
          "y": 8
        },
        {
          "x": 2004,
          "y": 4
        }
      ]
    },
    {
      "id": "Serie 7",
      "data": [
        {
          "x": 2000,
          "y": 12
        },
        {
          "x": 2001,
          "y": 8
        },
        {
          "x": 2002,
          "y": 6
        },
        {
          "x": 2003,
          "y": 5
        },
        {
          "x": 2004,
          "y": 2
        }
      ]
    },
    {
      "id": "Serie 8",
      "data": [
        {
          "x": 2000,
          "y": 9
        },
        {
          "x": 2001,
          "y": 2
        },
        {
          "x": 2002,
          "y": 12
        },
        {
          "x": 2003,
          "y": 12
        },
        {
          "x": 2004,
          "y": 5
        }
      ]
    },
    {
      "id": "Serie 9",
      "data": [
        {
          "x": 2000,
          "y": 6
        },
        {
          "x": 2001,
          "y": 1
        },
        {
          "x": 2002,
          "y": 2
        },
        {
          "x": 2003,
          "y": 10
        },
        {
          "x": 2004,
          "y": 6
        }
      ]
    },
    {
      "id": "Serie 10",
      "data": [
        {
          "x": 2000,
          "y": 2
        },
        {
          "x": 2001,
          "y": 5
        },
        {
          "x": 2002,
          "y": 4
        },
        {
          "x": 2003,
          "y": 9
        },
        {
          "x": 2004,
          "y": 12
        }
      ]
    },
    {
      "id": "Serie 11",
      "data": [
        {
          "x": 2000,
          "y": 3
        },
        {
          "x": 2001,
          "y": 12
        },
        {
          "x": 2002,
          "y": 3
        },
        {
          "x": 2003,
          "y": 2
        },
        {
          "x": 2004,
          "y": 8
        }
      ]
    },
    {
      "id": "Serie 12",
      "data": [
        {
          "x": 2000,
          "y": 1
        },
        {
          "x": 2001,
          "y": 3
        },
        {
          "x": 2002,
          "y": 11
        },
        {
          "x": 2003,
          "y": 4
        },
        {
          "x": 2004,
          "y": 7
        }
      ]
    }
  ]

class Season extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const image = require(`../../img/f1_background_ferrari_2.jpg`);
        return(
            <div className='season-desktop-container'>
                <div className='season-desktop-menu'>MENU</div>
                <div className='season-desktop-card season-desktop-first-card' style={{backgroundImage: "url('" + image.default + "')"}}>
                    <div className='season-desktop-card-text'>
                        <div className='season-desktop-card-subtitle'>1991</div>
                        <div className='season-desktop-card-title'>AYRTON SENNA</div>
                    </div>
                    <div className='season-desktop-card-opacity'></div>
                </div>
                <div className='season-desktop-text'>
                    <div className='season-desktop-text-title'>
                        Amazing
                    </div>
                    <div className='season-desktop-text-description'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer at finibus mauris. Pellentesque sagittis malesuada purus non auctor. 
                        Nulla sodales odio a nisi congue ultrices. Mauris tristique vitae dui nec ornare. Nullam vitae massa ac orci hendrerit volutpat. 
                        Phasellus non justo congue, congue elit lobortis, hendrerit mi. Mauris vestibulum ornare euismod. 
                        Suspendisse consectetur, augue a facilisis aliquet, ipsum diam placerat arcu, non posuere libero quam ut purus. 
                        Mauris vel sapien at mi accumsan condimentum. Mauris nec venenatis lectus, id congue est. 
                        Integer pellentesque eros et tortor ultrices sollicitudin. 
                    </div>
                </div>
                <div className='season-desktop-filters'>CHART FILTERS</div>
                <div className='season-desktop-chart'>
                    <ResponsiveBump
                        data={data_test}
                        colors={{ scheme: 'spectral' }}
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
                            tickRotation: 0,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -36
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
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
                        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
                        // axisRight={null}
                    />
                </div>
            </div>
        )
    }
}

export default Season;