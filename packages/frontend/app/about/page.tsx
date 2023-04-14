import Link from 'next/link';
import React from 'react';

export default function About() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="min-w-xs">
          <h1 className="text-5xl font-bold">What is Portf.ly?</h1>
          <p className="py-6">
            Portf.ly is an impressive open-source portfolio managing project
            that enables authors to showcase their projects in a clean and
            organized manner. Developed with a user-friendly interface, Portf.ly
            allows authors to easily post their works and get them noticed. The
            platform is highly customizable, and authors can tailor their
            portfolio to their needs by choosing from a wide range of themes and
            layouts. The project&apos;s open-source nature also ensures that it
            is constantly evolving, with a community of contributors working
            together to improve it. Overall, Portf.ly is a fantastic tool for
            anyone looking to showcase their work online in a professional and
            attractive way.
          </p>
          <Link href="/">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
