"use client";

import { Header } from "../../../components/layout/header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Star, ArrowLeft, Snowflake, Phone, Clock, CreditCard, MapPin } from "lucide-react";
import { imagePath } from "../../../lib/utils";

const rooms = [
    {
        id: "flat-1",
        title: "Flat 1",
        guests: 4,
        price: 4500,
        image: imagePath("/images/flat1.jpg"),
        features: ["Split AC", "King Size Bed", "Kitchenette", "Balcony", "City View"]
    },
    {
        id: "flat-2",
        title: "Flat 2",
        guests: 4,
        price: 4500,
        image: imagePath("/images/flat2-1.jpg"),
        features: ["Split AC", "Queen Size Bed", "Living Area", "Work Desk", "Garden View"]
    },
    {
        id: "suite",
        title: "Suite Room",
        guests: 2,
        price: 6000,
        image: imagePath("/images/suite1.jpg"),
        features: ["Split AC", "Jacuzzi", "Panoramic View", "Mini Bar", "Premium Bedding"]
    },
    {
        id: "deck",
        title: "Deck Room",
        guests: 2,
        price: 5500,
        image: imagePath("/images/deck1.jpg"),
        features: ["Split AC", "Private Terrace", "Outdoor Seating", "Stargazing", "Romantic Setup"]
    },
    {
        id: "open-area",
        title: "Open Area",
        guests: 10,
        price: 3000,
        image: imagePath("/images/deck1.jpg"),
        features: ["Open Air", "Event Space", "Group Seating", "Natural Breeze"]
    }
];

