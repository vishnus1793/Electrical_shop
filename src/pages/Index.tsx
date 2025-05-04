import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedSection from "@/components/ui/animated-section";
import AnimatedText from "@/components/ui/animated-text";
import ProductCard from "@/components/ui/product-card";
import BrandCard from "@/components/ui/brand-card";
import CategoryCard from "@/components/ui/category-card";
import { Button } from "@/components/ui/button";
import { products, categories, brands, testimonials } from "@/data";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
const featuredProducts = products.filter(product => product.isFeatured).slice(0, 4);
const featuredCategories = categories.slice(0, 5);
const featuredBrands = brands.slice(0, 3);

const carouselImages = [
  "https://orientelectric.com/cdn/shop/files/eternal-high-glo-led-bulb-orient-electric-1.png?v=1696835028&width=1445",
];

const Index = () => {
  const [sliderRef] = useKeenSlider({
    
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-electric-blue to-electric-blue-dark text-white overflow-hidden">
      {/* Background blobs */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 space-y-10 lg:space-y-0 bg-gradient-to-r from-blue-50 to-yellow-100">
      {/* Left Side */}
      <div className="text-center lg:text-left max-w-xl space-y-6 z-10">
        <motion.h1
          className="text-5xl lg:text-6xl font-extrabold text-electric-blue leading-tight"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-electric-yellow">AMMAN ELECTRICALS</span>
        </motion.h1>
        <motion.p
          className="text-lg lg:text-xl text-gray-700"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your smart companion for real-time monitoring of electricity usage, costs, and consumption analytics.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
         <Link to="/contact">
                <Button className="bg-electric-yellow text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition">
                  contact us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
          <Link to="/about">
                <Button className="bg-electric-yellow text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition">
                  About us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
          
        </motion.div>

      </div>

      {/* Right Side - Carousel */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="keen-slider w-full max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-xl"
        >
          {carouselImages.map((img, index) => (
            <motion.div
              key={index}
              className="keen-slider__slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-auto object-cover rounded-xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Glowing orb behind the carousel */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-electric-yellow/30 blur-2xl rounded-full z-0 animate-pulse"></div>
      </div>
    </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <AnimatedText text="Powering Homes," />
                <br />
                <AnimatedText
                  text="Brightening Lives"
                  className="text-electric-yellow"
                  delayOffset={0.5}
                />
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Premium electrical products for modern homes and businesses. Quality,
              safety, and innovation in every connection.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/products">
                <Button className="bg-white text-electric-blue hover:bg-gray-100">
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  variant="outline"
                  className="border-white text-electric-blue hover:bg-white/10"
                >
                  Explore Categories
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white text-electric-blue hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <motion.img
              src="https://www.simply.science/images/content/physics/Electricity_magnetism/CE/Concept_map/Electric_Current.gif" // 🔁 Replace this with your actual image path
              alt="Modern Electrical Products"
              className="w-full max-w-md mx-auto lg:mx-0 rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            {/* Optional glowing orb behind image */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-electric-yellow/30 blur-2xl rounded-full z-0 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title="Shop by Category" subtitle="Explore our wide range of electrical products by category" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/categories">
              <Button className="bg-electric-blue hover:bg-electric-blue-dark">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="Featured Products" subtitle="Our hand-picked selection of premium electrical products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products">
              <Button className="bg-electric-blue hover:bg-electric-blue-dark">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-electric-blue text-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="Why Choose Us" subtitle="We stand apart with our commitment to quality and service excellence" titleClassName="text-white" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <AnimatedSection delay={0.1} className="bg-white/10 backdrop-blur p-8 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-electric-yellow rounded-full mb-6">
                  <Lightbulb className="h-8 w-8 text-electric-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Products</h3>
                <p className="text-gray-200">
                  We source only the highest quality electrical products from trusted brands and manufacturers
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className="bg-white/10 backdrop-blur p-8 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-electric-yellow rounded-full mb-6">
                  <Zap className="h-8 w-8 text-electric-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Advice</h3>
                <p className="text-gray-200">
                  Our team of electrical experts is always ready to assist with your product selection
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.5} className="bg-white/10 backdrop-blur p-8 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-electric-yellow rounded-full mb-6">
                  <Sparkles className="h-8 w-8 text-electric-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Reliable Service</h3>
                <p className="text-gray-200">
                  Prompt delivery, reliable after-sales support, and customer satisfaction guaranteed
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Trusted Brands" subtitle="We partner with leading electrical brands to bring you the best products" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/brands">
              <Button className="bg-electric-blue hover:bg-electric-blue-dark">
                View All Brands
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
<div>
<body>
  <script src="//code.tidio.co/pnnz4aacs1hryeunio5pdh4w7mhrebrn.js" async></script>
</body>
</div>
    </Layout>
  );
};

export default Index;