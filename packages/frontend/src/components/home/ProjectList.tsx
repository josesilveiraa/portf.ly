import { useFetch } from "@/api/api"
import { Grid, Spinner } from "@nextui-org/react";
import PreviewProjectCard from "./cards/PreviewProjectCard"

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
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
            imageUrl="https://nextui.org/images/card-example-3.jpeg"
            title={project.title}
            description={project.description}
            buttonContent="View"
          />
        </Grid>
      ))}
    </>
  );
}
