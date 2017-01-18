import { h, Component } from "preact";
import { findDOMNode } from "preact-compat";
import jsonp from "jsonp";
import GoogleMap from "google-map-react";
import { fitBounds } from "google-map-react/utils";
import supercluster from "points-cluster";
import Photo from "../photo";
import Cluster from "../cluster";
import api from "../../api";

const googleOptions = { key: "AIzaSyAnJ6-RtNkoT-nOVdNHbM5ZofCBGBc6zWo" };

class PhotoMap extends Component {
  state = {};

  componentDidMount() {
    jsonp(api.media(this.props.token), (err, resp) => {
      if (resp) {
        this.onPhotosLoad(resp.data);
      }
    });
  }

  onPhotosLoad(photos) {
    const size = findDOMNode(this).getBoundingClientRect();
    const coordinates = photos.map(
      photo =>
        ({ photo, lat: photo.location.latitude, lng: photo.location.longitude })
    );
    const bounds = coordinates
      .slice(1)
      .reduce(
        ({ nw, se }, point) =>
          ({
            nw: {
              lat: Math.max(nw.lat, point.lat),
              lng: Math.min(nw.lng, point.lng)
            },
            se: {
              lat: Math.min(se.lat, point.lat),
              lng: Math.max(se.lng, point.lng)
            }
          }),
        { nw: coordinates[0], se: coordinates[0] }
      );
    const { center, zoom } = fitBounds(bounds, size);
    const clusters = supercluster(coordinates, {
      minZoom: 3,
      maxZoom: 15,
      radius: 60
    })({ center, zoom, bounds }).map(
      ({ wx, wy, numPoints, points }) =>
        ({
          lat: wy,
          lng: wx,
          photos: points.map(point => point.photo),
          numPoints
        })
    );

    this.setState({ photos, clusters, center, zoom });
  }

  render() {
    const { clusters, center, zoom } = this.state;
    if (!clusters) {
      return <div style={{ width: "100%", height: "100%" }}></div>;
    }
    return (
      <GoogleMap center={center} zoom={zoom} bootstrapURLKeys={googleOptions}>
        {
          clusters &&
            clusters.map(
              cluster =>
                cluster.numPoints === 1
                  ? <Photo lat={cluster.lat} lng={cluster.lng} photo={
                    cluster.photos[0]
                  } />
                  : <Cluster lat={cluster.lat} lng={cluster.lng} cluster={
                    cluster
                  } />
            )
        }
      </GoogleMap>
    );
  }
}

export default PhotoMap;
