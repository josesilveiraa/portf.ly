import MainNavbar from '@/components/MainNavbar';
import { PreviewProjectCard } from '@/components/cards/PreviewProjectCard';
import { Container, Grid } from '@nextui-org/react';

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
};

interface Props {
  projects: Project[];
}

export default function Home({ projects }: Props) {
  return (
    <Container>
      <MainNavbar />

      <Grid.Container gap={2} justify="center" css={{"marginTop": "100px"}}>
        {projects.map((project, index) => {
          return (
            <Grid xs={12} sm={3} key={project.id}>
            <PreviewProjectCard 
              key={index}
              projectId={project.id}
              category="Project"
              imageUrl='https://nextui.org/images/card-example-3.jpeg'
              title={project.title}
              firstLine='First Line'
              secondLine={project.description}
              buttonContent='View'
            />
          </Grid>
          )
        })}
      </Grid.Container>
    </Container>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env['NEXT_PUBLIC_API_ENDPOINT']}/projects`);
  const projects: Project[] = await res.json();

  return {
    props: { projects }
  };
}
