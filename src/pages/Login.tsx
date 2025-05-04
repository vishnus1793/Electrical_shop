import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedSection from "@/components/ui/animated-section";
import { USER_ROLES } from "@/data";
import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [role, setRole] = useState<string>(USER_ROLES.CUSTOMER);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      if (role === USER_ROLES.ADMIN) {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert(`Account created successfully as ${role}! Please log in.`);
      setIsLoginView(true);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/" className="absolute top-8 left-8 text-electric-blue hover:text-electric-blue-dark font-semibold">
        ← Back to Home
      </Link>

      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex">
          <button
            className={`w-1/2 py-4 font-medium text-center transition-colors ${role === USER_ROLES.CUSTOMER ? 'bg-electric-blue text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setRole(USER_ROLES.CUSTOMER)}
          >
            <User className="inline-block h-5 w-5 mr-2" />
            Customer
          </button>
          <button
            className={`w-1/2 py-4 font-medium text-center transition-colors ${role === USER_ROLES.ADMIN ? 'bg-electric-blue text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setRole(USER_ROLES.ADMIN)}
          >
            <ShieldCheck className="inline-block h-5 w-5 mr-2" />
            Admin
          </button>
        </div>

        <div className="px-8 py-10">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {isLoginView ? 'Login' : 'Create Account'}
              </h2>
              <p className="mt-2 text-gray-600">
                {isLoginView
                  ? `Sign in to your ${role.toLowerCase()} account`
                  : `Register as a new ${role.toLowerCase()}`}
              </p>
            </div>

            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              onSubmit={isLoginView ? handleLogin : handleSignup}
              className="space-y-6"
            >
              {!isLoginView && (
                <motion.div variants={itemVariants}>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>

              {isLoginView && (
                <motion.div variants={itemVariants} className="text-right">
                  <a href="#" className="text-sm text-electric-blue hover:underline">
                    Forgot password?
                  </a>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-electric-blue hover:bg-electric-blue-dark"
                >
                  {isLoginView ? 'Sign In' : 'Sign Up'}
                </Button>
              </motion.div>
            </motion.form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                className="text-electric-blue hover:underline"
              >
                {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Login;
