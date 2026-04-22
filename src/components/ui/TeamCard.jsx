export default function TeamCard({ initials, name, title, role, experience }) {
  return (
    <article className="team-card rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow h-full">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white shadow-sm">
        {initials}
      </div>
      <h4 className="text-xl font-semibold text-slate-900">{name}</h4>
      <p className="mt-2 text-sm font-semibold text-brand-600">{title}</p>
      <p className="mt-3 text-sm text-slate-600">{role}</p>
      <p className="mt-4 text-sm text-slate-500">{experience}</p>
    </article>
  );
}
