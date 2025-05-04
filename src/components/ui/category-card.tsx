
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

export const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${category.id}`}>
      <motion.div 
        className="relative overflow-hidden rounded-xl shadow-lg h-64 group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
          <motion.h3 
            className="text-white text-xl font-bold"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            {category.name}
          </motion.h3>
          
          <motion.p 
            className="text-gray-200 text-sm mt-1"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            {category.productCount} Products
          </motion.p>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-electric-yellow"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
        />
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
