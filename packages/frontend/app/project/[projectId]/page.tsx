import Link from "next/link";

interface Project {
  id: string;
  title: string;
  repository: string;
  description?: string;
  readme: string;
  previewImage?: string;
}

async function getData(id: string) {
  const res = await fetch(`http://0.0.0.0:3000/api/v1/projects/${id}`);

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Project({ params: { projectId } }: { params: { projectId: string } }) {

  const data: Project = await getData(projectId);

  return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <picture>
            <img
              src={data.previewImage}
              className="max-w-sm rounded-lg shadow-2xl"
              alt='project-image'
            />
          </picture>
          <div>
            <h1 className="text-5xl font-bold mr-96">{data.title}</h1>
            <p className="py-6">
              {data.description}
            </p>
            <textarea readOnly className="textarea textarea-bordered textarea-lg w-full mb-6" value={data.readme}></textarea>
            <Link href={data.repository} target="_blank">
              <div className="flex justify-center">
                <button className="btn btn-primary w-full max-w-2xl">Go to repository</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
  );
}
