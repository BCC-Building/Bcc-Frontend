export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const containerClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${containerClass} mb-10`}> 
      {eyebrow && (
        <span className="section-label text-brand-600">{eyebrow}</span>
      )}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
