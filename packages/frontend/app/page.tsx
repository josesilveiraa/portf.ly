import ProjectList from './components/home/ProjectList';

export default function Home() {
  return (
    <div className="container mx-auto flex justify-center">
      {/* @ts-expect-error Server Component */}
      <ProjectList />
    </div>
  );
}
