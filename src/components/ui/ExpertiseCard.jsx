import { Link } from 'react-router-dom';

export default function ExpertiseCard({ icon, title, description, colorClass = 'text-brand-600' }) {
  return (
    <article className="expertise-card rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow h-full">
      <div className={`expertise-icon mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-50 ${colorClass}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <Link to="/services" className="mt-5 inline-flex text-sm font-semibold text-brand-600">
        Learn More →
      </Link>
    </article>
  );
}
