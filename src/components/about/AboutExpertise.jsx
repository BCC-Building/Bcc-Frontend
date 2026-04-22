import SectionHeader from '../ui/SectionHeader';
import ExpertiseCard from '../ui/ExpertiseCard';
import { expertiseBlocks } from './aboutData';

export default function AboutExpertise() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Core Expertise"
          description="Engineering and consulting services that span construction, advisory and digital transformation for modern projects."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {expertiseBlocks.map((item) => (
            <ExpertiseCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
