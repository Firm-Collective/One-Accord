import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';
import { getUser } from '@/utils/supabase/auth';
import { type ProfileSchemaType } from '@/components/authentication/schemas';
import axios from 'axios';

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

const insertUserLocation = async (supabase: any, userData: ProfileSchemaType) => {
  const { data, error } = await supabase
    .from('Location')
    .insert({
      country: userData.country,
      city: userData.city,
      latitude: '-96.66886389924726', // Update with userData.latitude
      longitude: '53.487091209273714', // Update with userData.longitude
    })
    .select();

  if (error) {
    console.error('Error inserting user location:', error);
    throw new Error('An error occurred during location insertion.');
  }

  return data;
};

const updateUser = async (supabase: any, userData: ProfileSchemaType, user: string, location: string) => {
  const { data, error } = await supabase
    .from('User')
    .update({
      username: userData.username,
      birth_year: userData.birth_year,
      user_location_id: location,
      updated_at: new Date(),
    })
    .eq('id', user)
    .select();

  if (error) {
    console.error('Error updating user:', error);
    throw new Error('An error occurred during user updating.');
  }

  return data;
};

const getRandomCoordinates = async (country: String, city: String) => {
  const API_KEY = 'cda37fdc20ac42e2bf537ee741bef6a7';

  // current api has 2500 rate limit but doesn't require billing details (that's why I used it)
  const API_END_URL = 'https://api.opencagedata.com/geocode/v1/json';

  // Below url has a 30 000 monthly rate limit
  // code to get random coords is the same but boundingBox = data.items[0].mapView
  // https://geocode.search.hereapi.com/v1/geocode

  const response = await axios.get(`${API_END_URL}?q=${city}+${country}&key=${API_KEY}`);
  const data = response.data;
  const boundingBox = data.results[0].bounds;

  // generate a random lat and long within the bounding box
  const randomLat = Math.random() * (boundingBox.northeast.lat - boundingBox.southwest.lat) + boundingBox.southwest.lat;
  const randomLong =
    Math.random() * (boundingBox.northeast.lng - boundingBox.southwest.lng) + boundingBox.southwest.lng;

  return { latitude: randomLat, longitude: randomLong };
};

export async function POST(request: Request) {
  const supabase = createClient();
  const userData = await request.json();
  //TODO: Add the latitude & longitude random with the country and city (find the API) and change these values
  const { country, city } = userData;

  const location = await getRandomCoordinates(country, city);

  const latitude = location.latitude; // Update with userData.latitude
  const longitude = location.longitude; // Update with userData.longitude

  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Check if the latitude & longitude exist before
    const locationExisted = await fetchLocation(supabase, latitude, longitude);

    if (!locationExisted) {
      console.log('Location not found, inserting new location...');
      const location = await insertUserLocation(supabase, userData);
      const data = await updateUser(supabase, userData, user.id, location.id);
      return NextResponse.json({ success: true, data });
    }

    console.log('Location found, updating user...');
    const data = await updateUser(supabase, userData, user.id, locationExisted.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
