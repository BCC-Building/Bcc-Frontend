import FeatureCard from '../ui/FeatureCard';
import SectionHeader from '../ui/SectionHeader';
import { purposeBlocks } from './aboutData';

export default function AboutPurpose() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Our Purpose"
          title="Mission, Vision & Values"
          description="We create a strong foundation for every project through a shared purpose: to deliver trusted engineering results, empower clients and build lasting value."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {purposeBlocks.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
