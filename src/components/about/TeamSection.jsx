import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { teamMembers } from '../../data/teamMembers';

const TeamSection = () => {
  // Show only first 3 members on About page (change to 2 if needed)
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
                <div className="team-avatar">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="team-photo" />
                  ) : (
                    <Icon />
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
                  <a href="#"><FaLinkedin /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaEnvelope /></a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Team Button */}
        <motion.div 
          className="text-center mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/team" className="view-all-btn">
            View All Team Members <FaArrowRight className="ms-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;