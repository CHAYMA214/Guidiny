import React, { useState, useEffect } from "react";
import { useAuth } from "../user.js/auth";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../css/map.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapControls from "../tools/mapcontrollers";
import LeafletRoutingMachine from "../tools/wrapper";
import DirectionPanel from "../tools/DirectionPanelhome";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map() {
  const { user, loading } = useAuth(); // ← ajoute loading
  const [position, setPosition] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    if (!loading && !user) { // ← attend que loading soit false
      toast.error("Please login to access the map");
    }
  }, [user, loading]);

  if (loading) return null; // ← ne rend rien pendant le chargement

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <DirectionPanel setStart={setStart} setEnd={setEnd} start={start} end={end} />
      <MapContainer
        center={start || [35.82539, 10.63699]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapControls setPosition={setPosition} />
        {position && (
          <>
            <Marker position={position} />
            <Circle center={position} radius={200} pathOptions={{ fillColor: "blue" }} />
          </>
        )}
        {start && <Marker position={start} icon={DefaultIcon} />}
        {end && <Marker position={end} icon={DefaultIcon} />}
        {start && end && <LeafletRoutingMachine start={start} end={end} />}
      </MapContainer>
      <ToastContainer />
    </div>
  );
}

export default Map;
