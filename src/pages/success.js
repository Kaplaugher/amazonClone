import { CheckCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Header from '../components/Header';

function success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">Your order has been confirmed!</h1>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit nisi
            itaque repellendus ducimus, aut deleniti officiis tempora amet
            labore error magnam praesentium reiciendis sint laudantium?
          </p>
          <button
            onClick={() => router.push('/orders')}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;
