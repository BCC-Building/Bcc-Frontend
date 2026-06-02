import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function Testimonials({ limit = 5 }) {
  const [reviews, setReviews] = useState([]);
  const [placeUrl, setPlaceUrl] = useState('');

  useEffect(() => {
    let mounted = true;
    fetch('/reviews.json')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setPlaceUrl(data.placeUrl || '');
        setReviews((data.reviews || []).slice(0, limit));
      })
      .catch(() => {
        // silent fail; keep component empty if no reviews
      });
    return () => (mounted = false);
  }, [limit]);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section style={{ marginTop: 40 }} aria-label="Client testimonials">
      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
        {reviews.map((r, i) => (
          <article
            key={i}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: 18,
              boxShadow: '0 8px 30px rgba(16,24,40,0.06)',
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <img
                  src={r.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=ddd&color=333`}
                  alt={r.author_name}
                  style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }}
                />

                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{r.author_name}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{r.relative_time_description}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FaStar key={idx} size={12} color={idx < Math.round(r.rating || 0) ? '#F59E0B' : '#E6E7EA'} />
                ))}
              </div>

              <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{r.text}</p>
            </div>

            <div style={{ marginTop: 12, textAlign: 'right' }}>
              {r.author_url && (
                <a href={r.author_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#2563EB', fontWeight: 700 }}>
                  View on Google
n                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {placeUrl && (
        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <a href={placeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0ea5a4', fontWeight: 800 }}>
            Read more reviews on Google
          </a>
        </div>
      )}
    </section>
  );
}
