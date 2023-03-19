import MainNavbar from '@/components/home/MainNavbar';
import ProjectList from '@/components/home/ProjectList';

export default function Home() {  
  return (
    <div className="container mx-auto flex justify-center">
      <MainNavbar />
      <ProjectList />
    </div>
  )
}
