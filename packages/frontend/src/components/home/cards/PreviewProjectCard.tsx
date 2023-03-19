import Image from "next/image";
import Link from "next/link";

interface CardData {
  projectId: string;
  category: string;
  title: string;
  imageUrl: string;
  description?: string;
  buttonContent: string;
}

export default function PreviewProjectCard({
  projectId,
  title,
  description,
  imageUrl,
  buttonContent,
}: CardData) {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
        <img
          src={imageUrl}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">{title}</h2>
            <p className="dark:text-gray-100">{description}</p>
          </div>
          <Link href={`/project/${projectId}`}>
            <button
              type="button"
              className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-gray-100"
            >
              {buttonContent}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}