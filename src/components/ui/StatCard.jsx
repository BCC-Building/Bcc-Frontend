export default function StatCard({ value, label, highlight }) {
  return (
    <div className="stat-card rounded-[28px] p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <p className="text-4xl font-semibold text-slate-900">{value}</p>
      <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-500">{label}</p>
      {highlight && <p className="mt-4 text-sm text-slate-600">{highlight}</p>}
    </div>
  );
}
