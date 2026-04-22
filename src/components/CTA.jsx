import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="cta-section text-white text-center py-5">
      <div className="container">
        <h3 className="mb-3">Ready to Start Your Project?</h3>
        <p className="mb-4 text-white-75">Get a free consultation and let us help you turn your vision into reality with expert planning and execution.</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/contact" className="btn btn-light btn-lg">Get Free Consultation</Link>
          <a href="tel:+919876543210" className="btn btn-outline-light btn-lg">Schedule a Call</a>
        </div>
      </div>
    </section>
  );
}
