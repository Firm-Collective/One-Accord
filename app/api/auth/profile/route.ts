import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';
import { getUser } from '@/utils/supabase/auth';
import { type ProfileSchemaType } from '@/components/authentication/schemas';
import axios from 'axios';

type BoundingBox = {
  northeast: { lat: number; lng: number };
  southwest: { lat: number; lng: number };
};

type Memo = {
  [key: string]: BoundingBox;
};

type Location = { id: string; city: string; country: string; latitude: string; longitude: string };

// memoization for API calls
const memo: Memo = {};

const fetchLocation = async (supabase: any, latitude: string, longitude: string) => {
  const { data: locations, error } = await supabase
    .from('Location')
    .select()
    .eq('latitude', latitude)
    .eq('longitude', longitude);

  if (error) {
    console.error('Error fetching location:', error);
    throw new Error('An error occurred during location fetching.');
  }

  return locations.length > 0 ? locations[0] : null;
};

const insertUserLocation = async (supabase: any, userData: ProfileSchemaType, latitude: string, longitude: string) => {
  const { data, error } = await supabase
    .from('Location')
    .insert({
      country: userData.country,
      city: userData.city,
      latitude: latitude,
      longitude: longitude,
    })
    .select();

  if (error) {
    console.error('Error inserting user location:', error);
    throw new Error('An error occurred during location insertion.');
  }

  return data[0];
};

const updateUser = async (supabase: any, userData: ProfileSchemaType, userId: string, locationId: string) => {
  console.log("🚀 ~ updateUser ~ locationId:", locationId)
  const { data, error } = await supabase
    .from('User')
    .update({
      username: userData.username,
      user_type_id: userData.user_type_id,
      birth_year: userData.birth_year,
      user_location_id: locationId,
      updated_at: new Date(),
    })
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating user:', error);
    throw new Error('An error occurred during user updating.');
  }

  return data;
};

const getCoordinates = async (country: string, city: string) => {
  const key = `${country}-${city}`;
  let boundingBox: BoundingBox;

  // if we have the country / city cached, then use it instead of calling API
  if (key in memo) {
    boundingBox = memo[key];
  } else {
    // otherwise, call the API and get data
    try {
      const response = await axios.get(
        `${process.env.GEOCODE_URL}?q=${city}+${country}&key=${process.env.GEOCODE_API_KEY}`,
      );
      const data = response.data;
      if (data.results.length !== 0) {
        boundingBox = data.results[0].bounds;
        // input into memo
        memo[key] = boundingBox;
      } else {
        throw new Error('No results found from geocoding API.');
      }
    } catch (error) {
      console.error('Error grabbing coordinates from user city and country.', error);
      throw new Error('An error occurred while fetching coordinates.');
    }
  }

  const latitude = ((boundingBox.northeast.lat + boundingBox.southwest.lat) / 2).toString();
  const longitude = ((boundingBox.northeast.lng + boundingBox.southwest.lng) / 2).toString();

  return { latitude, longitude };
};

export async function POST(request: Request) {
  const supabase = createClient();
  const userData: ProfileSchemaType = await request.json();

  const location = await getCoordinates(userData.country || 'unknown', userData.city || 'unknown');

  const latitude = location.latitude;
  console.log("🚀 ~ POST ~ latitude:", latitude)
  const longitude = location.longitude;
  console.log("🚀 ~ POST ~ longitude:", longitude)

  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Check if the latitude & longitude exist before
    let locationRecord = await fetchLocation(supabase, latitude, longitude);
    console.log("🚀 ~ POST ~ locationRecord:", locationRecord)

    if (!locationRecord) {
      console.log('Location not found, inserting new location...');
      locationRecord = await insertUserLocation(supabase, userData, latitude, longitude);
      console.log("🚀 ~ POST ~ locationRecord:", locationRecord)
    }

    console.log('Location found, updating user...');
    const data = await updateUser(supabase, userData, user.id, locationRecord.id);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
