import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const defaultCenter = {
    lat: 25.6234486,
    lng: 85.1323779,
};

const LiveTracking = ({ initialCenter, height = '100%', zoom = 15 }) => {
    const [currentPosition, setCurrentPosition] = useState(initialCenter || defaultCenter);
    const [geoError, setGeoError] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const onSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
            console.log('Position updated:', latitude, longitude);
        };

        const onError = (error) => {
            setGeoError(error?.message || 'Geolocation failed');
            console.warn('Geolocation error:', error?.message || error);
        };

        const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        if (mapRef.current && currentPosition) {
            mapRef.current.panTo(currentPosition);
        }
    }, [currentPosition]);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <div style={{ width: '100%', height }}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={zoom}
                    onLoad={(map) => { mapRef.current = map; console.log('Map loaded'); }}
                    onClick={(e) => {
                        const lat = e.latLng.lat();
                        const lng = e.latLng.lng();
                        setCurrentPosition({ lat, lng });
                    }}
                >
                    <Marker
                        position={currentPosition}
                        key={`${currentPosition.lat},${currentPosition.lng}`}
                        draggable
                        onDragEnd={(e) => {
                            const lat = e.latLng.lat();
                            const lng = e.latLng.lng();
                            setCurrentPosition({ lat, lng });
                        }}
                    />
                </GoogleMap>
            </div>
            {geoError && (
                <div style={{ position: 'absolute', top: 8, left: 8, background: '#fff', padding: '8px 10px', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: 12 }}>
                    Geolocation error: {geoError || 'Unknown error'}
                    <br />
                    Tips: Allow location permission; use HTTPS or `localhost`.
                </div>
            )}
            <div style={{ position: 'absolute', bottom: 8, left: 8, background: '#fff', padding: '6px 10px', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: 12 }}>
                Lat: {Number(currentPosition.lat).toFixed(6)} | Lng: {Number(currentPosition.lng).toFixed(6)}
            </div>
        </LoadScript>
    );
}

export default LiveTracking