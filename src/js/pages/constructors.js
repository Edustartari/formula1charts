/* eslint-disable-next-line */
import React, { useState, useEffect } from 'react';
import '../../css/constructors.css';
import { MenuItem, FormControl, Select } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Loading } from '../components/loading';
import moment from 'moment';
import { constructors_colors } from '../constants/constructors_colors';
import { create_random_color, replace_underscore } from '../utils/index.js';

const Constructors = () => {
  const [filter_type, setFilterType] = useState('title');
  const [first_date, setFirstDate] = useState(moment(new Date(1950, 1, 1)));
  const [second_date, setSecondDate] = useState(moment(new Date(2022, 1, 1)));
  /* eslint-disable-next-line */
  const [selected_years, setSelectedYears] = useState([]);
  const [constructors, setConstructors] = useState([]);
  const [constructors_filtered, setConstructorsFiltered] = useState([]);
  /* eslint-disable-next-line */
  const [chart_max_value, setChartMaxValue] = useState(100);
  const [on_hover_value, setOnHoverValue] = useState('ferrari');

  useEffect(() => {
    const fetchData = async () => {
      await load_constructors();
    };
    fetchData();
  }, [])

  useEffect(() => {
    search_constructors();
  }, [constructors])

  const load_constructors = async () => {
    const response = await fetch('/get-constructors-stats');
    const data = await response.json();
    setConstructorsFiltered(data.constructors);
    setConstructors(data.constructors);
  }

  const search_constructors = () => {
    let constructors_list = JSON.parse(JSON.stringify([...constructors]));

    let first_year = first_date._d.getFullYear();
    let second_year = second_date._d.getFullYear();
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
        sum += seasons_results[year][filter_type];

        if (!(filter_type === 'title')) {
          let pilots_dict = seasons_results[year]['pilots_' + filter_type]
          Object.keys(pilots_dict).forEach(pilot => {
            if (pilot in pilots_stats) {
              pilots_stats[pilot] += pilots_dict[pilot];
            } else if (pilots_dict[pilot] > 0) {
              pilots_stats[pilot] = pilots_dict[pilot];
            }
          });
        } else {
          let pilots_dict = seasons_results[year]['pilots_wins']
          Object.keys(pilots_dict).forEach(pilot => {
            if (pilot in pilots_stats && seasons_results[year]['title'] === 1) {
              pilots_stats[pilot] += 1;
            } else if (seasons_results[year]['title'] === 1) {
              pilots_stats[pilot] = 1;
            }
          });
        }

      });
      max_value = Math.max(max_value, sum);

      constructor['id'] = constructor['constructorId'];
      constructor['label'] = constructor['name'];
      constructor['value'] = sum;
      constructor['color'] = constructor['id'] in constructors_colors ? constructors_colors[constructor['id']] : create_random_color();
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
        a_sum += a['seasons_results'][year][filter_type];
      });
      Object.keys(b['seasons_results']).forEach(year => {
        b_sum += b['seasons_results'][year][filter_type];
      });
      return b_sum - a_sum;
    });

    setConstructorsFiltered(range_date_list);
    setChartMaxValue(max_value);
    setSelectedYears(selected_years);
  }

  if (constructors.length === 0) {
    return (
      <Loading open={true} />
    );
  } else {
    let colors_list = constructors_filtered.map(constructor => constructor['color']);
    let pilots_colors_list = [];
    let pilots_list = [];
    try {
      let filter_by = constructors_filtered.filter(item => item['constructorId'] === on_hover_value)

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

    } catch (error) {
      /* eslint-disable-next-line */
      console.log(error);
    }

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
                        value={first_date}
                        onChange={newValue => setFirstDate(newValue)}
                      />
                    </div>
                    <div id='constructor-date-picker-to'>
                      <DatePicker
                        disableFuture={true}
                        label='To'
                        views={['year']}
                        minDate={moment(new Date(1950, 1, 1))}
                        maxDate={moment(new Date(2022, 1, 1))}
                        value={second_date}
                        onChange={newValue => setSecondDate(newValue)}
                      />
                    </div>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className='constructors-options-column-1'>
              <div className='constructors-option-box' id='constructors-accomplishments-select-container'>
                <div className='constructors-option-box-text'>
                  Filter: {filter_type.charAt(0).toUpperCase() + filter_type.slice(1)}
                </div>
                <div className='constructors-option-box-component'>
                  <FormControl fullWidth>
                    <Select
                      id='constructors-accomplishments-select'
                      value={filter_type}
                      onChange={e => setFilterType(e.target.value)}
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
          <div className='constructors-search-button' onClick={search_constructors}>
            SEARCH
          </div>
          <div className='constructors-charts-container'>
            <div className='constructors-chart'>
              <div></div>
              <ResponsivePie
                data={constructors_filtered}
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
                  setOnHoverValue(e.id);
                }}
              />
            </div>
            <div className='constructors-chart'>
              <div className='constructors-chart-footer-note'>{filter_type === 'title' ? "Drivers' that won the Constructors' Championship" : ""}</div>
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

export default Constructors;
