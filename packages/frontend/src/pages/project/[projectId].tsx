import MainNavbar from "@/components/MainNavbar";
import ProjectTextArea from "@/components/ProjectTextArea";
import { Button, Col, Container, Grid, Spacer, Text } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
};

export default function Project({ project }: { project: Project }) {
  return (
    <>
      <Head>
      <title>{project.title}</title>
      </Head>
      <Container>
      <MainNavbar />
      <Grid.Container justify="center" css={{ height: "500px" }}>
        <Grid xs={12} sm={3} alignItems="center">
          <Col css={{ width: "100%" }}>
            <Text weight="bold" size={70} css={{ textAlign: "center" }}>{project.title}</Text>
            <Text size={22} css={{ textAlign: "center", opacity: "80%" }}>{project.description}</Text>
            <Spacer y={3} />
            <Button size="md" shadow color="gradient" css={{ width: "55%", margin: "0 auto" }} as={Link} href={project.repository}>Go to Repository</Button>
          </Col>
        </Grid>
        <Grid xs={12} sm={9} css={{ margin: "0 auto" }}>
          <Col css={{ width: "100%" }}>
            <Spacer y={3} />
            <Text weight="bold" size={40} css={{ textAlign: "center" }}>README.md</Text>
            <Spacer y={2} />
            <ProjectTextArea>{project.readme}</ProjectTextArea>
          </Col>
        </Grid>
      </Grid.Container>
    </Container>
    </>
  )
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/${params.projectId}`);
  const project = await res.json();

  return { props: { project } }
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects`);
  const projects = await res.json();

  const paths = projects.map((project: any) => ({
    params: { projectId: project.id }
  }));

  return { paths, fallback: false };
}
