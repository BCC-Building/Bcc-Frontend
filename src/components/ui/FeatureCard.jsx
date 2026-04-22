export default function FeatureCard({ icon, title, description }) {
  return (
    <article className="purpose-card group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-50 text-2xl text-brand-600 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
