"use client";

import { useRef, useState, useEffect } from "react";
import { Download, FastForward, Rewind } from "lucide-react";

export function ExploreSpaces() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const p = (video.currentTime / video.duration) * 100;
            setProgress(p);
            setCurrentTime(formatTime(video.currentTime));
        };

        const handleLoaded = () => {
            setDuration(formatTime(video.duration));
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoaded);
        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoaded);
        };
    }, []);

    const forward10 = () => {
        if (videoRef.current) videoRef.current.currentTime += 10;
    };

    const rewind10 = () => {
        if (videoRef.current) videoRef.current.currentTime -= 10;
    };

    const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const bar = progressBarRef.current;
        if (!video || !bar) return;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const fraction = clickX / rect.width;
        video.currentTime = fraction * video.duration;
    };

    const downloadVideo = async () => {
        try {
            const response = await fetch("https://api.armenia.travel/storage/Travel-Armenia_Hero-video-edit_08142025-2-15.mp4");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "VOHO_Spaces.mp4";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch {
            window.open("https://api.armenia.travel/storage/Travel-Armenia_Hero-video-edit_08142025-2-15.mp4", "_blank");
        }
    };

    return (
        <section className="py-24 bg-[#0F2822]">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-bold mb-3">Virtual Tour</p>
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
                        Explore Our Spaces
                    </h2>
                    <p className="text-gray-400 font-inter max-w-xl mx-auto">
                        Take a closer look at our curated interiors and outdoor areas. Watch, explore, and envision your stay.
                    </p>
                </div>

                {/* Video Player */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-black overflow-hidden">
                        <video
                            ref={videoRef}
                            className="w-full aspect-video object-cover"
                            playsInline
                            controls={false}
                            autoPlay
                            muted
                            loop
                        >
                            <source
                                src="https://api.armenia.travel/storage/Travel-Armenia_Hero-video-edit_08142025-2-15.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>

                    {/* Custom Controls */}
                    <div className="bg-[#162130] p-4">
                        {/* Progress Bar */}
                        <div
                            ref={progressBarRef}
                            onClick={seekVideo}
                            className="w-full h-1.5 bg-white/20 cursor-pointer hover:h-2.5 transition-all mb-4 group"
                        >
                            <div
                                className="h-full bg-[#D4AF37] transition-all relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <button onClick={rewind10} className="hover:text-[#D4AF37] transition-colors" title="Rewind 10s">
                                    <Rewind size={20} />
                                </button>
                                <button onClick={forward10} className="hover:text-[#D4AF37] transition-colors" title="Forward 10s">
                                    <FastForward size={20} />
                                </button>
                                <span className="text-xs text-gray-400 font-mono ml-2">{currentTime} / {duration}</span>
                            </div>

                            <button
                                onClick={downloadVideo}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white hover:text-black px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all border border-white/20"
                            >
                                <Download size={14} /> Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
