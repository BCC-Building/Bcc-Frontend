import { motion } from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';
import { stats } from '../../data/stats';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  <Icon />
                </div>
                <h2 className="stat-value">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h2>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;