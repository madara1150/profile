"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { X, MapPin, Loader2, Search } from "lucide-react";

// Dynamically import Google map to avoid server-side rendering errors
const MapPicker = dynamic(() => import("./map-picker"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted flex flex-col items-center justify-center rounded-md animate-pulse"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
});

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (locationName: string) => void;
}

export function LocationModal({ isOpen, onClose, onConfirm }: LocationModalProps) {
    const [selectedCoords, setSelectedCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [addressName, setAddressName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleLocationSelect = async (lat: number, lng: number) => {
        setSelectedCoords({ lat, lng });
        setIsLoading(true);
        setError(null);

        try {
            // Google Reverse Geocoding API
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

            if (!apiKey) {
                // Formatting fallback if API Key is not set
                setAddressName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                throw new Error("Google Maps API Key missing in environment variables (.env)");
            }

            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=en`);
            const data = await res.json();

            if (data.status === "OK" && data.results && data.results.length > 0) {
                // Find a locality, city, or general neighborhood feature to use as name, or just use formatted_address
                const address = data.results[0].formatted_address;
                setAddressName(address);
            } else {
                setAddressName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                setError("Could not resolve specific address, using coordinates.");
            }
        } catch (err: any) {
            console.error("Geocoding error:", err);
            setAddressName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            setError(err.message || "Failed to fetch address location.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = () => {
        if (!addressName) return;
        onConfirm(addressName);
        handleClose();
    };

    const handleClose = () => {
        setSelectedCoords(null);
        setAddressName("");
        setError(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card border border-border/50 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" /> Select Google Maps Location
                    </h3>
                    <button onClick={handleClose} className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 bg-muted/10 text-sm text-muted-foreground">
                    Click anywhere on the map to drop a pin.
                    {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                        <span className="block mt-1 text-amber-500 font-semibold">Warning: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined. Features may not work.</span>
                    )}
                </div>

                <div className="relative flex-1 min-h-[400px] w-full p-4 pt-0">
                    <div className="h-full w-full rounded-md overflow-hidden border border-border">
                        <MapPicker onLocationSelect={handleLocationSelect} />
                    </div>
                </div>

                <div className="p-4 border-t border-border/50 bg-accent/20 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div className="flex-1 w-full">
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Selected Location Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={addressName}
                                onChange={(e) => setAddressName(e.target.value)}
                                placeholder="e.g. Tokyo, Japan"
                                className="w-full flex h-10 rounded-md border border-input bg-background/50 px-3 py-2 pl-9 text-sm ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 text-muted-foreground absolute left-3 top-3 animate-spin" />
                            ) : (
                                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                            )}
                        </div>
                        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-5">
                        <button
                            onClick={handleClose}
                            className="w-full sm:w-auto px-4 py-2 border border-border rounded-md hover:bg-muted font-medium text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!addressName || isLoading}
                            className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm Selection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
