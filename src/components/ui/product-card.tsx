
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Interface for the product data
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  isOnSale?: boolean;
  salePrice?: number;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover-scale ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform transition-transform hover:scale-110"
          />
          
          {product.isFeatured && (
            <div className="absolute top-2 left-2 bg-electric-blue text-white text-xs px-2 py-1 rounded">
              Featured
            </div>
          )}
          
          {product.isOnSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Sale
            </div>
          )}
          
          <div 
            className="absolute top-2 right-2 z-10 cursor-pointer" 
            onClick={toggleWishlist}
          >
            <Heart 
              className={`h-6 w-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-electric-yellow-dark" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div>
              {product.isOnSale ? (
                <div className="flex items-center">
                  <span className="text-electric-blue-dark font-bold">₹{product.salePrice}</span>
                  <span className="text-gray-400 text-sm line-through ml-2">₹{product.price}</span>
                </div>
              ) : (
                <span className="text-electric-blue-dark font-bold">₹{product.price}</span>
              )}
            </div>
            
            <Button size="sm" className="rounded-full bg-electric-blue hover:bg-electric-blue-dark">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
