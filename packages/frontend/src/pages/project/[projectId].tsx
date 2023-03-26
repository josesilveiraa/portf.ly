import { useFetch } from "@/api/api";
import MainNavbar from "@/components/home/MainNavbar";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
}

export default function Project() {
  const router = useRouter();

  const { projectId } = router.query;
  const { data, error } = useFetch<Project>(`projects/${projectId}`);

  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <MainNavbar />
      <div className="mt-20 grid gap-4 grid-cols-4 justify-center">
      <div className="row-span-3">01</div>
      </div>
    </>
  );
}
