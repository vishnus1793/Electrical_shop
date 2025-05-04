import { useIsMobile } from "@/hooks/use-mobile";
import PaymentForm from "./PaymentForm";
import PaymentLogo from "./PaymentLogo";
import { Card } from "./ui/card";

const PaymentPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-razorpay flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl mx-auto">
        {/* Logo Section */}
        <div className="mb-6 sm:mb-10">
          <PaymentLogo />
        </div>
        
        {/* Main Payment Container */}
        <div className={`relative ${isMobile ? 'pt-4' : 'pt-8'} pb-6 sm:pb-12 px-4`}>
          {/* Security Features */}
          <div className="hidden sm:flex justify-center mb-8 space-x-8">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-razorpay-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-white">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-razorpay-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-white">Instant Receipt</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-razorpay-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-white">24/7 Support</span>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="flex justify-center">
            <div className="w-full animate-float">
              <PaymentForm />
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="mt-6 sm:mt-10 flex flex-col items-center">
            <p className="text-white text-xs mb-2">We Accept</p>
            <div className="flex space-x-3 justify-center">
              <Card className="w-12 h-8 flex items-center justify-center p-1 bg-white">
                <span className="text-xs font-bold text-blue-800">VISA</span>
              </Card>
              <Card className="w-12 h-8 flex items-center justify-center p-1 bg-white">
                <span className="text-xs font-bold text-red-600">MC</span>
              </Card>
              <Card className="w-12 h-8 flex items-center justify-center p-1 bg-white">
                <span className="text-xs font-bold text-green-600">UPI</span>
              </Card>
              <Card className="w-12 h-8 flex items-center justify-center p-1 bg-white">
                <span className="text-xs font-bold text-gray-800">MORE</span>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 w-full text-center">
        <p className="text-xs text-white opacity-70">
          © {new Date().getFullYear()} PayPalace. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;

