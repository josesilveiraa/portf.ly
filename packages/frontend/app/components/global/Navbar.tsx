import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <p className="btn btn-ghost normal-case text-xl">Portf.ly</p>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/admin/login">Log-in</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
