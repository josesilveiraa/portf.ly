import { Metadata } from 'next';
import ProjectList from './components/home/ProjectList';

export const metadata: Metadata = {
  title: 'Portf.ly - Projects',
  description: 'Welcome to Portf.ly',
};

export default function Home() {
  return (
    <div className="container mx-auto flex justify-center">
      {/* @ts-expect-error Server Component */}
      <ProjectList />
    </div>
  );
}
