
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedSection from "@/components/ui/animated-section";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <AnimatedSection>
          <SectionHeading
            title="About  Amman Electricals"
            subtitle="Powering homes and businesses since 1995"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-electric-blue-dark">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Founded in 1992 by Mr.P sivakumar, Amman Electricals began as a small electrical shop in the heart of the city. With a passion for quality electrical products and a commitment to exceptional customer service, we quickly gained a reputation as the go-to destination for all electrical needs.
            </p>
            <p className="text-gray-700 mb-4">
              Over the years, we've grown from a single shop to a comprehensive electrical solutions provider with multiple locations across the region. Despite our growth, we've remained true to our founding principles: offering high-quality products, competitive prices, and unmatched expertise.
            </p>
            <p className="text-gray-700">
              Today, Amman Electricals is proud to be a family-owned business that continues to serve our community with the same dedication and personalized service that has defined us for nearly three decades.
            </p>
          </motion.div>

          <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Amman Electricals Store" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h4 className="text-xl font-bold">Our Flagship Store</h4>
                <p className="text-sm mt-2">Established 1995</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <AnimatedSection delay={0.3}>
            <h3 className="text-2xl font-bold mb-8 text-center text-electric-blue-dark">Why Choose Us</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-electric-yellow flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Quality Products</h4>
                <p className="text-gray-600">We partner with trusted brands to ensure every product meets our quality standards.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-electric-yellow flex items-center justify-center">
                  <span className="text-2xl">👨‍🔧</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Expert Advice</h4>
                <p className="text-gray-600">Our team of experienced professionals provides expert guidance for all your electrical needs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-electric-yellow flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Customer Service</h4>
                <p className="text-gray-600">We're committed to providing exceptional service and support before and after your purchase.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-20">
          <AnimatedSection delay={0.5}>
            <h3 className="text-2xl font-bold mb-8 text-center text-electric-blue-dark">Our Numbers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-electric-blue text-white p-6 rounded-lg shadow-md text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <h4 className="text-4xl font-bold mb-2">28+</h4>
                  <p>Years in Business</p>
                </motion.div>
              </div>
              
              <div className="bg-electric-blue text-white p-6 rounded-lg shadow-md text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <h4 className="text-4xl font-bold mb-2">50k+</h4>
                  <p>Customers Served</p>
                </motion.div>
              </div>
              
              <div className="bg-electric-blue text-white p-6 rounded-lg shadow-md text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <h4 className="text-4xl font-bold mb-2">7,000+</h4>
                  <p>Products</p>
                </motion.div>
              </div>
              
              <div className="bg-electric-blue text-white p-6 rounded-lg shadow-md text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <h4 className="text-4xl font-bold mb-2">40+</h4>
                  <p>Brand Partners</p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default About;
