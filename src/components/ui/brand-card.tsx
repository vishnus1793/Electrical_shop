
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface BrandCardProps {
  brand: Brand;
  className?: string;
}

export const BrandCard = ({ brand, className = "" }: BrandCardProps) => {
  return (
    <Link to={`/brands/${brand.id}`}>
      <motion.div 
        className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center ${className}`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="relative w-32 h-32 mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="w-full h-full object-contain"
          />
          <motion.div 
            className="absolute inset-0 bg-electric-blue rounded-full"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.05 }}
          />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-electric-blue-dark text-center">{brand.name}</h3>
        <p className="text-sm text-gray-500 text-center mt-2 line-clamp-3">{brand.description}</p>
      </motion.div>
    </Link>
  );
};

export default BrandCard;
