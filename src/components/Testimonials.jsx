const testimonials = [
  {
    name: 'Rajesh Kumar',
    position: 'Project Manager',
    company: 'ABC Constructions',
    review: 'BCC provided exceptional architectural design and structural engineering for our commercial project. Their attention to detail and timely delivery exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    position: 'Property Developer',
    company: 'Sharma Realty',
    review: 'The soil investigation and land survey services were thorough and accurate. BCC helped us avoid costly mistakes and ensured our foundation was solid.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    position: 'Construction Manager',
    company: 'Patel Builders',
    review: 'Outstanding material testing services. Their NDT testing helped us maintain the highest quality standards throughout our construction process.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2>What Our Clients Say</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Client success is our top priority. Read their short reviews and learn why they trust BCC.
          </p>
        </div>
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm testimonial-card p-4">
                <div className="mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                  ))}
                </div>
                <p className="card-text mb-4">"{testimonial.review}"</p>
                <div>
                  <h6 className="mb-1">{testimonial.name}</h6>
                  <p className="text-muted small mb-0">{testimonial.position}</p>
                  <p className="text-muted small">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}