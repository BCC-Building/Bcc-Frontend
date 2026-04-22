import { Link } from 'react-router-dom';

const pageCards = [
  {
    title: 'About Us',
    description: 'Learn who we are, our mission, and how we deliver construction and consulting excellence.',
    link: '/about',
    button: 'Read About Us',
  },
  {
    title: 'Our Services',
    description: 'Explore our services including architecture, engineering, soil investigation, material testing, and land survey.',
    link: '/services',
    button: 'View Services',
  },
  {
    title: 'Projects',
    description: 'Browse recent projects and success stories that showcase our construction and consulting work.',
    link: '/projects',
    button: 'See Projects',
  },
  {
    title: 'Contact',
    description: 'Get in touch for a free consultation, quote, or to discuss your next project.',
    link: '/contact',
    button: 'Contact Us',
  },
];

export default function PageOverview() {
  return (
    <section className="py-5 bg-white" id="overview-pages">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Explore Our Digital Services</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Navigate our core solutions and discover how we help businesses grow with construction, engineering, and digital support.
          </p>
        </div>
        <div className="row g-4">
          {pageCards.map((card, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow page-card p-4 d-flex flex-column">
                <h5>{card.title}</h5>
                <p className="text-muted flex-grow-1">{card.description}</p>
                <Link to={card.link} className="btn btn-outline-primary mt-3">
                  {card.button}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
