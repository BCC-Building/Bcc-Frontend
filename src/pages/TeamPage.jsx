import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { teamMembers } from '../data/teamMembers';

const TeamPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Team | BCC Construction & Consulting</title>
        <meta name="description" content="Meet the expert team behind BCC - industry veterans with 15+ years of experience in construction and consulting." />
      </Helmet>

      <section className="team-page-section">
        <div className="container">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <Link to="/about" className="back-btn">
              <FaArrowLeft /> Back to About
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-badge">Our Experts</div>
            <h1 className="section-title">Meet the BCC Team</h1>
            <p>The brilliant minds behind our success</p>
          </motion.div>

          {/* Team Grid */}
          <div className="team-page-grid">
            {teamMembers.map((member, idx) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={idx}
                  className="team-card team-card-detailed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="team-avatar-large">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="team-photo-large" />
                    ) : (
                      <Icon />
                    )}
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-title-large">{member.title}</p>
                  <p className="team-role-large">{member.role}</p>
                  <div className="team-expertise">
                    {member.expertise.map((exp, i) => (
                      <span key={i} className="expertise-tag">{exp}</span>
                    ))}
                  </div>
                  <div className="team-experience-badge">{member.experience} Experience</div>
                  
                  {/* Additional Details (You can expand) */}
                  <div className="team-bio">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                  </div>
                  
                  <div className="team-social-large">
                    <a href="#"><FaLinkedin /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaEnvelope /></a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .team-page-section {
          padding: 80px 0;
          background: #f8fafc;
          min-height: 100vh;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
          transition: gap 0.3s ease;
        }

        .back-btn:hover {
          gap: 12px;
          color: #1d4ed8;
        }

        .team-page-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }

        .team-card-detailed {
          background: white;
          border-radius: 24px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .team-avatar-large {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 60px;
          color: white;
          overflow: hidden;
        }

        .team-photo-large {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .team-card-detailed h3 {
          font-size: 1.5rem;
          margin-bottom: 5px;
          color: #1e293b;
        }

        .team-title-large {
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .team-role-large {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }

        .team-experience-badge {
          display: inline-block;
          background: #e0e7ff;
          color: #2563eb;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          margin: 16px 0 12px;
        }

        .team-bio {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 20px;
          padding: 0 5px;
        }

        .team-social-large {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .team-social-large a {
          color: #64748b;
          font-size: 1.2rem;
          transition: color 0.3s ease;
        }

        .team-social-large a:hover {
          color: #2563eb;
        }

        @media (max-width: 768px) {
          .team-page-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default TeamPage;