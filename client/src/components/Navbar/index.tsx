import { Link } from 'react-router-dom';
import { useState, type MouseEvent} from 'react';
import Auth from '../../utils/auth';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="flex items-center justify-between border-b py-2 px-4 sm:px-8 bg-black font-sans min-h-[50px] tracking-wide relative z-50">
      <div className="flex items-center gap-4 w-full text-white">
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <Link to="/">
            <img src="/steak.svg" alt="Steak Logo" width={40} />
            <h1 className="text-2xl font-semibold text-white">
              Steak Me!
            </h1>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4 text-white">
          {/* Hamburger Menu for small devices */}
          <button className="ml-auto text-white lg:hidden" onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
          <div className={`flex-col lg:flex-row lg:flex items-center space-y-4 lg:space-y-0 lg:space-x-6 absolute lg:static top-full right-0 w-full lg:w-auto bg-black lg:bg-transparent px-4 pt-4 pb-6 lg:p-0 z-40 transition-all duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'}`}>
            <Link
              className="hover:text-[#F87A6Dff] text-[#F87A6Dff] font-bold text-md"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:text-[#F87A6Dff] text-[#F87A6Dff] font-bold text-md"
              to="/me"
            >
              Steak How-To
            </Link>
            <Link
              className="hover:text-[#F87A6Dff] text-[#F87A6Dff] font-bold text-md"
              to="/me"
            >
              Steak Selector
            </Link>
            {Auth.loggedIn() ? (
              <>
                <Link
                  className="hover:text-[#F87A6Dff] text-[#F87A6Dff] font-bold text-md"
                  to="/me"
                >
                  My Favorite Steaks
                </Link>
                <div className="border-l border-[#333] h-6 max-lg:hidden"></div>
                <button className="px-3 py-1.5 text-sm rounded font-bold text-white border-2 border-[#1C284Fff] bg-transparent transition-all ease-in-out duration-300 hover:bg-[#1C284Fff] hover:text-[#1C284Fff]" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="px-3 py-1.5 text-sm rounded font-bold text-white border-2 border-[#1C284Fff] bg-transparent transition-all ease-in-out duration-300 hover:bg-[#1C284Fff] hover:text-[#1C284Fff]" to="/login">
                  Login
                </Link>
                <Link className="px-3 py-1.5 text-sm rounded font-bold text-white border-2 border-[#F54C3Fff] bg-[#F54C3Fff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#F87A6Dff]" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
