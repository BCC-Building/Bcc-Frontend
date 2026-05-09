// src/pages/ProjectsPage.jsx
import SEO from '../components/SEO';
import Projects from '../components/Projects';

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Our Projects | BCC Construction & Consulting"
        description="Explore BCC's portfolio of completed and ongoing construction, engineering, and consulting projects across India."
        url="https://bcc.net.in/projects"
      />
      <main>
        <Projects />
      </main>
    </>
  );
}