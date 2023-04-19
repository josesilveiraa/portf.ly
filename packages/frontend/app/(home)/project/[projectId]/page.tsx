import { Metadata } from 'next';
import Link from 'next/link';

interface IProject {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
  previewImage?: string;
}

interface IProjectProps {
  params: {
    projectId: string;
  };
}

async function getData(id: string): Promise<IProject> {
  const res = await fetch(`http://0.0.0.0:3333/api/v1/projects/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const generateMetadata = async ({
  params,
}: IProjectProps): Promise<Metadata> => {
  const project = await getData(params.projectId);

  return { title: project.title };
};

export default async function IProject({
  params: { projectId },
}: IProjectProps) {
  const data: IProject = await getData(projectId);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <picture>
          <img
            src={data.previewImage}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="project-image"
          />
        </picture>
        <div>
          <h1 className="text-5xl font-bold mr-96">{data.title}</h1>
          <p className="py-6">{data.description}</p>
          <textarea
            readOnly
            className="textarea textarea-bordered textarea-lg w-full mb-6 resize-none"
            value={data.readme}
          ></textarea>
          <Link href={data.repository} target="_blank">
            <div className="flex justify-center">
              <button className="btn btn-primary w-full max-w-2xl">
                Go to repository
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
