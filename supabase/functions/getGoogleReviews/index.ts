
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY')
const PLACE_ID = "ChIJc0HHe0tHHRUR4G4V7hGPL08"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Fetching Google Place details with Place ID:', PLACE_ID)
    
    if (!GOOGLE_API_KEY) {
      console.error('Missing Google API key')
      throw new Error('Missing Google API key')
    }
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`
    console.log('Fetching from URL:', url.replace(GOOGLE_API_KEY, 'REDACTED'))
    
    const response = await fetch(url)
    
    if (!response.ok) {
      console.error(`Google API error: ${response.status} ${response.statusText}`)
      throw new Error(`Google API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Response status:', data.status)
    
    if (data.status !== 'OK') {
      console.error('Google API returned non-OK status:', data.status)
      console.error('Error message:', data.error_message)
      throw new Error(`Google API error: ${data.status}`)
    }
    
    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch reviews', details: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})
