import { useRouter } from 'next/dist/client/router';

const Nav = () => {
  const router = useRouter();

  return (
    <div className="flex content-center px-12 py-4 fixed h-20 w-full bg-gray-500">
      <button
        onClick={() => router.push('/')}
        className="bg-gray-300 hover:bg-gray-400 active:bg-gray-300 px-6 rounded-lg">
        Home
      </button>
    </div>
  )
}

export default Nav;