import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient"; // adjust path as needed
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  Heart,
  ShoppingBag,
  Clock,
  Eye,
  XCircle,
  Settings,
  LogOut,
  ShoppingCart
} from "lucide-react";

// Types
interface UserInfo {
  full_name: string;
  phone?: string;
  address?: string;
  joined_at?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Inquiry {
  id: number;
  subject: string;
  date: string;
  status: string;
}

interface WalletTransaction {
  id: number;
  email: string;
  amount: number;
  created_at: string;
}

const recentlyViewedData: Product[] = [
  { id: 1, name: 'LED Bulb 9W', category: 'Lighting', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=200&q=80', price: 249 },
  { id: 2, name: 'Smart Switch', category: 'Switches', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&w=200&q=80', price: 599 },
  { id: 3, name: 'Copper Wire 1.5mm', category: 'Wires', image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&w=200&q=80', price: 1299 },
  { id: 11, name: '4K Smart TV 55"', category: 'Electronics', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&w=200&q=80', price: 45999 },
  { id: 12, name: 'Wireless Mouse', category: 'Electronics', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&w=200&q=80', price: 799 },
  { id: 13, name: 'Bluetooth Soundbar', category: 'Electronics', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&w=200&q=80', price: 3999 },
];

const wishlistItemsData: Product[] = [
  { id: 4, name: 'Smart Home Hub', category: 'Smart Home', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=200&q=80', price: 2499 },
  { id: 5, name: 'Ceiling Fan', category: 'Fans', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&w=200&q=80', price: 1899 },
];

const inquiryHistoryData: Inquiry[] = [
  { id: 1, subject: 'Smart Home Installation Query', date: '2023-05-15', status: 'Responded' },
  { id: 2, subject: 'Product Availability Check', date: '2023-04-28', status: 'Closed' },
];

const CustomerDashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(recentlyViewedData);
  const [wishlistItems, setWishlistItems] = useState<Product[]>(wishlistItemsData);
  const [inquiryHistory, setInquiryHistory] = useState<Inquiry[]>(inquiryHistoryData);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Get the current authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, phone, address, joined_at") // Removed email from query
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile data:", profileError.message);
        } else if (profileData) {
          setUserInfo(profileData);
        }

        // Fetch wallet balance
        const { data: walletData, error: walletError } = await supabase
          .from("wallet")
          .select("amount, created_at")
          .eq("email", user.email); // Ensure wallet table exists

        if (walletError) {
          console.error("Error fetching wallet balance:", walletError.message);
        } else {
          const totalBalance = walletData.reduce((sum, transaction) => sum + transaction.amount, 0);
          setWalletBalance(totalBalance);
          setWalletTransactions(walletData.map(transaction => ({
            id: Date.now(), // Generate a unique ID if not provided
            email: user.email, // Use the user's email
            amount: transaction.amount,
            created_at: transaction.created_at
          })));
        }

        // Fetch cart items
        const { data: cartData, error: cartError } = await supabase
          .from("carts")
          .select("*, products(*)"); // Ensure relationship exists

        if (cartError) {
          console.error("Error fetching cart data:", cartError.message);
        } else {
          const transformedCartItems = cartData.map(item => ({
            id: item.products.id,
            name: item.products.name,
            category: item.products.category,
            image: item.products.image,
            price: item.products.price,
            quantity: item.quantity
          }));
          setCartItems(transformedCartItems);
        }

        // Fetch inquiries
        const { data: inquiriesData, error: inquiriesError } = await supabase
          .from("Message")
          .select("*")
          .eq("user_id", user.id); // Ensure user_id column exists

        if (inquiriesError) {
          console.error("Error fetching inquiries:", inquiriesError.message);
        } else {
          setInquiryHistory(inquiriesData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("Error fetching user:", userError?.message);
          return;
        }

        const { data: walletData, error: walletError } = await supabase
          .from("wallet")
          .select("amount")
          .eq("email", user.email);

        if (walletError) {
          console.error("Error fetching wallet data:", walletError.message);
          return;
        }

        if (walletData && walletData.length > 0) {
          const totalBalance = walletData.reduce((sum, transaction) => sum + transaction.amount, 0);
          setWalletBalance(totalBalance);
        } else {
          setWalletBalance(0); // Set to 0 if no transactions exist
        }
      } catch (error) {
        console.error("Unexpected error fetching wallet balance:", error);
      }
    };

    fetchWalletBalance();
  }, []);
  
  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const addToCart = async (productId: number) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return;
      }

      // Check if product already exists in cart
      const { data: existingItem } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        // Update quantity if already in cart
        const { error } = await supabase
          .from('carts')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item to cart
        const { error } = await supabase
          .from('carts')
          .insert([{
            user_id: user.id,
            product_id: productId,
            quantity: 1
          }]);

        if (error) throw error;
      }

      // Refresh cart items
      const { data: updatedCart, error: cartError } = await supabase
        .from('carts')
        .select('*, products(*)')
        .eq('user_id', user.id);

      if (cartError) throw cartError;
      
      if (updatedCart) {
        const transformedCartItems: CartItem[] = updatedCart.map(item => ({
          id: item.products.id,
          name: item.products.name,
          category: item.products.category,
          image: item.products.image,
          price: item.products.price,
          quantity: item.quantity
        }));
        
        setCartItems(transformedCartItems);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const addMoneyToWallet = async (amount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { error } = await supabase
        .from("wallet")
        .insert([{ email: user.email, amount }]);

      if (error) {
        throw error;
      }

      // Update wallet balance and transactions
      setWalletBalance(prev => prev + amount);
      setWalletTransactions(prev => [...prev, { id: Date.now(), email: user.email, amount, created_at: new Date().toISOString() }]);
    } catch (error) {
      console.error("Error adding money to wallet:", error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Redirect to home page or login page
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-electric-blue-dark">My Account</h1>
            <p className="text-gray-600">Welcome back, {userInfo?.full_name || "Guest"}</p>
          </motion.div>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="cart">My Cart ({cartItems.length})</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="viewed">Recently Viewed</TabsTrigger>
            <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold">{userInfo?.full_name || "User"}</h3>
                    <p className="text-gray-600">Customer since {userInfo?.joined_at ? new Date(userInfo.joined_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "May 2022"}</p>
                    
                    {/* <div className="mt-6 space-y-2 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span>{userInfo?.full_name || "N/A"}</span>
                      </div> */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span>{userInfo?.phone || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="text-right">{userInfo?.address || "N/A"}</span>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reward Points:</span>
                        <span className="font-bold text-purple-600">250 points</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full bg-green-50 text-green-700 hover:bg-green-100">
                      Add Money to Wallet
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                        <h4 className="text-2xl font-bold">{cartItems.length}</h4>
                        <p className="text-gray-600">Cart Items</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                        <h4 className="text-2xl font-bold">{wishlistItems.length}</h4>
                        <p className="text-gray-600">Wishlist Items</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <h4 id="orderCount" className="text-2xl font-bold">{orderCount}</h4>
                        <p className="text-gray-600">Orders Placed</p>
                      </div>
                      
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <h4 className="text-2xl font-bold">{recentlyViewed.length}</h4>
                        <p className="text-gray-600">Recently Viewed</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Top Categories</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <h4 className="font-medium text-blue-700">Electronics</h4>
                          <p className="text-sm text-gray-600">8 items</p>
                        </div>
                        <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-100">
                          <h4 className="font-medium text-amber-700">Lighting</h4>
                          <p className="text-sm text-gray-600">5 items</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                          <h4 className="font-medium text-green-700">Smart Home</h4>
                          <p className="text-sm text-gray-600">3 items</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Recent Activity</h3>
                      
                      <div className="border-l-4 border-electric-blue pl-4 py-2">
                        <h4 className="font-medium">Added Wireless Charging Pad to cart</h4>
                        <p className="text-sm text-gray-600">Today at 10:15 AM</p>
                      </div>

                      <div className="border-l-4 border-electric-blue pl-4 py-2">
                        <h4 className="font-medium">Added Digital Camera to wishlist</h4>
                        <p className="text-sm text-gray-600">Yesterday at 2:30 PM</p>
                      </div>
                      
                      <div className="border-l-4 border-electric-blue pl-4 py-2">
                        <h4 className="font-medium">Viewed 4K Smart TV product</h4>
                        <p className="text-sm text-gray-600">2 days ago at 11:15 AM</p>
                      </div>
                      
                      <div className="border-l-4 border-electric-blue pl-4 py-2">
                        <h4 className="font-medium">Sent inquiry about Smart Home Installation</h4>
                        <p className="text-sm text-gray-600">1 week ago at 4:45 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="cart">
          <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle>My Cart</CardTitle>
            <CardDescription>Items you've added to your cart</CardDescription>
          </div>
          <a href="https://pay-palace-glow.vercel.app/">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Proceed to Pay
            </Button>
          </a>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="w-full md:w-48 h-48 md:h-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="bg-gray-50">
                      Quantity: {item.quantity}
                    </Badge>
                    {item.id === 6 && (
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                        10% OFF
                      </Badge>
                    )}
                    {item.id === 5 && (
                      <Badge className="ml-2 bg-purple-100 text-purple-800 border-purple-200">
                        Free Installation
                      </Badge>
                    )}
                    {item.category === 'Electronics' && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                        Electronics
                      </Badge>
                    )}
                    {item.id === 9 && (
                      <Badge className="ml-2 bg-red-100 text-red-800 border-red-200">
                        Limited Stock
                      </Badge>
                    )}
                    {item.id === 10 && (
                      <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                        Buy 1 Get 1 Free
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">
                  ₹{item.price * item.quantity}
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                  <Button size="sm">Update</Button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 mt-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-lg">
                <span>
                  Subtotal (
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):
                </span>
                <span>
                  ₹
                  {cartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Delivery Charges:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Discount:</span>
                <span className="text-red-600">-₹240</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>
                  ₹
                  {cartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  ) - 240}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="w-1/2" variant="outline">
                Pay with Wallet (₹{walletBalance})
              </Button>
              <Button className="w-1/2">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
</TabsContent>
          
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                        <button 
                          className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <XCircle className="h-5 w-5 text-red-500" />
                        </button>
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.category}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold">₹{item.price}</span>
                            <Button size="sm" onClick={() => addToCart(item.id)}>Add to Cart</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4">Browse our products and add items to your wishlist</p>
                    <Button>Browse Products</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="viewed">
            <Card>
              <CardHeader>
                <CardTitle>Recently Viewed Products</CardTitle>
                <CardDescription>Products you've viewed recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentlyViewed.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-bl-lg">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            <span>Viewed 2d ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">₹{product.price}</span>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline" onClick={() => addToCart(product.id)}>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Cart
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Inquiries</CardTitle>
                  <Link to="/contact">
                    <Button>New Inquiry</Button>
                  </Link>
                </div>
                <CardDescription>Your past inquiries and messages</CardDescription>
              </CardHeader>
              <CardContent>
                {inquiryHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiryHistory.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell className="font-medium">{inquiry.subject}</TableCell>
                          <TableCell>{inquiry.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={inquiry.status === 'Responded' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}
                            >
                              {inquiry.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">You haven't made any inquiries yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Your current wallet balance and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Wallet Balance: ₹{walletBalance}</h3>
                </div>
                <div className="mb-4">
                  <Button onClick={() => addMoneyToWallet(500)}>Add ₹500</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {walletTransactions.map(transaction => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>₹{transaction.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;