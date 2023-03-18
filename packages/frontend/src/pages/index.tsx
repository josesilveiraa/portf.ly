import MainNavbar from '@/components/home/MainNavbar';
import { Container, Grid } from '@nextui-org/react';
import ProjectList from '@/components/home/ProjectList';

export default function Home() {  
  return (
    <Container>
      <MainNavbar />
      <Grid.Container gap={2} justify="center">
        <ProjectList />
      </Grid.Container>
    </Container>
  )
}
