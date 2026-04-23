import SectionHeader from '../common/SectionHeader';
import Timeline from '../timeline/Timeline';

const TimelineSection = () => {
  return (
    <section className="timeline-section">
      <div className="container">
        <SectionHeader 
          badge="Our Journey"
          title="15 Years of Excellence"
          subtitle="Milestones that define our legacy"
        />
        <Timeline />
      </div>
    </section>
  );
};

export default TimelineSection;