import { h, Component } from "preact";
import { findDOMNode } from "preact-compat";
import GoogleMap from "google-map-react";
import { fitBounds } from "google-map-react/utils";
import supercluster from "points-cluster";
import Photo from "../photo";
import Cluster from "../cluster";

const googleOptions = { key: "AIzaSyAnJ6-RtNkoT-nOVdNHbM5ZofCBGBc6zWo" };

class PhotoMap extends Component {
  state = {};

  makeClusters = null;

  componentDidMount() {
    const { photos } = this.props;
    this.bounds = this.getPhotosBounds(photos);
    this.makeClusters = supercluster(photos, {
      minZoom: 3,
      maxZoom: 15,
      radius: 60
    });

    const { center, zoom } = this.fitBounds(this.bounds);
    this.updateClusters(center, zoom);
  }

  getPhotosBounds(photos) {
    return photos
      .slice(1)
      .reduce(
        ({ nw, se }, point) => ({
          nw: {
            lat: Math.max(nw.lat, point.lat),
            lng: Math.min(nw.lng, point.lng)
          },
          se: {
            lat: Math.min(se.lat, point.lat),
            lng: Math.max(se.lng, point.lng)
          }
        }),
        { nw: photos[0], se: photos[0] }
      );
  }

  fitBounds(bounds) {
    const size = findDOMNode(this).getBoundingClientRect();
    return fitBounds(bounds, size);
  }

  updateClusters(center, zoom) {
    const clusters = this
      .makeClusters({ center, zoom, bounds: this.bounds })
      .map(({ wx, wy, numPoints, points }) => ({
        lat: wy,
        lng: wx,
        photos: points,
        numPoints
      }));

    this.setState({ clusters, center, zoom });
  }

  onBoundsChange = ({ center, zoom }) => {
    this.updateClusters(center, zoom);
  };

  onClusterClick = cluster => {
    const bounds = this.getPhotosBounds(cluster.photos);
    const { center, zoom } = this.fitBounds(bounds);
    this.setState({ center, zoom });
  };

  render() {
    const { clusters, center, zoom } = this.state;
    if (!clusters) {
      return <div style={{ width: "100%", height: "100%" }} />;
    }
    return (
      <GoogleMap
        center={center}
        zoom={zoom}
        bootstrapURLKeys={googleOptions}
        onChange={this.onBoundsChange}
      >
        {
          clusters &&
            clusters.map(
              cluster =>
                cluster.numPoints === 1
                  ? <Photo
                    lat={cluster.lat}
                    lng={cluster.lng}
                    photo={cluster.photos[0].photo}
                  />
                  : <Cluster
                    lat={cluster.lat}
                    lng={cluster.lng}
                    cluster={cluster}
                    onClick={this.onClusterClick}
                  />
            )
        }
      </GoogleMap>
    );
  }
}

export default PhotoMap;
