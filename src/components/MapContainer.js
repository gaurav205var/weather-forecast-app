import { GoogleMap, Marker, LoadScript, } from '@react-google-maps/api';
import { MDBRow } from 'mdb-react-ui-kit';


const MapContainer = ({ lat, lng }) => {
    const mapStyles = {
        height: '290px',
        width: '100%',
    };

    const defaultCenter = {
        lat: lat || 0,
        lng: lng || 0,
    };

    return (
        <MDBRow className='mb-2 mb-lg-0'>
            <LoadScript googleMapsApiKey="AIzaSyCGmc-ceyM9btbEXCcHiwqodJLRYCsXkz0">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={15}
                    center={defaultCenter}
                >
                    <Marker position={defaultCenter} />
                </GoogleMap>
            </LoadScript>
        </MDBRow>
    );
};

export default MapContainer;