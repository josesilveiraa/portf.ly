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
      <div className="flex flex-row h-screen items-center">
        <div className="w-1/3 p-4 h-96">
          <div className="bg-white shadow-lg p-4 rounded-lg flex-shrink-0">
            <h2 className="text-lg font-bold mb-2">Card na esquerda</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
              risus eget diam bibendum ultrices. Mauris ullamcorper consequat
              ligula, a pretium ex luctus a.
            </p>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <div className="flex items-center">
            <textarea
              readOnly
              className="w-full border rounded-lg p-4 h-20 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
