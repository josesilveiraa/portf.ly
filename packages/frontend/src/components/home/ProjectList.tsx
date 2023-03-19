import { useFetch } from "@/api/api"
import PreviewProjectCard from "./cards/PreviewProjectCard"

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
  previewImage: string;
};

export default function ProjectList() {
  const { data } = useFetch('projects');

  return (
    <div className="mt-40 grid gap-4 grid-cols-1 md:grid-cols-2">
      {data.map((project: Project, index: number) => (
          <PreviewProjectCard
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
