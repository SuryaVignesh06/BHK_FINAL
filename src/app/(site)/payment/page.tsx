"use client";

import { Header } from "../../../components/layout/header";
import { Footer } from "../../../components/layout/footer";
import { useState } from "react";
import { CreditCard, Wallet, Building, CheckCircle, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState<"card" | "upi" | "netbanking">("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-[#0F2822] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 shadow-2xl max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl font-playfair font-bold text-[#0F2822] mb-4">Payment Successful!</h1>
                    <p className="text-gray-500 mb-8 font-inter">Your booking has been confirmed. A confirmation email has been sent to you.</p>
                    <Link href="/" className="block w-full bg-[#0F2822] text-[#D4AF37] font-bold py-4 hover:bg-[#D4AF37] hover:text-[#0F2822] transition-colors uppercase tracking-widest">
                        Return to Home
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8f9fa]">
            <Header />

            <div className="pt-32 pb-24 container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/booking" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-[#0F2822] transition-colors">
                        <ArrowLeft size={16} /> Back to Booking
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Payment Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white border border-gray-100 shadow-xl overflow-hidden">
                            <div className="bg-[#0F2822] p-6 text-white flex items-center justify-between">
                                <h1 className="text-2xl font-playfair font-bold">Secure Payment</h1>
                                <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-medium">
                                    <Lock size={16} /> 256-bit SSL Encrypted
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row border-b border-gray-100">
                                <button
                                    onClick={() => setSelectedMethod("card")}
                                    className={`flex-1 p-6 flex items-center justify-center gap-3 font-bold transition-colors ${selectedMethod === "card" ? "bg-white text-[#0F2822] border-b-4 border-[#D4AF37]" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <CreditCard size={20} /> Card
                                </button>
                                <button
                                    onClick={() => setSelectedMethod("upi")}
                                    className={`flex-1 p-6 flex items-center justify-center gap-3 font-bold transition-colors ${selectedMethod === "upi" ? "bg-white text-[#0F2822] border-b-4 border-[#D4AF37]" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <Wallet size={20} /> UPI
                                </button>
                                <button
                                    onClick={() => setSelectedMethod("netbanking")}
                                    className={`flex-1 p-6 flex items-center justify-center gap-3 font-bold transition-colors ${selectedMethod === "netbanking" ? "bg-white text-[#0F2822] border-b-4 border-[#D4AF37]" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <Building size={20} /> Net Banking
                                </button>
                            </div>

                            <div className="p-8">
                                <form onSubmit={handlePayment} className="space-y-6">
                                    {selectedMethod === "card" && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-gray-500">Card Number</label>
                                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] font-mono" required />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-gray-500">Expiry View</label>
                                                    <input type="text" placeholder="MM/YY" className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] font-mono" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-gray-500">CVV</label>
                                                    <input type="text" placeholder="123" maxLength={3} className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] font-mono" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-gray-500">Cardholder Name</label>
                                                <input type="text" placeholder="Name on Card" className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37]" required />
                                            </div>
                                        </div>
                                    )}

                                    {selectedMethod === "upi" && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-gray-500">UPI ID</label>
                                                <input type="text" placeholder="username@upi" className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37]" required />
                                            </div>
                                            <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
                                                OR
                                            </div>
                                            <div className="border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-gray-400 gap-2">
                                                <div className="w-32 h-32 bg-gray-200 animate-pulse" />
                                                <span className="text-xs uppercase font-bold">Scan QR Code</span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedMethod === "netbanking" && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                            <div className="grid grid-cols-2 gap-4">
                                                {['HDFC', 'ICICI', 'SBI', 'Axis'].map((bank) => (
                                                    <button type="button" key={bank} className="border border-gray-200 p-4 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 font-bold text-gray-700 transition-colors">
                                                        {bank}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-gray-500">Other Banks</label>
                                                <select className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] bg-white">
                                                    <option>Select your bank</option>
                                                    <option>Kotak Mahindra</option>
                                                    <option>IndusInd</option>
                                                    <option>Yes Bank</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full bg-[#0F2822] text-[#D4AF37] font-bold py-5 hover:bg-[#D4AF37] hover:text-[#0F2822] transition-all shadow-lg flex items-center justify-center gap-2 group mt-8"
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center gap-2">Processing <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" /></span>
                                        ) : (
                                            <>Pay Now <span className="group-hover:translate-x-1 transition-transform">→</span></>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 border border-gray-100 shadow-2xl sticky top-32">
                            <h3 className="text-xl font-playfair font-bold mb-6 text-[#0F2822]">Order Summary</h3>

                            <div className="space-y-4 text-sm font-inter border-b border-gray-100 pb-6 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Room Charges</span>
                                    <span>₹ 4,500</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes & Fees (12%)</span>
                                    <span>₹ 540</span>
                                </div>
                                <div className="flex justify-between text-[#D4AF37] font-bold">
                                    <span>Discount</span>
                                    <span>- ₹ 0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-2xl font-bold text-[#0F2822] mb-8">
                                <span>Total</span>
                                <span>₹ 5,040</span>
                            </div>

                            <div className="bg-gray-50 p-4 text-xs text-gray-500 leading-relaxed">
                                <p className="mb-2 font-bold uppercase">Cancellation Policy</p>
                                <p>Free cancellation up to 24 hours before check-in. Non-refundable thereafter.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
