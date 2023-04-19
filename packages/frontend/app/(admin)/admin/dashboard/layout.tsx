import '@/styles/global.css';
import Link from 'next/link';

interface IRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col justify-center items-center">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <Link href="/admin/dashboard/users">
              <p>Users</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/dashboard/projects">
              <p>Projects</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
