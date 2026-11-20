import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUsers } from 'react-icons/fa';

const HERO_STATS = [
  { value: '40+', label: 'Professionals' },
  { value: '15+', label: 'Specializations' },
  { value: '200+', label: 'Years of experience' },
];

export default function TeamHero() {
  return (
    <section className="team-hero" aria-label="Meet the BCC team">
      <img
        className="team-hero__image"
        src="/images/team/team-gathering.png"
        alt="BCC team celebrating together at an office gathering"
      />
      <div className="team-hero__overlay" />

      <div className="team-hero__container">
        <motion.div
          className="team-hero__content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="team-hero__eyebrow">
            <FaUsers aria-hidden="true" />
            <span>Meet the BCC team</span>
          </div>

          <h1>People who bring every project to life.</h1>
          <p>
            Get to know the architects, engineers, surveyors, and project
            specialists behind our thoughtful, dependable work.
          </p>

          <div className="team-hero__actions">
            <a className="team-hero__button team-hero__button--primary" href="#team-members">
              Meet our experts <FaArrowRight aria-hidden="true" />
            </a>
            <Link className="team-hero__button team-hero__button--secondary" to="/careers">
              Join our team
            </Link>
          </div>

          <div className="team-hero__stats" aria-label="Team highlights">
            {HERO_STATS.map((stat) => (
              <div className="team-hero__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .team-hero {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 82vh;
          overflow: hidden;
          background: #101923;
        }
        .team-hero__image,
        .team-hero__overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .team-hero__image {
          object-fit: cover;
          object-position: center 45%;
        }
        .team-hero__overlay {
          background: linear-gradient(
            90deg,
            rgba(9, 17, 28, 0.94) 0%,
            rgba(9, 17, 28, 0.82) 42%,
            rgba(9, 17, 28, 0.28) 100%
          );
        }
        .team-hero__container {
          position: relative;
          z-index: 1;
          width: min(1160px, 100%);
          margin: 0 auto;
          padding: 88px 24px;
        }
        .team-hero__content {
          max-width: 650px;
          color: #fff;
        }
        .team-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: #e6b27a;
          font: 600 0.78rem/1.2 'Jost', sans-serif;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .team-hero__content h1 {
          max-width: 620px;
          margin: 0 0 18px;
          color: #fff;
          font: 500 clamp(2.6rem, 5.4vw, 4.65rem)/1.08 'Cormorant Garamond', Georgia, serif;
          letter-spacing: -0.02em;
        }
        .team-hero__content p {
          max-width: 540px;
          margin: 0;
          color: rgba(255, 255, 255, 0.82);
          font: 400 1rem/1.75 'Jost', sans-serif;
        }
        .team-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }
        .team-hero__button {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 22px;
          border: 1px solid transparent;
          border-radius: 4px;
          font: 600 0.9rem/1 'Jost', sans-serif;
          text-decoration: none;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .team-hero__button:hover {
          transform: translateY(-2px);
        }
        .team-hero__button--primary {
          background: #c8864a;
          color: #111827;
        }
        .team-hero__button--primary:hover {
          background: #dda66d;
          color: #111827;
        }
        .team-hero__button--secondary {
          border-color: rgba(255, 255, 255, 0.55);
          color: #fff;
        }
        .team-hero__button--secondary:hover {
          border-color: #fff;
          color: #fff;
        }
        .team-hero__stats {
          display: flex;
          flex-wrap: wrap;
          gap: 28px;
          margin-top: 44px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.24);
        }
        .team-hero__stat {
          display: grid;
          gap: 5px;
        }
        .team-hero__stat strong {
          color: #e6b27a;
          font: 500 1.65rem/1 'Cormorant Garamond', Georgia, serif;
        }
        .team-hero__stat span {
          color: rgba(255, 255, 255, 0.72);
          font: 400 0.74rem/1.4 'Jost', sans-serif;
          letter-spacing: 0.04em;
        }
        @media (max-width: 640px) {
          .team-hero {
            min-height: 0;
          }
          .team-hero__image {
            object-position: 55% center;
          }
          .team-hero__overlay {
            background: linear-gradient(
              90deg,
              rgba(9, 17, 28, 0.88) 0%,
              rgba(9, 17, 28, 0.74) 100%
            );
          }
          .team-hero__container {
            padding: 76px 22px 56px;
          }
          .team-hero__content h1 {
            font-size: clamp(2.5rem, 12vw, 3.5rem);
          }
          .team-hero__stats {
            gap: 20px;
            margin-top: 34px;
          }
          .team-hero__stat {
            flex: 1 1 90px;
          }
        }
      `}</style>
    </section>
  );
}
