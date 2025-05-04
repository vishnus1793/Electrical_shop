import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  Eye,
  Activity,
  Bell,
  Settings,
  Loader2,
  AlertCircle
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

// Fallback data in case Supabase fetching fails
const fallbackSalesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const fallbackProductViewsData = [
  { name: 'Jan', views: 7000 },
  { name: 'Feb', views: 8500 },
  { name: 'Mar', views: 9200 },
  { name: 'Apr', views: 8700 },
  { name: 'May', views: 10000 },
  { name: 'Jun', views: 12000 },
];

const fallbackProducts = [
  { id: 1, name: 'LED Bulb 9W', category: 'Lighting', stock: 45, price: 249 },
  { id: 2, name: 'Smart Switch', category: 'Switches', stock: 32, price: 599 },
  { id: 3, name: 'MCB Circuit Breaker', category: 'Circuit Breakers', stock: 0, price: 349 },
  { id: 4, name: 'Copper Wire 1.5mm', category: 'Wires', stock: 67, price: 1299 },
  { id: 5, name: 'Smart Plug', category: 'Smart Home', stock: 18, price: 899 },
];

const fallbackInquiries = [
  { id: 1, name: 'Arjun Sharma', subject: 'Price inquiry for smart switches', status: 'New', date: 'Today, 10:30 AM' },
  { id: 2, name: 'Priya Patel', subject: 'Bulk order for LED bulbs', status: 'Responded', date: 'Yesterday, 3:45 PM' },
  { id: 3, name: 'Rahul Gupta', subject: 'Installation service availability', status: 'Resolved', date: 'Apr 21, 2025' },
  { id: 4, name: 'Meera Joshi', subject: 'Return policy question', status: 'New', date: 'Apr 20, 2025' },
];

