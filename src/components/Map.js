import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div className="marker">{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventLocations: [],
    };
  }

  // static defaultProps = {
  //   center: {
  //     lat: parseFloat(this.props.adress.lat),
  //     lng: parseFloat(this.props.adress.lng),
  //   },
  //   zoom: 13,
  // };

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
          center={this.props.adress}
          zoom={13}
        >
          {anyReactComponents}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
