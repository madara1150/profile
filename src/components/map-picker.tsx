"use client";

import { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

interface MapPickerProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "0.5rem"
};

// Default center: Bangkok
const defaultCenter = {
    lat: 13.7563,
    lng: 100.5018
};

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Must be provided in .env
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

    const onLoad = useCallback(function callback(mapInstance: google.maps.Map) {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(function callback(mapInstance: google.maps.Map) {
        setMap(null);
    }, []);

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPosition({ lat, lng });
            onLocationSelect(lat, lng);
        }
    };

    if (loadError) {
        return (
            <div className="h-full w-full bg-destructive/10 text-destructive flex flex-col items-center justify-center p-4 text-center rounded-md border border-destructive/20">
                <p className="font-bold mb-2">Failed to load Google Maps</p>
                <p className="text-sm">Please check your internet connection or API key configuration.</p>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="h-full w-full bg-muted flex flex-col items-center justify-center rounded-md animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Loading Map Engine...</p>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={5}
            onClick={handleMapClick}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                disableDefaultUI: false,
                clickableIcons: false,
            }}
        >
            {markerPosition && (
                <Marker position={markerPosition} />
            )}
        </GoogleMap>
    );
}
