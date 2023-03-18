import { useFetch } from "@/api/api"
import { Grid, Spinner } from "@nextui-org/react";
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

  if (!data) return <Spinner />;

  return (
    <>
      {data.map((project: Project, index: number) => (
        <Grid xs={12} sm={3} key={project.id}>
          <PreviewProjectCard
            key={index}
            projectId={project.id}
            category="Project"
            imageUrl={project.previewImage}
            title={project.title}
            description={project.description}
            buttonContent="View"
          />
        </Grid>
      ))}
    </>
  );
}
