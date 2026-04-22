import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="py-5">
      <div className="container text-center">
        <h1 className="display-4">Page Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    </main>
  );
}
