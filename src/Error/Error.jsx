import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import ErrorImage from '../../src/assets/Error/Error.png';

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 text-center">
            <div className="max-w-md w-full">
                <img src={ErrorImage} alt="Error" className="w-full mb-6" />
                <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-4">
                    This Page Can’t Be Found
                </h1>
                <p className="text-gray-600 mb-6 text-base md:text-lg">
                    Sorry, we couldn't find the page you were looking for. 
                    We suggest that you return to the homepage.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-[#629D23] text-white px-6 py-2 rounded hover:bg-[#4b7c1a] transition"
                >
                    <FaHome />
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
