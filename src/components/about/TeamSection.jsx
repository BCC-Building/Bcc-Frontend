// src/components/about/TeamSection.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope, FaArrowRight, FaUser } from 'react-icons/fa';
import { publicAPI } from '../../api/endpoints';
import { getImageUrl } from '../../api/clients';

const FEATURED_COUNT = 3;

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const response = await publicAPI.getActiveTeamMembers();
        if (response.data?.success) {
          setTeamMembers((response.data.data || []).slice(0, FEATURED_COUNT));
        }
      } catch (err) {
        console.error('Team section fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  if (!isLoading && teamMembers.length === 0) return null;

  return (
    <section className="team-section py-5 bg-white" aria-label="Our team">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.82rem' }}>
            Our Experts
          </span>
          <h2 className="mt-2 mb-3 fw-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Meet Our Visionaries
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Industry veterans driving excellence with decades of combined experience
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="row g-4">
            {Array.from({ length: FEATURED_COUNT }).map((_, i) => (
              <div key={i} className="col-md-4">
                <div className="text-center p-4 rounded-4 border animate-pulse">
                  <div className="bg-gray-200 rounded-circle mx-auto mb-3" style={{ width: '120px', height: '120px' }} />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!isLoading && teamMembers.length > 0 && (
          <div className="row g-4">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id || idx}
                className="col-md-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-center p-4 rounded-4 border bg-white h-100" style={{ borderColor: '#f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  
                  {/* Avatar */}
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center overflow-hidden"
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: !member.profileImageUrl || imageErrors[member.id]
                        ? 'linear-gradient(135deg, #2563eb, #06b6d4)'
                        : 'transparent',
                    }}
                  >
                    {member.profileImageUrl && !imageErrors[member.id] ? (
                      <img
                        src={getImageUrl(member.profileImageUrl)}
                        alt={member.name}
                        className="w-100 h-100 object-fit-cover"
                        loading="lazy"
                        onError={() => handleImageError(member.id)}
                      />
                    ) : (
                      <FaUser style={{ fontSize: '3rem', color: 'white' }} />
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="fw-bold mb-1" style={{ fontSize: '1.1rem', color: '#1e293b' }}>
                    {member.name}
                  </h4>

                  {/* Designation */}
                  <p className="text-primary fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>
                    {member.designation}
                  </p>

                  {/* Department */}
                  {member.department && (
                    <p className="text-muted mb-2" style={{ fontSize: '0.82rem' }}>
                      {member.department}
                    </p>
                  )}

                  {/* Qualifications */}
                  {member.qualifications?.length > 0 && (
                    <div className="d-flex flex-wrap justify-content-center gap-1 mb-3">
                      {member.qualifications.slice(0, 2).map((qual, i) => (
                        <span key={i} className="bg-light text-muted px-2 py-1 rounded-pill" style={{ fontSize: '0.7rem' }}>
                          {qual}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Experience */}
                  {member.yearsOfExperience && (
                    <div className="d-inline-block bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill fw-semibold mb-3" style={{ fontSize: '0.78rem' }}>
                      {member.yearsOfExperience}+ Years
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="d-flex justify-content-center gap-3 pt-2 border-top">
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted" style={{ fontSize: '1.1rem' }} aria-label={`${member.name}'s LinkedIn`}>
                        <FaLinkedinIn />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-muted" style={{ fontSize: '1.1rem' }} aria-label={`Email ${member.name}`}>
                        <FaEnvelope />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/team" className="btn btn-primary px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2" style={{ borderRadius: '50px' }}>
            Meet Our Experts <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}