const experts = [
  {
    name: 'Dr. Arjun Mehta',
    position: 'Chief Architect',
    experience: '15+ years',
    specialization: 'Architectural Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Eng. Sunita Rao',
    position: 'Structural Engineer',
    experience: '12+ years',
    specialization: 'Structural Engineering',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Dr. Vikram Singh',
    position: 'Geotechnical Expert',
    experience: '10+ years',
    specialization: 'Soil Investigation',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Eng. Meera Joshi',
    position: 'Materials Specialist',
    experience: '8+ years',
    specialization: 'Material Testing',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
];

export default function Experts() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Meet Our Experts</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Our team of professionals delivers precise engineering, design excellence, and reliable project execution.
          </p>
        </div>
        <div className="row g-4">
          {experts.map((expert, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow expert-card p-4 text-center">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h5>{expert.name}</h5>
                <p className="text-primary mb-2">{expert.position}</p>
                <p className="text-muted small mb-2">{expert.experience}</p>
                <p className="text-muted small">{expert.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}