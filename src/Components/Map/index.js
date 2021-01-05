import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class Map extends Component {
  constructor(props) {
    super(props);

    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  }

  render() {
    return (
      <div>
        <MapContainer
          style={{height: "100vh"}}
          center={[48.8534, 2.3488]}
          zoom={14}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[48.8534, 2.3488]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default Map;
