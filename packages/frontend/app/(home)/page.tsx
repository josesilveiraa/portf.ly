import { Metadata } from 'next';
import ProjectList from '../components/home/ProjectList';

export const metadata: Metadata = {
  title: 'Portf.ly - Projects',
  description: 'Welcome to Portf.ly',
};

async function getData() {
  const res = await fetch('http://0.0.0.0:3333/api/v1/projects', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="container mx-auto flex justify-center">
      {/* @ts-expect-error Server Component */}
      <ProjectList data={data} />
    </div>
  );
}
