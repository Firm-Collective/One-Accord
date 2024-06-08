import React from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import useProfileForm from './hooks/useProfileForm';
import { countries } from '@/utils/data/countries';
import Dropdown from '@/components/dropdown';
import { UserTypeType } from "./schemas";
import { Typography } from '@mui/material';
import InfoTooltip from './InfoTooltip';

export default function RegisterForm() {
  const { onValid, onInvalid, updatedProfileMutation, form } = useProfileForm();
  const allCountries = Object.entries(countries).map(([code, name]) => ({ value: name, label: name }));

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
            name='user_type_code'
            label={
              <span>
                User ID for Influencers, Moderators and Prophetic Org (Optional)<span className='text-red-500 ml-1'>*</span>
              </span>
            }
            type='text'
            placeholder='ID-'
          />
        </div>
      </div>
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
            name='country'
            options={allCountries}
            label={
              <span>
                Country <span className='text-red-500 ml-1'>* </span>
                <InfoTooltip title="Enter your country to have your general location anonymously shown on a map of participating users. If you do not wish to share this information, you can leave this field empty." />
                </span>
            }
          />
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between'></div>
        <div className='mt-4'>
          <TextField
            control={form.control}
            name='city'
            label={
              <span>
                City <span className='text-red-500 ml-1'>*</span>
                <InfoTooltip title="Enter your city to have your general location anonymously shown on a map of participating users. If you do not wish to share this information, you can leave this field empty." />

              </span>
            }
            type='text'
          />
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between'></div>
        <div className='mt-4'>
          <TextField
            control={form.control}
            name='birth_year'
            isMultiline={false}
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