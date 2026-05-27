// src/pages/ProjectsPage.jsx
import SEO from '../components/SEO';
import ProjectsHero from '../components/projects/ProjectsHero';
import Projects from '../components/Projects';

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Projects | BCC Construction & Engineering Portfolio"
        description="Explore BCC's 1200+ successful projects in structural engineering, architecture, soil investigation & construction consulting across India since 2017."
        keywords="construction projects, engineering projects, structural projects, portfolio projects, BCC projects, case studies"
        url="https://bcc.net.in/projects"
        image="https://bcc.net.in/og-projects.jpg"
      />
      <main>
        <ProjectsHero />
        <Projects />
      </main>
    </>
  );
}