import { Link } from 'react-router-dom';
import logo from '../assets/IMG-20260413-WA0000.jpg';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <img src={logo} alt="BCC Logo" style={{ height: '42px', width: 'auto' }} className="me-2" />
              <div>
                <h5 className="text-white-50 mb-0">BCC Building Creators And Consulting</h5>
                <p className="text-white-50 small mb-0">Trusted construction and engineering partner.</p>
              </div>
            </div>
            <p className="text-muted mb-0">
              Delivering trusted construction, engineering, and survey solutions with quality, safety, and professionalism.
            </p>
          </div>

          <div className="col-md-4 text-center">
            <h5 className="mb-3 text-white">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><Link className="text-white text-decoration-none d-block mb-2" to="/services">Services</Link></li>
              <li><Link className="text-white text-decoration-none d-block mb-2" to="/projects">Projects</Link></li>
              <li><Link className="text-white text-decoration-none d-block mb-2" to="/careers">Careers</Link></li>
              <li><Link className="text-white text-decoration-none d-block" to="/contact">Contact</Link></li>
              <li><Link className="text-white text-decoration-none d-block" to="/gallery">Gallery</Link></li>
              <li><Link className="text-white text-decoration-none d-block" to="/blog">Blog</Link></li>

            </ul>
          </div>

          <div className="col-md-4 text-center text-md-end">
            <h5 className="mb-3 text-white">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-white fs-4" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white fs-4" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white fs-4" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white fs-4" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white fs-4" aria-label="YouTube"><i className="bi bi-youtube"></i></a>  
              <a href="#" className="text-white fs-4" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
          <span>© Copyright 2018 BUILDING CREATORS AND CONSULTING  | All Rights Reserved.</span>
          <div>
            <a className="text-white-50 text-decoration-none me-3" href="#">Privacy Policy</a>
            <a className="text-white-50 text-decoration-none" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
