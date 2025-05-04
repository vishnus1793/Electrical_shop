
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-electric-gray-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">
                Amman <span className="text-electric-yellow">Electricals</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-4">
              Premium electrical products for homes and businesses. Quality and safety guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-electric-yellow transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-electric-yellow transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-electric-yellow transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-electric-yellow transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-electric-yellow">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/brands" className="text-gray-300 hover:text-white transition-colors">Brands</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-electric-yellow">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Lighting</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Switches & Sockets</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Circuit Breakers</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Wires & Cables</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Smart Home Devices</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-electric-yellow">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-electric-yellow" />
                <span className="text-gray-300">Sankari Main Rd, Magudanchavadi, Tamil Nadu 637103</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-electric-yellow" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-electric-yellow" />
                <a href="mailto:info@omelectricals.com" className="text-gray-300 hover:text-white transition-colors">sriammanele@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Amman Electricals shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
