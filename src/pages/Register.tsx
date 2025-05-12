import { Registration } from "../components/Registration";

const Register = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Student Savings Group</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Collectively invest in a Play-to-Earn blockchain game with a 20%
          return on total investment
        </p>
      </header>

      <div className="w-full">
        <Registration />
      </div>
    </div>
  );
};

export default Register;
