import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';
import { getUser } from '@/utils/supabase/auth';
import { type ProfileSchemaType } from '@/components/authentication/schemas';
import axios from 'axios';
<<<<<<< HEAD

type BoundingBox = {
  northeast: { lat: number; lng: number };
  southwest: { lat: number; lng: number };
};
type Memo = {
  [key: string]: BoundingBox;
};

// memoization for api calls
const memo: Memo = {};
=======
>>>>>>> 5d3187c (added a function within /profile to get random coordinates from user country and city)

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
    const response = await axios.get(
      `${process.env.GEOCODE_URL}?q=${city}+${country}&key=${process.env.GEOCODE_API_KEY}`,
    );
    const data = response.data;
    if (data.results.length !== 0) {
      boundingBox = data.results[0].bounds;
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
  const userData = await request.json();
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
