import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const url = `https://api.mapbox.com/styles/v1/firmcollective/clwz4ftkv01bf01pp06wl1wl9?sdk=js-3.3.0&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('There was an error grabbing your mapbox styles: ' + error);
    return NextResponse.json({ error: 'Could not get styles from mapbox', status: '401' });
  }
}
