import SectionHeader from '../ui/SectionHeader';
import StatCard from '../ui/StatCard';
import { aboutStats } from './aboutData';

export default function AboutStats() {
  return (
    <section className="container mx-auto px-6 py-24 lg:px-10">
      <SectionHeader
        eyebrow="Numbers That Matter"
        title="Our Track Record"
        description="A strong performance history across engineering projects, client satisfaction and expert delivery."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {aboutStats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
