import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';
import { getUser } from '@/utils/supabase/auth';
import { type ProfileSchemaType } from '@/components/authentication/schemas';

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
      user_type_id: userData.user_type_id,
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

export async function POST(request: Request) {
  const supabase = createClient();
  const userData = await request.json();
  //TODO: Add the latitude & longitude random with the country and city (find the API) and change these values
  const latitude = '-96.66886389924726'; // Update with userData.latitude
  const longitude = '53.487091209273714'; // Update with userData.longitude

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
