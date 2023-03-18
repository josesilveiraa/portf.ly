import { useFetch } from "@/api/api";
import MainNavbar from "@/components/home/MainNavbar";
import ProjectTextArea from "@/components/home/ProjectTextArea";
import { Button, Col, Container, Grid, Spacer, Spinner, Text } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
};

export default function Project() {
  const router = useRouter();

  const { projectId } = router.query;
  const { data, error } = useFetch<Project>(`projects/${projectId}`);

  if(error) {
    return <DefaultErrorPage statusCode={404}/>
  }

  if(!data) return <Spinner />;

  return (
    <>
      <Head>
      <title>{data.title}</title>
      </Head>
      <Container>
      <MainNavbar />
      <Grid.Container justify="center" css={{ height: "500px" }}>
        <Grid xs={12} sm={3} alignItems="center">
          <Col css={{ width: "100%" }}>
            <Text weight="bold" size={70} css={{ textAlign: "center" }}>{data.title}</Text>
            <Text size={22} css={{ textAlign: "center", opacity: "80%" }}>{data.description}</Text>
            <Spacer y={3} />
            <Button size="md" shadow color="gradient" css={{ width: "55%", margin: "0 auto" }} as={Link} href={data.repository}>Go to Repository</Button>
          </Col>
        </Grid>
        <Grid xs={12} sm={9} css={{ margin: "0 auto" }}>
          <Col css={{ width: "100%" }}>
            <Spacer y={3} />
            <Text weight="bold" size={40} css={{ textAlign: "center" }}>README.md</Text>
            <Spacer y={2} />
            <ProjectTextArea>{data.readme}</ProjectTextArea>
          </Col>
        </Grid>
      </Grid.Container>
    </Container>
    </>
  )
}
