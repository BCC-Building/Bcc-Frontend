import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Choose a service',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.service !== 'Choose a service' &&
      formData.message
    ) {
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: 'Choose a service',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <main aria-label="Contact page" id="contact" className="contact-page">
      
      {/* HERO SECTION */}
      <section className="contact-hero text-white position-relative" aria-label="Contact hero">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-info fw-semibold mb-2"
              >
                Get In Touch
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="display-5 fw-bold text-white"
              >
                <TypeAnimation
                  sequence={[
                    'Contact Us', 2000,
                    'Let\'s Build Together', 2000,
                    'Start Your Project Today', 2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  wrapper="span"
                  aria-label="Contact Us, Let's Build Together, Start Your Project Today"
                />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="lead text-white mt-3"
              >
                Let&apos;s connect and build something great. Our team is ready to help you turn your vision into reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-4 d-flex gap-3 flex-wrap"
              >
                <a 
                  href="tel:+919876543210" 
                  className="btn btn-light px-4"
                  aria-label="Call us at +91 98765 43210"
                >
                  📞 Call Now
                </a>
                <a 
                  href="#contact-form" 
                  className="btn btn-outline-light px-4"
                  aria-label="Go to contact form"
                >
                  Get Quote
                </a>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="container py-5" aria-label="Contact information">
        <h2 className="visually-hidden">Contact Details</h2>
        <div className="row gy-4">
          {[
            {
              icon: 'bi-telephone-fill',
              title: 'Call Us',
              text: '+91 98765 43210',
              sub: 'Mon - Sat: 9:00 AM - 7:00 PM',
              color: 'bg-primary',
              ariaLabel: 'Phone number: +91 98765 43210',
            },
            {
              icon: 'bi-envelope-fill',
              title: 'Email Us',
              text: 'info@bcc.net.in',
              sub: 'We reply within 24 hours',
              color: 'bg-success',
              ariaLabel: 'Email address: info@bcc.net.in',
            },
            {
              icon: 'bi-geo-alt-fill',
              title: 'Visit Us',
              text: 'Guru Angad Dev Complex, 4th Floor, Rudrapur, (U.S. Nagar)',
              sub: 'Uttarakhand - India',
              color: 'bg-warning',
              ariaLabel: 'Office address: Guru Angad Dev Complex, 4th Floor, Rudrapur',
            },
            {
              icon: 'bi-clock-fill',
              title: 'Business Hours',
              text: 'Mon - Sat: 9:00 AM - 7:00 PM',
              sub: 'Sunday: Closed',
              color: 'bg-info',
              ariaLabel: 'Business hours: Monday to Saturday, 9 AM to 7 PM, Sunday closed',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <article 
                className="contact-card p-4 h-100 shadow-sm rounded-4"
                aria-label={item.ariaLabel}
              >
                <div className={`icon-box ${item.color} text-white mb-3`} aria-hidden="true">
                  <i className={`bi ${item.icon} fs-4`}></i>
                </div>
                <h3 className="h5">{item.title}</h3>
                <p className="text-muted mb-1">{item.text}</p>
                <small className="text-muted">{item.sub}</small>
              </article>
            </motion.div>
          ))}
        </div>

        {/* FORM + MAP */}
        <div className="row gy-4 mt-4">
          <div className="col-xl-5">
            <motion.div
              className="contact-form-panel p-4 p-lg-5 rounded-4 shadow-lg"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id="contact-form"
            >
              <h2 className="h4 mb-4">Send Us a Message</h2>

              {submitted && (
                <div className="alert alert-success" role="alert">
                  ✅ Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} aria-label="Contact form" noValidate>
                <div className="mb-3">
                  <label htmlFor="fullName" className="visually-hidden">Full Name</label>
                  <input 
                    id="fullName"
                    className="form-control" 
                    name="fullName" 
                    placeholder="Full Name" 
                    value={formData.fullName} 
                    onChange={handleChange}
                    aria-required="true"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="visually-hidden">Email Address</label>
                  <input 
                    id="email"
                    className="form-control" 
                    name="email" 
                    type="email"
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange}
                    aria-required="true"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="visually-hidden">Phone Number</label>
                  <input 
                    id="phone"
                    className="form-control" 
                    name="phone" 
                    type="tel"
                    placeholder="Phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    aria-required="true"
                    required
                    autoComplete="tel"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="service" className="visually-hidden">Select Service</label>
                  <select 
                    id="service"
                    className="form-control" 
                    name="service" 
                    value={formData.service} 
                    onChange={handleChange}
                    aria-required="true"
                    required
                  >
                    <option value="Choose a service">Choose a service</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Interior">Interior Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="visually-hidden">Your Message</label>
                  <textarea 
                    id="message"
                    className="form-control" 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message} 
                    onChange={handleChange}
                    rows="4"
                    aria-required="true"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="btn btn-primary w-100"
                  aria-label="Submit contact form"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          <div className="col-xl-7">
            <motion.div
              className="map-card rounded-4 overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              aria-label="Google Maps location"
            >
              <iframe
                title="Building Creators And Consulting location on Google Maps"
                className="w-100"
                style={{ minHeight: '420px', border: 0 }}
                src="https://www.google.com/maps?q=Guru+Angad+Dev+Complex%2C4th+Floor%2C+Rudrapur%2C(U.S.Nagar)Uttrakhand&output=embed"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}