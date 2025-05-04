
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = true,
  className = "",
  titleClassName = ""
}: SectionHeadingProps) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <motion.h2 
        className={`text-3xl md:text-4xl font-bold mb-4 text-electric-blue-dark relative inline-block ${titleClassName}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
        <motion.span 
          className="absolute bottom-0 left-0 bg-electric-yellow h-1 rounded"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.h2>
      
      {subtitle && (
        <motion.div 
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeading;
