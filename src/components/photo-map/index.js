import {h, Component} from 'preact';
import {findDOMNode} from 'preact-compat';
import jsonp from 'jsonp';
import GoogleMap from 'google-map-react';
import {fitBounds} from 'google-map-react/utils';
import Photo from '../photo';
import api from '../../api';

class PhotoMap extends Component {
    state = {};

    componentDidMount() {
        jsonp(
            api.media(this.props.token),
            (err, resp) => {
                if(resp) {
                    this.onPhotosLoad(resp.data);
                }
            }
        )
    }

    onPhotosLoad(photos) {
        const size = findDOMNode(this).getBoundingClientRect();
        const coordinates = photos.map(photo => ({
            lat: photo.location.latitude,
            lng: photo.location.longitude
        }));
        const bounds = coordinates.slice(1).reduce(
            ({ne, sw}, point) => ({
                ne: {
                    lat: Math.max(ne.lat, point.lat),
                    lng: Math.max(ne.lng, point.lng)
                },
                sw: {
                    lat: Math.min(sw.lat, point.lat),
                    lng: Math.min(sw.lng, point.lng),
                }
            }),
            {
                ne: coordinates[0],
                sw: coordinates[0]
            }
        )
        const {center, zoom} = fitBounds(bounds, size);
        this.setState({photos, center, zoom});
    }

    render() {
        const {photos, center, zoom} = this.state;
        if(!photos) {
            return <div style={{width: '100%', height: '100%'}}></div>
        }
        return (<GoogleMap center={center} zoom={zoom}>
            {photos && photos.map(photo => <Photo lat={photo.location.latitude} lng={photo.location.longitude} photo={photo} />)}
        </GoogleMap>)
    }
}

export default PhotoMap;
