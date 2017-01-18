import {h, Component} from 'preact';
import PhotoMap from '../photo-map';
import api from '../../api';

const clientId = 'e6e4168f12aa4bebbe95c6d10802675e';
const redirectUri = `${location.href}callback.html`;

export default class App extends Component {
    state = {};

    onSignClick = () => {
        const newWindow = window.open(api.auth(clientId, redirectUri));
        newWindow.addEventListener('unload', () => {
            setTimeout(() => location.reload());
        });
    };

    componentDidMount() {
        this.setState({
            accessToken: localStorage.getItem('instagram-token')
        });
    }

    render() {
        const {accessToken} = this.state;
        if(!accessToken) {
            return <button onClick={this.onSignClick}>Sign in to Instagram</button>;
        }
        return (<PhotoMap token={accessToken} />);
    }
}
