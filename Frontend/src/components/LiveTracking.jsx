import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

// Default to Bengaluru so map doesn't show Brazil when location is unavailable
const center = {
    lat: 12.9715987,
    lng: 77.5945627
};

const LiveTracking = (props) => {
    const { pickup, destination } = props || {};
    const [ currentPosition, setCurrentPosition ] = useState(null);
    const [mapError, setMapError] = useState(false);
    const [trackingStarted, setTrackingStarted] = useState(false);
    const [permissionState, setPermissionState] = useState(null);
    const watchIdRef = useRef(null);
    const intervalRef = useRef(null);
    const mapRef = useRef(null);
    const [directions, setDirections] = useState(null);
    const [directionsRequest, setDirectionsRequest] = useState(null);
    const directionsRequestedRef = useRef(false);

    // Start geolocation tracking (called after a user gesture or when permission is already granted)
    const startTracking = () => {
        if (!navigator || !navigator.geolocation) {
            console.warn('Geolocation API not available in this browser');
            return;
        }

        if (trackingStarted) return;
        console.log('Starting geolocation tracking');
        setTrackingStarted(true);

        const success = (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Geolocation success:', latitude, longitude);
            setCurrentPosition({ lat: latitude, lng: longitude });
        };

        const fail = (err) => {
            console.warn('Geolocation error:', err);
            if (navigator.permissions && navigator.permissions.query) {
                navigator.permissions.query({ name: 'geolocation' }).then((p) => {
                    console.log('Geolocation permission state (error):', p.state);
                    setPermissionState(p.state);
                }).catch((permErr) => console.warn('Permissions API error:', permErr));
            }
        };

        navigator.geolocation.getCurrentPosition(success, fail, { enableHighAccuracy: true });
        watchIdRef.current = navigator.geolocation.watchPosition(success, fail, { enableHighAccuracy: true });
        intervalRef.current = setInterval(() => navigator.geolocation.getCurrentPosition(success, fail, { enableHighAccuracy: true }), 10000);
    };

    useEffect(() => {
        // Query permission on mount; only auto-start if permission is already granted
        if (navigator && navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: 'geolocation' }).then((p) => {
                console.log('Geolocation permission state (mount):', p.state);
                setPermissionState(p.state);
                if (p.state === 'granted') startTracking();
                p.onchange = () => {
                    console.log('Permission changed to', p.state);
                    setPermissionState(p.state);
                    if (p.state === 'granted') startTracking();
                };
            }).catch((err) => console.warn('Permissions API error:', err));
        }

        return () => {
            if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
            console.log('LiveTracking unmounted: cleared trackers');
        };
    }, []);

    // interval/watch handled in startTracking; nothing here unless you want additional behavior

    useEffect(() => {
        console.log('Current position state changed:', currentPosition);
    }, [currentPosition]);

    // Handle route directions when pickup and destination are provided
    useEffect(() => {
        if (pickup && destination && !directionsRequestedRef.current) {
            directionsRequestedRef.current = true;
            setDirectionsRequest({
                origin: pickup,
                destination: destination,
                travelMode: window.google?.maps?.TravelMode?.DRIVING || 'DRIVING'
            });
        } else if (!pickup || !destination) {
            directionsRequestedRef.current = false;
            setDirections(null);
            setDirectionsRequest(null);
        }
    }, [pickup, destination]);

    const directionsCallback = (result, status) => {
        if (status === 'OK' && result) {
            setDirections(result);
            // Fit map to show entire route
            if (mapRef.current && result.routes && result.routes[0]) {
                const bounds = new window.google.maps.LatLngBounds();
                result.routes[0].legs.forEach(leg => {
                    bounds.extend(leg.start_location);
                    bounds.extend(leg.end_location);
                });
                mapRef.current.fitBounds(bounds);
            }
        } else {
            console.error('Directions request failed:', status);
        }
    };
    

    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onError={() => setMapError(true)}
        >
            {mapError ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                    <p>Unable to load map. Check browser tracking settings or API key.</p>
                </div>
            ) : (
                <div style={{ width: '100%', height: '100%' }}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentPosition || center}
                        zoom={directions ? 13 : 15}
                        onLoad={(map) => {
                            mapRef.current = map;
                        }}
                        options={{
                            disableDefaultUI: false,
                            zoomControl: true,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false
                        }}
                    >
                        {directionsRequest && (
                            <DirectionsService
                                options={directionsRequest}
                                callback={directionsCallback}
                            />
                        )}
                        {directions && (
                            <DirectionsRenderer
                                directions={directions}
                                options={{
                                    suppressMarkers: true, // Hide default A/B markers
                                    preserveViewport: false,
                                    polylineOptions: {
                                        strokeColor: '#3b82f6',
                                        strokeWeight: 5,
                                        strokeOpacity: 0.8,
                                        icons: [{
                                            icon: {
                                                path: window.google?.maps?.SymbolPath?.FORWARD_CLOSED_ARROW,
                                                scale: 4,
                                                strokeColor: '#3b82f6',
                                                strokeWeight: 2,
                                                fillColor: '#3b82f6',
                                                fillOpacity: 1
                                            },
                                            offset: '100%',
                                            repeat: '80px'
                                        }]
                                    },
                                    markerOptions: {
                                        visible: true
                                    }
                                }}
                            />
                        )}
                        {currentPosition && !directions && <Marker position={currentPosition} />}
                    </GoogleMap>
                </div>
            )}
        </LoadScript>
    )
}

export default LiveTracking