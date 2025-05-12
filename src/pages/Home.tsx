import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center flex h-screen w-full flex-col justify-center">
        <h1 className="text-6xl font-bold mb-2">Savings-Fi Group</h1>
        <p className="text-gray-600 max-w-md mx-auto my-16">
          Collectively invest in a Play-to-Earn blockchain game with a 20%
          return on total investment
        </p>
        <Link to={"/register"} className="border p-3 w-fit mx-auto rounded-xl">
          Click here to join
        </Link>
      </header>
    </div>
  );
};

export default Home;
