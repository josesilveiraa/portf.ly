import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portf.ly - Login',
};

export default function Login() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-neutral rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-white">
          Log-in
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
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full input input-bordered bg-white text-black"
            />
          </div>
          <a
            href="#"
            className="text-xs text-white hover:underline hover:text-blue-600"
          >
            Forgot your password?
          </a>
          <div>
            <button
              type="submit"
              className="btn btn-block bg-primary text-white hover:bg-gray-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
