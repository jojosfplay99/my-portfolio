import { useRouter } from './components/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import { ContactPage } from './pages/ContactPage';
import { Button } from './components/ui';
import { Link } from './components/router';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-6xl font-bold text-ink-700">404</p>
      <p className="mt-4 text-ink-400">This page doesn't exist — yet.</p>
      <Link to="/" className="mt-6">
        <Button variant="outline">Back home</Button>
      </Link>
    </div>
  );
}

function App() {
  const { route } = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-ink-900">
      <Navbar route={route} />
      <main className="flex-1">
        {route.name === 'home' && <HomePage />}
        {route.name === 'projects' && <ProjectsPage />}
        {route.name === 'project' && <ProjectPage id={route.id} />}
        {route.name === 'contact' && <ContactPage />}
        {route.name === 'notfound' && <NotFound />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
