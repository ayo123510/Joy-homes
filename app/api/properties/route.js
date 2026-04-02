
// app/api/properties/route.js


import { NextResponse } from 'next/server';
import  supabase  from '../../../lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase.from('properties').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Ensure price is always a number
  const formattedData = data.map(property => ({
    ...property,
    price: Number(property.price),
  }));

  // 👇 Log the raw data from Supabase
  console.log('Properties from Supabase:', data);

  return NextResponse.json(formattedData);
}

