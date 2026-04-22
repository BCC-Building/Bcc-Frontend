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
    <section id="contact" className="contact-page">
      
      {/* 🔥 HERO SECTION */}
      <div className="contact-hero text-white position-relative">
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
                    'Let’s Build Together', 2000,
                    'Start Your Project Today', 2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="lead text-white mt-3"
              >
                Let's connect and build something great. Our team is ready to help you turn your vision into reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-4 d-flex gap-3 flex-wrap"
              >
                <a href="tel:+919876543210" className="btn btn-light px-4">
                  📞 Call Now
                </a>
                <a href="#contact" className="btn btn-outline-light px-4">
                  Get Quote
                </a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* CONTACT INFO CARDS */}
      <div className="container py-5">
        <div className="row gy-4">
          {[
            {
              icon: 'bi-telephone-fill',
              title: 'Call Us',
              text: '+91 98765 43210',
              sub: 'Mon - Sat: 9:00 AM - 7:00 PM',
              color: 'bg-primary',
            },
            {
              icon: 'bi-envelope-fill',
              title: 'Email Us',
              text: 'info@bcc.net.in',
              sub: 'We reply within 24 hours',
              color: 'bg-success',
            },
            {
              icon: 'bi-geo-alt-fill',
              title: 'Visit Us',
              text: 'Guru Angad Dev Complex,4th Floor, Rudrapur,(U.S.Nagar)',
              sub: 'Uttrakhand - India',
              color: 'bg-warning',
            },
            {
              icon: 'bi-clock-fill',
              title: 'Business Hours',
              text: 'Mon - Sat: 9:00 AM - 7:00 PM',
              sub: 'Sunday: Closed',
              color: 'bg-info',
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
              <div className="contact-card p-4 h-100 shadow-sm rounded-4">
                <div className={`icon-box ${item.color} text-white mb-3`}>
                  <i className={`bi ${item.icon} fs-4`}></i>
                </div>
                <h5>{item.title}</h5>
                <p className="text-muted mb-1">{item.text}</p>
                <small className="text-muted">{item.sub}</small>
              </div>
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
            >
              <h4 className="mb-4">Send Us a Message</h4>

              {submitted && (
                <div className="alert alert-success">
                  Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input className="form-control mb-3" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}/>
                <input className="form-control mb-3" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                <input className="form-control mb-3" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}/>
                <textarea className="form-control mb-3" name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>

                <button className="btn btn-primary w-100">Send Message</button>
              </form>
            </motion.div>
          </div>

          <div className="col-xl-7">
            <motion.div
              className="map-card rounded-4 overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <iframe
                title="map"
                className="w-100"
                style={{ minHeight: '420px', border: 0 }}
                src="https://www.google.com/maps?q=Guru+Angad+Dev+Complex%2C4th+Floor%2C+Rudrapur%2C(U.S.Nagar)Uttrakhand&output=embed"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}