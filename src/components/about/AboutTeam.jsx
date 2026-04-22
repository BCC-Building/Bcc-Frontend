import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import TeamCard from '../ui/TeamCard';
import { teamMembers } from './aboutData';

export default function AboutTeam() {
  return (
    <section className="container mx-auto px-6 py-24 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionHeader
            eyebrow="Meet The Experts"
            title="Our Expert Team"
            description="Experienced leaders across civil, consulting and digital practices who drive every project from concept to completion."
          />
        </div>
        <Link to="/contact" className="hero-cta-btn hero-cta-btn-secondary self-start lg:self-auto">
          Contact Our Team
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}
