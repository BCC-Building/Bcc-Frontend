import Testimonials from '../Testimonials';
import SectionHeader from '../ui/SectionHeader';

export default function AboutFounder() {
  return (
    <section className="container mx-auto px-6 py-24 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-soft">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-semibold text-white shadow-sm">
              RS
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Founder & Managing Director</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Er. Yaseen Ahmad Khan </h3>
            </div>
          </div>
          <SectionHeader
            eyebrow="Founder’s Message"
            title="Leadership rooted in trust and technical excellence"
            description="At BCC, every project is built on responsibility, high standards and long-term client success. We deliver solutions that balance innovation and practicality."
          />
          <p className="text-slate-600 leading-8">
            “At BCC, our goal is simple – to turn your vision into reality with trust, quality and innovation. Every project we take is a responsibility we deliver with excellence.”
          </p>
          <div className="mt-8 text-sm text-slate-500">
            <p className="font-semibold text-slate-900">Er. Yaseen Ahmad Khan</p>
            <p>Founder & Managing Director</p>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Team Testimonials"
            title="What our clients and partners say"
            description="Real feedback from stakeholders who trust BCC for complex engineering projects and advisory services."
          />
          <Testimonials />
        </div>
      </div>
    </section>
  );
}
