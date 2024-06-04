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

// memoization for api calls
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

const getRandomCoordinates = async (country: string, city: string) => {
  let boundingBox: BoundingBox = {
    // place holder bounding box
    northeast: { lat: -96.66886389924726, lng: 53.487091209273714 },
    southwest: { lat: -96.66886389924726, lng: 53.487091209273714 },
  };

  const key = `${country}-${city}`;

  // if we have the country / city cached, then use it instead of calling api
  if (key in memo) {
    boundingBox = memo[key];
  } else {
    // otherwise, call the api and get data
    try {
      const response = await axios.get(
        `${process.env.GEOCODE_URL}?q=${city}+${country}&key=${process.env.GEOCODE_API_KEY}`,
      );
      const data = response.data;
      if (data.results.length !== 0) {
        boundingBox = data.results[0].bounds;
      }
    } catch (error) {
      console.error('Error grabbing coordinates from user city and country.');
    }
  }

  const randomLat = Math.random() * (boundingBox.northeast.lat - boundingBox.southwest.lat) + boundingBox.southwest.lat;
  const randomLong =
    Math.random() * (boundingBox.northeast.lng - boundingBox.southwest.lng) + boundingBox.southwest.lng;

  // input into memo
  memo[key] = boundingBox;

  return { latitude: randomLat.toString(), longitude: randomLong.toString() };
};

export async function POST(request: Request) {
  const supabase = createClient();
  const userData: ProfileSchemaType = await request.json();

  const location = await getRandomCoordinates(userData.country || 'unknown', userData.city || 'unknown');

  const latitude = location.latitude;
  const longitude = location.longitude;

  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Check if the latitude & longitude exist before
    let locationRecord = await fetchLocation(supabase, latitude, longitude);

    if (!locationRecord) {
      console.log('Location not found, inserting new location...');
      locationRecord = await insertUserLocation(supabase, userData, latitude, longitude);
    }

    console.log('Location found, updating user...');
    const data = await updateUser(supabase, userData, user.id, locationRecord.id);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