export default function BookingPage() {
    const router = useRouter();
    const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
    const [acFilter, setAcFilter] = useState(false);
    const [advancePayment, setAdvancePayment] = useState(false);

    const filteredRooms = acFilter
        ? rooms.filter((r) => r.features.includes("Split AC"))
        : rooms;

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="pt-32 pb-24 container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-5xl font-playfair font-bold text-primary mb-4">Book Your Stay</h1>
                    <p className="text-muted-foreground font-inter">Secure your luxury experience at VOHO Bhimavaram.</p>
                </div>

                {/* Booking Time Rules */}
                <div className="mb-10 bg-[#0F2822] text-white p-6 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="flex items-center gap-3">
                        <Clock size={20} className="text-[#D4AF37]" />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Check-in Time</p>
                            <p className="text-lg font-bold text-[#D4AF37]">1:00 PM</p>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-white/20 hidden md:block" />
                    <div className="flex items-center gap-3">
                        <Clock size={20} className="text-[#D4AF37]" />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Check-out Time</p>
                            <p className="text-lg font-bold text-[#D4AF37]">11:00 AM</p>
                        </div>
                    </div>
                </div>

                {/* AC Filter */}
                <div className="mb-6 flex items-center gap-3">
                    <button
                        onClick={() => setAcFilter(!acFilter)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold border transition-all ${acFilter ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                    >
                        <Snowflake size={16} /> Climate Control (AC)
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Room Selection */}
                    <div className="lg:col-span-8 space-y-8">
                        {filteredRooms.map((room) => (
                            <div
                                key={room.id}
                                onClick={() => setSelectedRoom(room)}
                                className={`flex flex-col md:flex-row gap-6 p-6 border transition-all cursor-pointer ${selectedRoom.id === room.id ? "border-accent bg-accent/5 shadow-xl" : "border-gray-100 bg-white hover:border-gray-300"}`}
                            >
                                <div className="relative w-full md:w-64 aspect-video md:aspect-square shrink-0">
                                    <Image src={room.image} alt={room.title} fill className="object-cover" />
                                    {room.features.includes("Split AC") && (
                                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                                            <Snowflake size={10} /> AC
                                        </div>
                                    )}
                                    {room.id === "open-area" && (
                                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                                            <MapPin size={10} /> Open Area
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-playfair font-bold text-primary">{room.title}</h3>
                                        {selectedRoom.id === room.id && <div className="bg-accent text-white p-1 rounded-full"><Check size={16} /></div>}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1"><Users size={16} /> {room.guests} Guests</span>
                                        <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-current" /> 4.9</span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                                        {room.features.map((f, i) => (
                                            <span key={i} className={`text-xs font-inter px-2 py-1 ${f === "Split AC" ? "bg-blue-50 text-blue-600 font-bold" : "bg-gray-100 text-gray-600"}`}>
                                                {f === "Split AC" ? `❄️ ${f}` : f}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto">
                                        <span className="text-2xl font-bold text-primary">₹ {room.price.toLocaleString()}</span>
                                        <span className="text-xs text-muted-foreground"> / night</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Booking Form (Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white p-6 border border-gray-100 shadow-2xl">
                                <h3 className="text-2xl font-playfair font-bold mb-6">Reservation Summary</h3>

                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="w-16 h-16 relative">
                                        <Image src={selectedRoom.image} alt={selectedRoom.title} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary">{selectedRoom.title}</p>
                                        <p className="text-sm text-muted-foreground">₹ {selectedRoom.price.toLocaleString()} / night</p>
                                    </div>
                                </div>

                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase text-gray-400">Check-in Date</label>
                                            <input type="date" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase text-gray-400">Check-out Date</label>
                                            <input type="date" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                                        <input type="text" placeholder="Enter your full name" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent" />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
                                        <input type="email" placeholder="Enter your email address" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent" />
                                    </div>

                                    {/* Advance Payment Option */}
                                    <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200">
                                        <input
                                            type="checkbox"
                                            id="advancePayment"
                                            checked={advancePayment}
                                            onChange={(e) => setAdvancePayment(e.target.checked)}
                                            className="w-4 h-4 accent-[#D4AF37]"
                                        />
                                        <label htmlFor="advancePayment" className="text-sm font-medium cursor-pointer">
                                            <CreditCard size={14} className="inline mr-1 text-[#D4AF37]" />
                                            Pay in advance (Get priority confirmation)
                                        </label>
                                    </div>

                                    {/* Booking Time Policy */}
                                    <div className="bg-gray-50 p-3 text-xs text-gray-500 space-y-1">
                                        <p className="font-bold uppercase text-gray-600">Booking Policy</p>
                                        <p>• Check-in: <strong>1:00 PM</strong></p>
                                        <p>• Check-out: <strong>11:00 AM</strong></p>
                                        <p>• Free cancellation up to 24 hours before check-in</p>
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex justify-between mb-2 text-sm">
                                            <span>₹ {selectedRoom.price.toLocaleString()} x 1 Night</span>
                                            <span>₹ {selectedRoom.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between mb-4 text-sm">
                                            <span>Taxes & Fees (12%)</span>
                                            <span>₹ {(selectedRoom.price * 0.12).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between mb-6 text-lg font-bold text-primary pt-4 border-t border-gray-100">
                                            <span>Total</span>
                                            <span>₹ {(selectedRoom.price * 1.12).toLocaleString()}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => router.push("/payment")}
                                            className="w-full bg-[#0F2822] text-[#D4AF37] font-bold py-4 rounded-none hover:bg-[#D4AF37] hover:text-[#0F2822] transition-colors shadow-lg"
                                        >
                                            {advancePayment ? "Pay & Confirm Booking" : "Confirm Booking"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Call Us to Book */}
                            <div className="bg-[#0F2822] text-white p-6 text-center">
                                <Phone size={24} className="mx-auto mb-3 text-[#D4AF37]" />
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Prefer to book by phone?</p>
                                <p className="text-xl font-bold text-[#D4AF37] mb-2">Call Us to Book</p>
                                <a href="tel:+919876543210" className="text-2xl font-bold hover:text-[#D4AF37] transition-colors">
                                    +91 98765 43210
                                </a>
                                <p className="text-xs text-gray-400 mt-2">Available 24/7 for reservations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
