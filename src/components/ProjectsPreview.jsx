import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'Luxury Residential Villa',
    subtitle: 'Residential Construction',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Commercial Complex',
    subtitle: 'Office & Retail Development',
    image: 'https://images.unsplash.com/photo-1529429617124-1c7fe8c9f576?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'IT Office Setup',
    subtitle: 'Interior & Digital Solutions',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ProjectsPreview() {
  return (
    <section className="py-5 projects-preview-section">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div>
            <h2>Recent Projects</h2>
            <p className="text-muted mb-0">Our recent work spans construction, consulting and digital transformation projects.</p>
          </div>
          <Link to="/projects" className="btn btn-outline-primary mt-3 mt-md-0">
            View All Projects
          </Link>
        </div>
        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={index} className="col-md-4">
              <div className="card project-card overflow-hidden border-0 shadow-lg h-100">
                <img src={project.image} alt={project.title} className="card-img-top" />
                <div className="card-body">
                  <h5>{project.title}</h5>
                  <p className="text-muted mb-3">{project.subtitle}</p>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
