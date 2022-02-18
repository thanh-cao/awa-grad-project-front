import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

const AnyReactComponent = ({ text }) => <div className="marker">{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventLocations: [],
    };
  }
  static defaultProps = {
    center: {
      lat: 59.9126,
      lng: 10.7548,
    },
    zoom: 13,
  };

  render() {
    const anyReactComponents = this.props.events.map((el) => {
      return (
        <AnyReactComponent key={el.id} lat={el.lat} lng={el.lng} text={el.name}>
          {" "}
        </AnyReactComponent>
      );
    });

    return (
      <div style={{ height: "25vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAGIPSSAJGsWmI8LPCFg5gqo4TZDRthXf8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {anyReactComponents}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
