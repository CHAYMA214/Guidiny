import React, { useState, useEffect } from "react";
import { useAuth } from "../user.js/auth";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../css/map.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapControls from "../tools/mapcontrollers";
import MapdashControls from "../tools/dashmapcontrollers";
import LeafletRoutingMachine from "../tools/wrapper";
import DirectionPanel from "../tools/DirectionPanelhome";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const myPositionIcon = L.icon({
  iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function Map({ setSelectedMarker }) {
  const { user, token, loading } = useAuth();
  const [position, setPosition] = useState(null);
  const [allMarkers, setAllMarkers] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to access the map");
    }
  }, [user, loading]);

  // Fetch markers si connecté
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('/api/markers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setAllMarkers(data.markers);
      } catch (err) {
        console.error('Erreur markers:', err);
      }
    };
    if (token) fetchMarkers();
  }, [token]);

  if (loading) return null;

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <DirectionPanel setStart={setStart} setEnd={setEnd} start={start} end={end} />
      <MapContainer
        center={start || [35.82539, 10.63699]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Contrôles selon état de connexion */}
        {user
          ? <MapdashControls setPosition={setPosition} />  // ← connecté
          : <MapControls setPosition={setPosition} />      // ← non connecté
        }

        {position && (
          <>
            <Marker position={position} icon={myPositionIcon} />
            <Circle center={position} radius={200} pathOptions={{ fillColor: 'blue' }} />
          </>
        )}

        {/* Markers backend si connecté */}
        {user && allMarkers.map(marker => (
          <Marker
            key={marker.id}
            position={[marker.location.lat, marker.location.lng]}
            eventHandlers={{
              click: () => setSelectedMarker && setSelectedMarker({
                ...marker,
                location: [marker.location.lat, marker.location.lng],
                isSaved: true,
              })
            }}
          >
            <Popup>
              <strong>{marker.type}</strong><br />
              {marker.description}<br />
              {marker.address}<br />
              {marker.image && (
                <img src={marker.image} alt={marker.type} style={{ width: '100%', marginTop: '8px', borderRadius: '4px' }} />
              )}
            </Popup>
          </Marker>
        ))}

        {start && <Marker position={start} icon={DefaultIcon} />}
        {end && <Marker position={end} icon={DefaultIcon} />}
        {start && end && <LeafletRoutingMachine start={start} end={end} />}
      </MapContainer>
      <ToastContainer />
    </div>
  );
}

export default Map;
