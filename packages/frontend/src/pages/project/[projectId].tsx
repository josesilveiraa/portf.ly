import MainNavbar from "@/components/MainNavbar";
import { Container, Textarea, Grid, Text } from "@nextui-org/react";

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
};

export default function Project({ project }: { project: Project }) {
  return (
    <Container>
      <MainNavbar />
      <Grid.Container justify="center" css={{ "marginTop": "25px" }}>
        <Grid xs={12} justify="center">
          <Text h1>{project.title}</Text>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`http://0.0.0.0:3000/api/projects/${params.projectId}`);
  const project = await res.json();

  return { props: { project } }
}

export async function getStaticPaths() {
  const res = await fetch('http://0.0.0.0:3000/api/projects');
  const projects = await res.json();

  const paths = projects.map((project: any) => ({
    params: { projectId: project.id }
  }));

  return { paths, fallback: false };
}
