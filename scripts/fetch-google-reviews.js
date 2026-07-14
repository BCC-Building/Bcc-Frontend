

const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

if (!API_KEY || !PLACE_ID) {
  console.error('Missing env vars. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID');
  process.exit(1);
}

const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,formatted_phone_number,formatted_address,reviews,website,url&key=${API_KEY}`;

(async () => {
  try {
    const res = await axios.get(url);
    if (res.data.status !== 'OK') {
      console.error('Google Places API error:', res.data.status, res.data.error_message || '');
      process.exit(1);
    }

    const result = res.data.result;
    const payload = {
      fetchedAt: new Date().toISOString(),
      placeName: result.name,
      placeUrl: result.url,
      rating: result.rating || null,
      reviews: (result.reviews || []).map(r => ({
        author_name: r.author_name,
        profile_photo_url: r.profile_photo_url,
        rating: r.rating,
        relative_time_description: r.relative_time_description,
        text: r.text,
        author_url: r.author_url
      }))
    };

    fs.writeFileSync('public/reviews.json', JSON.stringify(payload, null, 2));
    console.log(`Saved public/reviews.json with ${payload.reviews.length} reviews`);
  } catch (err) {
    console.error('Request failed:', err.message || err);
    process.exit(1);
  }
})();
