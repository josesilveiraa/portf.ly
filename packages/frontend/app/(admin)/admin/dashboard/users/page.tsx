import React from 'react';

interface IUser {
  email: string;
  username: string;
}

async function getData(): Promise<IUser[]> {
  const res = await fetch('http://0.0.0.0:3333/api/v1/users', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Users() {
  const data = await getData();

  return (
    <>
      <div className="w-6/12 p-6 bg-neutral rounded-md shadow-md ring-2 ring-gray-800/50 mb-20">
        <h1 className="text-3xl font-semibold text-center text-white">
          Create new User
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base text-white label-text">E-mail</span>
            </label>
            <input
              type="text"
              placeholder="johndoe@yourcompany.com"
              className="w-full input input-bordered bg-white text-black"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="JohnDoe"
              className="w-full input input-bordered bg-white text-black"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full input input-bordered bg-white text-black"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block bg-primary text-white hover:bg-gray-800"
            >
              +
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-0">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>E-mail</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
