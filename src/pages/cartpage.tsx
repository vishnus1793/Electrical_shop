import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Trash2, ShoppingBag, Minus, Plus, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthProvider";

const CartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
//   const { user } = AuthProvider();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
 
  // Apply a fixed shipping cost based on cart total
  const shippingCost = totalPrice > 1000 ? 0 : 150;
  const tax = totalPrice * 0.18; // 18% tax
  const total = totalPrice + shippingCost + tax;
 
  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      toast({
        title: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }
   
    toast({
      title: "Invalid coupon",
      description: "The coupon code you entered is invalid or expired",
      variant: "destructive",
    });
  };
 
  const handleCheckout = () => {
    // if (!user) {
    //   toast({
    //     title: "Please sign in",
    //     description: "You need to be signed in to proceed to checkout",
    //   });
    //   navigate("/login", { state: { from: "/checkout" } });
    //   return;
    // }
   
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>
       
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row border-b pb-6">
                        <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-md overflow-hidden mb-4 md:mb-0">
                          <img
                            src={item.image || "https://lovable.dev/opengraph-image-p98pqg.png"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                       
                        <div className="flex-grow md:ml-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                              {(item.size || item.color) && (
                                <div className="text-sm text-gray-500 space-y-1">
                                  {item.color && <p>Color: {item.color}</p>}
                                  {item.size && <p>Size: {item.size}</p>}
                                </div>
                              )}
                            </div>
                           
                            <div className="mt-3 md:mt-0 text-right">
                              <div className="font-medium text-lg">₹{item.price.toFixed(0)}</div>
                            </div>
                          </div>
                         
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                           
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-3 md:mt-0"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                 
                  <div className="mt-6">
                    <Link to="/shop" className="text-primary hover:underline flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
           
            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                 
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                   
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>
                        {shippingCost === 0
                          ? "Free"
                          : `₹${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                   
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax (18%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                   
                    <div className="flex justify-between">
                      <div className="flex flex-grow mr-4">
                        <Input
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                 
                  <Separator className="my-6" />
                 
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                 
                  <Button
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;