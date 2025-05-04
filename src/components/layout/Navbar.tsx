import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🛑 Added useNavigate
import { Menu, X, ShoppingCart, User, Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient"; // adjust path as needed

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // 🛑 Initialize navigate

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    navigate('/login'); // 🛑 Redirect to login after logout
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-electric-blue animate-spark">
                AMMAN <span className="text-electric-yellow-dark">Electricals</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-electric-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-electric-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Categories
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-electric-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Products
              </Link>
              <Link to="/brands" className="text-gray-700 hover:text-electric-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Brands
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-electric-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-electric-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </Link>
              <Link to="https://sri-amman-electricals.vercel.app/" className="text-gray-700 hover:text-electric-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-gray-700">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link to="/customer/dashboard">
              <Button variant="ghost" size="icon" className="text-gray-700 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-electric-yellow text-black rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>

            {!isLoggedIn ? (
              <Link to="/login">
                <Button variant="outline" className="text-electric-blue border-electric-blue hover:bg-electric-blue hover:text-white">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-electric-blue hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="text-gray-700 hover:text-electric-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-electric-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-electric-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/brands"
              className="text-gray-700 hover:text-electric-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-electric-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-electric-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-electric-blue hover:bg-electric-blue hover:text-white block px-3 py-2 rounded-md text-base font-medium border border-electric-blue mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-red-600 hover:bg-red-600 hover:text-white block w-full px-3 py-2 rounded-md text-base font-medium border border-red-600 mt-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
