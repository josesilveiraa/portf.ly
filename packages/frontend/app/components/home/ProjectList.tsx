import ProjectCard from './cards/ProjectCard';

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
  previewImage: string;
}

interface IProjectListProps {
  data: Project[];
}

export default async function ProjectList({ data }: IProjectListProps) {
  return (
    <div className="min-h-screen">
      <div className="m-10 grid gap-x-32 gap-y-20 sm:grid-cols-1 lg:grid-cols-3">
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
    </div>
  );
}
