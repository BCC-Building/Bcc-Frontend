import { i } from 'framer-motion/client';
import SectionHeader from '../ui/SectionHeader';
import Archi from '../../assets/archi.jpg'; 

export default function AboutStory() {
  return (
    <section className="container mx-auto px-6 py-24 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Our Story"
            title="Who We Are"
            description="BCC was founded to redefine construction and consulting services with integrity, innovation and measurable outcomes. Our multidisciplinary team brings together deep industry expertise and modern delivery methods."
          />
          <p className="text-slate-600 leading-8">
            From residential and commercial construction to strategic consulting and intelligent digital solutions, BCC is a trusted partner for clients who demand excellence and long-term performance.
          </p>
        </div>
        <div className="rounded-[36px] overflow-hidden shadow-soft">
          <img
            src={Archi}
            alt="Modern engineering office environment"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
