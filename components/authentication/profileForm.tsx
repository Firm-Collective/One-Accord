import React, { useEffect, useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import useProfileForm from './hooks/useProfileForm';
import { countries } from '@/utils/data/countries';
import Dropdown from '@/components/dropdown';

import { UserTypeType } from './schemas';
import { Country, State, City } from 'country-state-city';

export default function RegisterForm() {
  const { onValid, onInvalid, updatedProfileMutation, form, queryUserTypeInfo } = useProfileForm();
  const allCountries = Object.entries(countries).map(([code, name]) => ({ value: name, label: name }));
  const allUserTypes =
    queryUserTypeInfo?.data?.map((userType: UserTypeType) => ({
      value: userType.id,
      label: userType.name,
    })) ?? [];

  // the state variables for the
  // country/state/city dropdown selections
  const [selectedCountryName, setSelectedCountryName] = useState<string | number>('');
  const [selectedStateName, setSelectedStateName] = useState<string | number>('');
  const [selectedCityName, setSelectedCityName] = useState<string | number>('');

  // pull the country, state, city data
  // from country-state-city npm dependency
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  // state variables for states and cities data
  // to put into options attribute
  // for StateDropdown.tsx
  // and CityDropdown.tsx
  const [allStates, setAllStates] = useState({});
  const [allCities, setAllCities] = useState({});

  // boolean functions
  // to check if allStates
  // and allCities have been set
  // the dropdown menu for states/cities
  // will not render otherwise
  const isAllStatesNotSet = () => {
    return Object.keys(allStates).length === 0;
  };

  const isAllCitiesNotSet = () => {
    return Object.keys(allCities).length === 0;
  };

  // this is the state variable
  // for the selected country
  // chosen from the dropdown menu
  // along with some extra metadata
  // to call the State.getStatesOfCountry(countryIsoCode)
  const [selectedCountry, setSelectedCountry] = useState({
    name: '',
    isoCode: '',
  });

  // this is the state variable
  // for the selected state
  // chosen from the dropdown menu
  // along with some extra metadata
  // City.getCitiesOfState(countryIsoCode, stateIsoCode)
  const [selectedState, setSelectedState] = useState({
    name: '',
    isoCode: '',
  });

  // this is the state variable
  // for the selected state
  // chosen from the dropdown menu
  // along with some extra metadata
  // in case we are saving longitude/latitude
  // of a city
  const [selectedCity, setSelectedCity] = useState({
    name: '',
    latitude: '',
    longitude: '',
  });

  // useEffect will set stateData
  // when country is selected
  useEffect(() => {
    setStateData(State.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);

  // useEffect will format stateData
  // to put into options attribute
  // of <Dropdown />
  // when stateData is initialized
  useEffect(() => {
    const formattedStateData = stateData.map((state) => ({
      value: state.name,
      label: state.name,
    }));
    setAllStates(formattedStateData);
  }, [stateData]);

  // useEffect will set cityData
  // when state is selected
  useEffect(() => {
    setCityData(City.getCitiesOfState(selectedCountry?.isoCode, selectedState?.isoCode));
  }, [selectedState]);

  // useEffect will format cityData
  // to put into options attribute
  // of <Dropdown />
  // when cityData is initialized
  useEffect(() => {
    const formattedCityData = cityData.map((city) => ({
      value: city.name,
      label: city.name,
    }));

    setAllCities(formattedCityData);
  }, [cityData]);

  // the callback functions to hand over
  // to the dropdown components
  const handleCountrySelect = (value: string | number) => {
    // console.log('Selected country name:', value);
    setSelectedCountryName(value);

    const selectedCountry = countryData.find((country) => country.name === value);
    if (selectedCountry) {
      setSelectedCountry({
        name: selectedCountry.name,
        isoCode: selectedCountry.isoCode,
      });
    }
  };

  const handleStateSelect = (value: string | number) => {
    // console.log('Selected state name:', value);
    setSelectedStateName(value);

    const selectedState = stateData.find((state) => state.name === value);
    if (selectedState) {
      setSelectedState({
        name: selectedState.name,
        isoCode: selectedState.isoCode,
      });
    }
  };

  const handleCitySelect = (value: string | number) => {
    // console.log('Selected city name:', value);
    setSelectedCityName(value);

    const selectedCity = cityData.find((city) => city.name === value);
    if (selectedCity) {
      setSelectedCity({
        name: selectedCity.name,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      });
    }
  };

  return (
    <form className='my-4' onSubmit={form.handleSubmit(onValid, onInvalid)}>
      <legend className='text-xs text-right text-gray-700'>
        <span className='text-red-500 mr-1'>*</span>
        indicates required
      </legend>
      <div>
        <div className='flex items-center justify-between'></div>
        <div className='mt-4'>
          <TextField
            control={form.control}
            name='username'
            label={
              <span>
                Username <span className='text-red-500 ml-1'>*</span>
              </span>
            }
            type='text'
          />
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between'></div>
        <div className='mt-4 ml-3 pr-3'>
          <Dropdown
            control={form.control}
            name='user_type_id'
            options={allUserTypes}
            label={
              <span>
                User Type <span className='text-red-500 ml-1'>*</span>
              </span>
            }
          />
        </div>
      </div>

      {/* country state city section */}
      {/* Pick the Country */}
      <div>
        <div className='flex items-center justify-between'></div>
        <div className='mt-4 ml-3 pr-3'>
          <Dropdown
            control={form.control}
            name='country'
            options={allCountries}
            onSelect={handleCountrySelect}
            label={
              <span>
                Country <span className='text-red-500 ml-1'>*</span>
              </span>
            }
          />
        </div>
      </div>

      {/* Pick the State */}
      {isAllStatesNotSet() ? (
        <></>
      ) : (
        <div>
          <div className='flex items-center justify-between'></div>
          <div className='mt-4 ml-3 pr-3'>
            <Dropdown
              control={form.control}
              name='state'
              options={allStates}
              onSelect={handleStateSelect}
              label={
                <span>
                  State <span className='text-red-500 ml-1'>*</span>
                </span>
              }
            />
          </div>
        </div>
      )}

      {isAllCitiesNotSet() ? (
        <></>
      ) : (
        <div>
          <div className='flex items-center justify-between'></div>
          <div className='mt-4 ml-3 pr-3'>
            <Dropdown
              control={form.control}
              name='city'
              options={allCities}
              onSelect={handleCitySelect}
              label={
                <span>
                  City <span className='text-red-500 ml-1'>*</span>
                </span>
              }
            />
          </div>
        </div>
      )}

      {/* end city country state section */}

      <div>
        <div className='flex items-center justify-between'></div>
        <div className='mt-4'>
          <TextField
            control={form.control}
            name='birth_year'
            label={
              <span>
                Birth Year <span className='text-red-500 ml-1'>*</span>
              </span>
            }
            type='date'
          />
        </div>
      </div>
      {updatedProfileMutation.isError && <p className='text-red-500 text-sm'>An error occurred during updating.</p>}
      <p className='text-gray-700 text-base lg:text-sm text-center mt-8'>Join us in lighting up the world!</p>
      <div className='mt-6'>
        <Button
          variant='primary'
          text={updatedProfileMutation.isLoading ? 'Processing...' : 'Updated profile'}
          disabled={updatedProfileMutation.isLoading}
          type='submit'
        />
      </div>
      <p className='mt-5 text-center text-sm text-gray-600 hover:text-gray-900'>
        Skip to{' '}
        <a className='mt-5 text-center text-sm text-blue-600 hover:text-gray-900' href='/live'>
          Live Stream
        </a>
      </p>
    </form>
  );
}
