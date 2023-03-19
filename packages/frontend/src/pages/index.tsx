import MainNavbar from '@/components/home/MainNavbar';
import ProjectList from '@/components/home/ProjectList';

export default function Home() {  
  return (
    <>
      <MainNavbar />
      <div className="container mx-auto flex justify-center">
      <ProjectList />
    </div>
    </>
  )
}
