import { Link } from 'react-router-dom';


export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="container mx-auto px-6 py-24 relative lg:px-10">
        <div className="max-w-3xl">
          <span className="section-label text-cyan-300">About BCC</span>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building Trust, Creating Excellence
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            We deliver innovative construction, smart consulting and technology-driven solutions with commitment and premium quality.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="hero-cta-btn hero-cta-btn-primary">
              Contact Us
            </Link>
            <Link to="/services" className="hero-cta-btn hero-cta-btn-secondary">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
