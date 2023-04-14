import Link from 'next/link';

interface CardData {
  projectId: string;
  category: string;
  title: string;
  imageUrl: string;
  description?: string;
  buttonContent: string;
}

export default function ProjectCard({
  projectId,
  title,
  description,
  imageUrl,
  buttonContent,
}: CardData) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <picture>
        <img src={imageUrl} alt={projectId} className="rounded-md" />
      </picture>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={`/project/${projectId}`}>
            <button className="btn btn-primary">{buttonContent}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
