import React, { useEffect, useState } from 'react';
import '../../css/all_time.css';
import { MenuItem, FormControl, Select, Tooltip, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { fix_filter_names } from '../utils/index.js';

// ******************************************************
// ******************************************************
// ******************************************************
// SOME DRIVER DON\T HAVE SEASON RESULTS AS A KEY (Rubens Barrichello)
// NECESSARY TO CHECK WHY
// JUAN MANUEL FANGIO and Carlos Sainz Jr are WHITHOUT POLES AND PODIUMS (POSSIBLY BECAUSE HIS NAME HAS 3 WORDS)
// ******************************************************
// ******************************************************
// ******************************************************
// Add features:
// - Add points filter
// - Add possibility to user display or hide bars from chart, for example, hide titles and display only wins
// ******************************************************
// ******************************************************
// ******************************************************

const BarChart = (props) => {
  let filters_list = ['title', 'wins', 'poles', 'podiums'];
  let lines_number = props.chart_max_value / 10;
  lines_number = props.chart_max_value < 40 ? 5 : props.chart_max_value > 100 ? 10 : lines_number;
  let lines_list = [];
  let count = 0;

  while (count < props.chart_max_value) {
    let lines_gap = props.chart_max_value / lines_number;
    let number = 0;
    if (lines_list.length > 0) {
      number = count;
    }
    lines_list.push(number);
    count += lines_gap;
  }
  lines_list.push(props.chart_max_value);
  lines_list = lines_list.sort((a, b) => b - a);

  return (
    <div className='barchart-background'>
      <div className='barchart-lines-bg'>
        {/* The division of props.chart_max_value should return the number of divs */}
        {lines_list.map((line, index) => {
          return (
            <div className='barchart-line' key={index}>
              <div className='barchart-line-number'>{line}</div>
              <div className='barchart-line-details'></div>
            </div>
          );
        })}
      </div>
      <div className='barchart-bars'>
        {filters_list.map(filter => {
          let seasons_results = props.data.seasons_results;
          let sum = 0;
          Object.keys(seasons_results).forEach(year => {
            sum += seasons_results[year][filter];
          });
          let bar_height = (sum * 100) / props.chart_max_value;
          return (
            <Tooltip key={filter} title={sum + ' - ' + fix_filter_names(filter)} arrow>
              <div className='barchart-bar-details' style={{ height: bar_height + '%' }}></div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

const AllTime = () => {
  const [range, setRange] = useState(5);
  const [nationality, setNationality] = useState('World');
  const [filter_type, setFilterType] = useState('title');
  const [first_date, setFirstDate] = useState(moment(new Date(1950, 1, 1)));
  const [second_date, setSecondDate] = useState(moment(new Date(2025, 1, 1)));
  const [drivers, setDrivers] = useState([]);
  const [drivers_filtered, setDriversFiltered] = useState([]);
  const [nationalities, setNationalities] = useState({});
  const [chart_max_value, setChartMaxValue] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      await load_nationalities();
      await load_drivers();
    };
    fetchData();
  }, [])

  useEffect(() => {
    search_drivers();
  }, [drivers])

  const load_nationalities = () => {
    fetch('/load-nationalities')
      .then(response => response.json())
      .then(data => {
        setNationalities(data.nationalities);
      });
  }

  const load_drivers = () => {
    fetch('/pilots-complete-info')
      .then(response => response.json())
      .then(data => {
        setDriversFiltered(data.drivers);
        setDrivers(data.drivers);
      });
  }

  const search_drivers = () => {
    let drivers_list = JSON.parse(JSON.stringify([...drivers]));
    let new_list = [];
    if (nationality === 'World') {
      new_list = drivers_list;
    } else {
      for (let i = 0; i < drivers_list.length; i++) {
        let driver = drivers_list[i];
        let has_nationality = driver['nationality'] && driver['nationality']['nationality_title'] === nationality;
        if (has_nationality) new_list.push(driver);
      }
    }

    let first_year = first_date._d.getFullYear();
    let second_year = second_date._d.getFullYear();
    // Create a range of years between first_year and second_year
    let selected_years = [];
    for (let i = first_year; i <= second_year; i++) {
      selected_years.push(i);
    }

    let range_date_list = [];
    for (let i = 0; i < new_list.length; i++) {
      let driver = new_list[i];

      if ('seasons_results' in driver && driver['seasons_results']) {
        let seasons_list = Object.keys(driver['seasons_results']);
        seasons_list = seasons_list.map(season => parseInt(season));

        let intersection = selected_years.filter(year => seasons_list.includes(year));

        let new_seasons_results = {};
        intersection.forEach(year => {
          new_seasons_results[year] = driver['seasons_results'][year];
        });
        driver['seasons_results'] = new_seasons_results;

        if (intersection.length > 0) range_date_list.push(driver);
      }
    }

    range_date_list = range_date_list.filter(driver => Object.keys(driver['seasons_results']).length > 0);
    // If the sum inside each year from driver['seasons_results'] equals zero, then remove driver from list
    let max_value = 0;
    let filters_list = ['title', 'wins', 'poles', 'podiums'];
    range_date_list = range_date_list.filter(driver => {
      let seasons_results = driver['seasons_results'];
      let sum = 0;
      Object.keys(seasons_results).forEach(year => {
        sum += seasons_results[year][filter_type];
      });
      max_value = Math.max(max_value, sum);
      for (let filter of filters_list) {
        if (!(filter_type === filter)) {
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

    // Order drivers by the sum of the filter_type
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

    setDriversFiltered(range_date_list);
    setChartMaxValue(max_value);
  }

  let image_fallback = require(`../../img/f1_background_ferrari_2.webp`);

  return (
    <div className='all-time-background'>
      <div className='all-time-main-container'>
        <div className='all-time-main-title'>All Time Comparison</div>
        <div className='all-time-options'>
          <div className='all-time-options-column-1'>
            <div className='all-time-option-box'>
              <div className='all-time-option-box-text'>Nationality: {nationality}</div>
              <div className='all-time-option-box-component'>
                {Object.keys(nationalities).length === 0 ? (
                  <CircularProgress color='inherit' />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      value={nationality}
                      onChange={e => setNationality(e.target.value)}
                    >
                      {Object.entries(nationalities).map(([key, value]) => {
                        return (
                          <MenuItem key={key} value={value.nationality_title}>
                            <div className='all-time-option-box-component-nationality-item'>
                              <img src={value.nationality_flag} loading="lazy"/>
                              <div className='all-time-option-box-component-nationality-item-text'>
                                {value.nationality_title}
                              </div>
                            </div>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
            <div className='all-time-option-box'>
              <div className='all-time-option-box-text'>Number of drivers: {range}</div>
              <div className='all-time-option-box-component'>
                <FormControl fullWidth>
                  <Select
                    id='number-of-drivers-select'
                    value={range}
                    onChange={e => setRange(e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className='all-time-option-box'>
            <div className='all-time-option-box-text'>Range Date</div>
            <div className='all-time-option-box-component'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer components={['DatePicker']}>
                  <div id='date-picker-from'>
                    <DatePicker
                      id='date-picker-from'
                      disableFuture={true}
                      label='From'
                      views={['year']}
                      minDate={moment(new Date(1950, 1, 1))}
                      maxDate={moment(new Date(2025, 1, 1))}
                      value={first_date}
                      onChange={newValue => setFirstDate(newValue)}
                    />
                  </div>
                  <div id='date-picker-to'>
                    <DatePicker
                      id='date-picker-to'
                      disableFuture={true}
                      label='To'
                      views={['year']}
                      minDate={moment(new Date(1950, 1, 1))}
                      maxDate={moment(new Date(2025, 1, 1))}
                      value={second_date}
                      onChange={newValue => setSecondDate(newValue)}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className='all-time-option-box'>
            <div className='all-time-option-box-text'>
              Filter: {filter_type.charAt(0).toUpperCase() + filter_type.slice(1)}
            </div>
            <div className='all-time-option-box-component'>
              <FormControl fullWidth>
                <Select
                  id='accomplishments-select'
                  value={filter_type}
                  onChange={e => setFilterType(e.target.value)}
                >
                  <MenuItem value={'title'}>Titles</MenuItem>
                  <MenuItem value={'wins'}>Wins</MenuItem>
                  <MenuItem value={'poles'}>Poles</MenuItem>
                  <MenuItem value={'podiums'}>Podiums</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='all-time-option-box'>
            <div className='all-time-option-box-text'>Absolute</div>
            <div className='all-time-option-box-component'>option component</div>
          </div>
        </div>
        {
          (drivers.length === 0 || Object.keys(nationalities).length === 0) ? (
            <CircularProgress color='inherit' />
          ) : (
            <React.Fragment>
              <div className='all-time-search-button' id='search-button' onClick={search_drivers}>
                SEARCH
              </div>
              <div className='all-time-charts'>
                {drivers_filtered.slice(0, range).map((driver) => {
                  return (
                    <div
                      key={driver.id}
                      className='all-time-chart-box'
                      style={{ width: 'calc(100% / ' + range + ')' }}
                    >
                      <div className='all-time-chart-box-info'>
                        {driver.image && (
                          <div
                            className='all-time-chart-box-info-photo'
                            style={{ backgroundImage: 'url(' + require(`../../img/${driver.image}`).default + ')' }}
                          ></div>
                        )}
                        {!driver.image && (
                          <div
                            className='all-time-chart-box-info-photo'
                            style={{ backgroundImage: 'url(' + image_fallback.default + ')' }}
                          ></div>
                        )}
                        <div className='all-time-chart-box-info-text'>{driver.name}</div>
                      </div>
                      <div className='all-time-chart-details'>
                        <BarChart 
                          data={driver}
                          chart_max_value={chart_max_value}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='all-time-chart-labels'>
                <div className='all-time-chart-label-details'>
                  <div className='all-time-chart-label-details-box'></div>
                  <div className='all-time-chart-label-details-text'>Titles</div>
                </div>
                <div className='all-time-chart-label-details'>
                  <div className='all-time-chart-label-details-box'></div>
                  <div className='all-time-chart-label-details-text'>Wins</div>
                </div>
                <div className='all-time-chart-label-details'>
                  <div className='all-time-chart-label-details-box'></div>
                  <div className='all-time-chart-label-details-text'>Poles</div>
                </div>
                <div className='all-time-chart-label-details'>
                  <div className='all-time-chart-label-details-box'></div>
                  <div className='all-time-chart-label-details-text'>Podiums</div>
                </div>
              </div>
            </React.Fragment>
          )
        }
      </div>
    </div>
  );
}

export default AllTime;
