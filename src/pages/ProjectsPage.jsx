import SEO from '../components/SEO';
import Projects from '../components/Projects';

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="BCC Projects | Recent Construction & Consulting Work"
        description="See recent BCC projects across residential, commercial, engineering, and digital transformation engagements."
        url="https://bcc.example.com/projects"
      />
      <main>
        <Projects />
      </main>
    </>
  );
}