const fallbackStats = {
  totalRevenue: 128450,
  totalProducts: 432,
  totalSales: 284,
  activeUsers: 573,
  revenueChange: 18.1,
  productsChange: 24,
  salesChange: 12.5,
  usersChange: 32
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState(fallbackSalesData);
  const [productViewsData, setProductViewsData] = useState(fallbackProductViewsData);
  const [recentProducts, setRecentProducts] = useState(fallbackProducts);
  const [recentInquiries, setRecentInquiries] = useState(fallbackInquiries);
  const [dashboardStats, setDashboardStats] = useState(fallbackStats);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Attempt to check if we can connect to Supabase
        const { data: connectionTest, error: connectionError } = await supabase
          .from('sales_monthly')
          .select('count')
          .limit(1);
          
        console.log("Supabase connection test:", connectionTest, connectionError);
        
        if (connectionError) {
          console.error("Supabase connection error:", connectionError);
          throw new Error("Could not connect to the database. Using fallback data.");
        }

        // Fetch sales data - try/catch for each fetch to allow partial data loading
        try {
          const { data: sales, error: salesError } = await supabase
            .from('sales_monthly')
            .select('*')
            .order('month', { ascending: true })
            .limit(6);
          
          console.log("Fetched sales data:", sales, salesError);
          
          if (salesError) throw salesError;
          if (sales && sales.length > 0) {
            setSalesData(sales.map(item => ({
              name: item.month_name || item.month,
              sales: item.total_sales || item.sales
            })));
          }
        } catch (err) {
          console.error("Error fetching sales data:", err);
          // Keep fallback data
        }

        // Fetch product views data
        try {
          const { data: views, error: viewsError } = await supabase
            .from('product_views')
            .select('*')
            .order('month', { ascending: true })
            .limit(6);
          
          console.log("Fetched views data:", views, viewsError);
          
          if (viewsError) throw viewsError;
          if (views && views.length > 0) {
            setProductViewsData(views.map(item => ({
              name: item.month_name || item.month,
              views: item.view_count || item.views
            })));
          }
        } catch (err) {
          console.error("Error fetching product views data:", err);
          // Keep fallback data
        }

        // Fetch recent products
        try {
          const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
          
          console.log("Fetched products data:", products, productsError);
          
          if (productsError) throw productsError;
          if (products && products.length > 0) {
            setRecentProducts(products.map(product => ({
              id: product.id,
              name: product.name,
              category: product.category,
              stock: product.stock_quantity || product.stock,
              price: product.price
            })));
          }
        } catch (err) {
          console.error("Error fetching products data:", err);
          // Keep fallback data
        }

        // Try fetching messages from different possible table names
        try {
          // First try 'messages' table
          let messagesData = null;
          let messagesError = null;
          
          const messagesResult = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(4);
            
          messagesData = messagesResult.data;
          messagesError = messagesResult.error;
          
          // If no data or error, try 'Message' table instead
          if (!messagesData || messagesError) {
            const messageResult = await supabase
              .from('Message')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(4);
              
            messagesData = messageResult.data;
            messagesError = messageResult.error;
          }
          
          // If no data or error, try 'inquiries' table as last resort
          if (!messagesData || messagesError) {
            const inquiriesResult = await supabase
              .from('inquiries')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(4);
              
            messagesData = inquiriesResult.data;
            messagesError = inquiriesResult.error;
          }
          
          console.log("Fetched inquiries data:", messagesData, messagesError);
          
          if (messagesData && messagesData.length > 0) {
            setRecentInquiries(messagesData.map(message => ({
              id: message.id,
              name: message.customer_name || message.name || "Customer",
              subject: message.subject || message.message || "Inquiry",
              status: message.status || "New",
              date: message.created_at ? 
                new Date(message.created_at).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 
                "Recent"
            })));
          }
        } catch (err) {
          console.error("Error fetching inquiries data:", err);
          // Keep fallback data
        }

        // Fetch dashboard statistics
        try {
          const { data: stats, error: statsError } = await supabase
            .from('dashboard_statistics')
            .select('*')
            .single();
          
          console.log("Fetched stats data:", stats, statsError);
          
          if (statsError) throw statsError;
          if (stats) {
            setDashboardStats({
              totalRevenue: stats.total_revenue || stats.revenue || fallbackStats.totalRevenue,
              totalProducts: stats.total_products || stats.products || fallbackStats.totalProducts,
              totalSales: stats.total_sales || stats.sales || fallbackStats.totalSales,
              activeUsers: stats.active_users || stats.users || fallbackStats.activeUsers,
              revenueChange: stats.revenue_change || stats.revenue_growth || fallbackStats.revenueChange,
              productsChange: stats.products_change || stats.product_growth || fallbackStats.productsChange,
              salesChange: stats.sales_change || stats.sales_growth || fallbackStats.salesChange,
              usersChange: stats.users_change || stats.user_growth || fallbackStats.usersChange
            });
          }
        } catch (err) {
          console.error("Error fetching dashboard statistics:", err);
          // Keep fallback data
        }

      } catch (mainError) {
        console.error('Main error fetching dashboard data:', mainError);
        setError(mainError.message || "Failed to load dashboard data");
        // All fallback data is already set as initial state
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-gray-600">Loading dashboard data...</p>
    </div>
  );

  // Error state component
  const ErrorState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <p className="text-lg text-gray-800 font-medium mb-2">Something went wrong</p>
      <p className="text-gray-600 mb-4">{message}</p>
      <p className="text-sm text-gray-500">Showing fallback data instead</p>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-electric-blue-dark">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </motion.div>
          
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : (
              <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardStats.revenueChange >= 0 ? '+' : ''}{dashboardStats.revenueChange}% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Products</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardStats.productsChange >= 0 ? '+' : ''}{dashboardStats.productsChange} new this month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sales</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardStats.totalSales}</div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardStats.salesChange >= 0 ? '+' : ''}{dashboardStats.salesChange}% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardStats.activeUsers}</div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardStats.usersChange >= 0 ? '+' : ''}{dashboardStats.usersChange} new users
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Sales</CardTitle>
                      <CardDescription>Sales performance over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="sales" fill="#8884d8" name="Sales (₹)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Views</CardTitle>
                      <CardDescription>Website traffic analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={productViewsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Products</CardTitle>
                      <CardDescription>Latest products added to inventory</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>
                                {product.stock > 0 ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                    In Stock ({product.stock})
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                                    Out of Stock
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>₹{product.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Inquiries</CardTitle>
                      <CardDescription>Latest customer messages</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentInquiries.slice(0, 3).map((inquiry) => (
                          <div key={inquiry.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{inquiry.name}</h4>
                                <p className="text-sm text-gray-600 truncate">{inquiry.subject}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  inquiry.status === "New"
                                    ? "bg-blue-50 text-blue-700"
                                    : inquiry.status === "Responded"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-green-50 text-green-700"
                                }
                              >
                                {inquiry.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setActiveTab("inquiries")}
                      >
                        View All Inquiries
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            )}
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Product Management</CardTitle>
                  <Button>Add New Product</Button>
                </div>
                <CardDescription>Manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingState />
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Filter</Button>
                        <Button variant="outline" size="sm">Sort</Button>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Eye className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                              {product.stock > 0 ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                  In Stock ({product.stock})
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                                  Out of Stock
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>₹{product.price}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>2
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>Manage customer messages and inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingState />
                ) : (
                  <div className="space-y-6">
                    {recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-lg">{inquiry.name}</h4>
                            <p className="text-sm text-gray-600">{inquiry.subject}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              inquiry.status === "New"
                                ? "bg-blue-50 text-blue-700"
                                : inquiry.status === "Responded"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-green-50 text-green-700"
                            }
                          >
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">{inquiry.date}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Respond</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Detailed performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingState />
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Sales Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={salesData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Traffic Conversion</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={productViewsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Performance Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center py-4 text-gray-500">
                          Detailed analytics will be available in the next update.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;