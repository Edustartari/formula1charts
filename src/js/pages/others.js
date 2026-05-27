import React, { useState, useEffect } from 'react';
import '../../css/others.css';
import { MenuItem, FormControl, Select, CircularProgress } from '@mui/material';
import { ResponsiveWaffle } from '@nivo/waffle'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

const Others = () => {
  /* eslint-disable-next-line */
  const [nationality, setNationality] = useState('World');
  const [filter_type, setFilterType] = useState('title');
  const [first_date, setFirstDate] = useState(moment(new Date(1950, 1, 1)));
  const [second_date, setSecondDate] = useState(moment(new Date(2024, 1, 1)));
  const [drivers, setDrivers] = useState([]);
  const [drivers_filtered, setDriversFiltered] = useState([]);
  const [drivers_filtered_by_type, setDriversFilteredByType] = useState([]);
  const [nationalities, setNationalities] = useState({});
  /* eslint-disable-next-line */
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

  const load_nationalities = async () => {
    const response = await fetch('/load-nationalities');
    const data = await response.json();
    setNationalities(data.nationalities);
  }

  const load_drivers = async () => {
    const response = await fetch('/pilots-complete-info');
    const data = await response.json();
    setDriversFiltered(data.drivers);
    setDrivers(data.drivers);
  };

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

        let intersection = selected_years.filter(year => seasons_list.includes(year));

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

    let nationality_temp_all = {};
    for (let i = 0; i < range_date_list_all.length; i++) {
      let nationality = range_date_list_all[i]['nationality']['nationality_acronym'];
      if (nationality === 'GDR' || nationality === 'FRG') {
        nationality = 'GER'
      }
      if (!nationality) continue;
      if (nationality in nationality_temp_all) {
        nationality_temp_all[nationality] += 1;
      } else {
        nationality_temp_all[nationality] = 1;
      }
    }

    let nationality_temp_by_filter = {};
    for (let i = 0; i < range_date_list_by_filter.length; i++) {
      let nationality = range_date_list_by_filter[i]['nationality']['nationality_acronym'];
      if (nationality === 'GDR' || nationality === 'FRG') {
        nationality = 'GER'
      }
      if (!nationality) continue;
      if (nationality in nationality_temp_by_filter) {
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
        label: nationalities[item]['nationality_title'],
        value: nationality_temp_all[item]
      })
    });

    let nationality_by_filter = [];
    Object.keys(nationality_temp_by_filter).forEach(item => {
      nationality_by_filter.push({
        id: item,
        label: nationalities[item]['nationality_title'],
        value: nationality_temp_by_filter[item]
      })
    });

    // Sort the array by the values
    nationality_all = nationality_all.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });

    nationality_by_filter = nationality_by_filter.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });

    setDriversFiltered(nationality_all);
    setDriversFilteredByType(nationality_by_filter);
    setChartMaxValue(max_value);
  }

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
                    maxDate={moment(new Date(2024, 1, 1))}
                    value={first_date}
                    onChange={newValue => setFirstDate(newValue)}
                  />
                  <DatePicker
                    disableFuture={true}
                    label='To'
                    views={['year']}
                    minDate={moment(new Date(1950, 1, 1))}
                    maxDate={moment(new Date(2024, 1, 1))}
                    value={second_date}
                    onChange={newValue => setSecondDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className='others-option-box'>
            <div className='others-option-box-text'>
              Filter: {filter_type.charAt(0).toUpperCase() + filter_type.slice(1)}
            </div>
            <div className='others-option-box-component'>
              <FormControl fullWidth>
                <Select
                  id='demo-simple-select'
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
        </div>
        {
          (drivers.length === 0 || Object.keys(nationalities).length === 0) ? (
            <CircularProgress color='inherit' />
          ) : (
            <React.Fragment>
              <div className='others-main-button' onClick={search_drivers}>
                SEARCH
              </div>
              <div className='others-charts-container'>
                <div className='others-chart'>
                  <div className='others-chart-text'>Total drivers between period {first_date._d.getFullYear()} - {second_date._d.getFullYear()}</div>
                  <ResponsiveWaffle
                    data={drivers_filtered}
                    total={drivers_filtered.reduce((acc, item) => acc + item.value, 0)}
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
                  <div className='others-chart-text'>Total drivers with {filter_type} for each country</div>
                  <ResponsiveWaffle
                    data={drivers_filtered_by_type}
                    total={drivers_filtered_by_type.reduce((acc, item) => acc + item.value, 0)}
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
            </React.Fragment>
          )
        }
      </div>
    </div>
  );
}

export default Others;
