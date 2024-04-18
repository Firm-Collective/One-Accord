// get the country that the user is in from their ip address

import axios from 'axios';

export const getCountryFromIP = async (ip: string): Promise<string | null> => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data.country_name;
  } catch (error) {
    console.error('Error retrieving country from IP:', error);
    return null;
  }
};
