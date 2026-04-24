import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { teamMembers } from '../../data/teamMembers';

const TeamSection = () => {
  // Show only first 3 members on About page
  const featuredMembers = teamMembers.slice(0, 3);

  return (
    <section className="team-section">
      <div className="container">
        <SectionHeader 
          badge="Leadership"
          title="Meet Our Visionaries"
          subtitle="Industry veterans driving excellence"
        />
        
        <div className="team-grid">
          {featuredMembers.map((member, idx) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={idx}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* 🔥 FIX 1: Circular Avatar */}
                <div 
                  className="team-avatar"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 16px',
                    border: '3px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f3f4f6',
                  }}
                >
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <Icon style={{ fontSize: '48px', color: '#6b7280' }} />
                  )}
                </div>
                
                <h4>{member.name}</h4>
                <p className="team-title">{member.title}</p>
                <p className="team-role">{member.role}</p>
                
                <div className="team-expertise">
                  {member.expertise.map((exp, i) => (
                    <span key={i} className="expertise-tag">{exp}</span>
                  ))}
                </div>
                
                <div className="team-experience">{member.experience}</div>
                
                <div className="team-social">
                  <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                  <a href="#" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" aria-label="Email"><FaEnvelope /></a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 🔥 FIX 2: View All Button with Custom Color */}
        <motion.div 
          className="text-center mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/team" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '16px',
              borderRadius: '50px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
            }}
          >
            View All Team Members <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;