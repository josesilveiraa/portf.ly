import ProjectCard from "./cards/ProjectCard";

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
  previewImage: string;
}

async function getData() {
  const res = await fetch('http://0.0.0.0:3333/api/v1/projects');

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ProjectList() {
  const data = await getData();

  return (
    <div className="mt-10 grid gap-x-32 gap-y-20 grid-cols-3 mb-10">
      {data.map((project: Project, index: number) => (
        <ProjectCard
          key={index}
          projectId={project.id}
          category="Project"
          imageUrl={project.previewImage}
          title={project.title}
          description={project.description}
          buttonContent="View"
        />
      ))}
    </div>
  );
}
