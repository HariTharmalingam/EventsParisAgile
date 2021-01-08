import React, { Component } from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReactHtmlParser from "react-html-parser";
import Marker from "react-leaflet-enhanced-marker";
import iconMap from "../../assets/pin_map.png";
import { setCurrentEvent } from "../../Actions/SearchEngine";

class Map extends Component {
  constructor(props) {
    super(props);
    this.marker = React.createRef();
  }
  handleClick(item) {
    this.props.setCurrentEvent(item, true);
  }

  componentDidUpdate() {
    setTimeout(() => {
      const markers = document.querySelectorAll(".leaflet-marker-icon");
      markers.forEach(element => {
        element.style.transition = "all 0.3s";
        element.style.margin = 0;
      });
    }, 50);
  }
  render() {
    const { ResultsReducer } = this.props;
    return (
      <div>
        <MapContainer
          style={{ height: "100vh" }}
          center={[48.8534, 2.3488]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {ResultsReducer.isEvent && (
            <Marker
              icon={
                <img
                  style={{
                    width: 30,
                    padding: 0,
                    margin: 0,
                    alignSelf: "center"
                  }}
                  src={iconMap}
                  alt="icon_map"
                />
              }
              position={
                ResultsReducer.currentEvent.geometry
                  ? [
                      ResultsReducer.currentEvent.geometry.coordinates[1],
                      ResultsReducer.currentEvent.geometry.coordinates[0]
                    ]
                  : [0, 0]
              }
            >
              <Popup>
                {ResultsReducer.currentEvent.fields.title}
                <br />
                {ResultsReducer.currentEvent.fields.address_name}
                <br />
                {ReactHtmlParser(
                  ResultsReducer.currentEvent.fields.date_description
                )}
              </Popup>
            </Marker>
          )}

          {ResultsReducer.isLoaded && !ResultsReducer.isEvent
            ? ResultsReducer.results.map((element, i) => (
                <Marker
                  icon={
                    element.isActive === true ? (
                      <img
                        style={{
                          width: 30,
                          padding: 0,
                          margin: 0,
                          alignSelf: "center"
                        }}
                        src={iconMap}
                        alt="icon_map"
                      />
                    ) : (
                      <img
                        style={{
                          height: 20,
                          padding: 0,
                          margin: 0,
                          alignSelf: "center"
                        }}
                        src={iconMap}
                        alt="icon_map"
                      />
                    )
                  }
                  key={i}
                  position={
                    element.geometry
                      ? [
                          element.geometry.coordinates[1],
                          element.geometry.coordinates[0]
                        ]
                      : [0, 0]
                  }
                >
                  <Popup>
                    <div onClick={() => this.handleClick(element)}>
                      {element.fields.title}
                      <br />
                      {element.fields.address_name}
                      <br />
                      {ReactHtmlParser(element.fields.date_description)}
                    </div>
                  </Popup>
                </Marker>
              ))
            : null}
        </MapContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ResultsReducer: state.ResultsReducer
});

export default connect(mapStateToProps, { setCurrentEvent })(Map);
