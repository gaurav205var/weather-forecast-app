import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import hotBg from "../images/beautiful-landscape-cityscape-seoul-city.jpg";
import coldBg from "../images/ice-cream-2817112_1280.jpg";
import React, { useEffect, useState } from 'react'
import '../styles/Weather.css';
import Recent from './Recent'
import ForecastWeather from './ForecastWeather';
import getFormattedWeatherData from "../components/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from './Input';
import TodayWeather from './TodayWeather';
import MapContainer from "./MapContainer";


const Weather = () => {

    const [query, setQuery] = useState({ q: "London" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
    const [bg, setBg] = useState(hotBg);
    const [mapData, setMapData] = useState({ lat: 51.5072, lon: 0.1276 });


    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? query.q : "current location.";

            toast.info("Fetching weather for " + message);

            const data = await getFormattedWeatherData({ ...query, units });
            if (data) {
                toast.success(
                    `Successfully fetched weather for ${data.name}, ${data.country}.`
                );

                setWeather(data);

                // dynamic bg based on temperature and units
                let threshold;
                if (units === "metric") {
                    threshold = data.temp <= 20 ? coldBg : hotBg;
                } else {
                    // For imperial units (Fahrenheit), adjust threshold accordingly
                    threshold = data.temp <= 68 ? coldBg : hotBg;
                }
                setBg(threshold);
            }

        };

        fetchWeather();
    }, [query, units]);



    return (
        <MDBContainer fluid className='main-content' style={{ backgroundImage: `url(${bg})` }}>
            <MDBRow className='d-flex justify-content-around p-4'>
                <MDBCol xs={12} sm={12} md={12} lg={3} className=''>
                    <Recent setQuery={setQuery} />
                    <div className="mt-1">
                        <h3 className="text-center text-white">Location Visualization</h3>
                        <MapContainer lat={mapData.lat} lng={mapData.lon} />
                    </div>

                </MDBCol>
                <MDBCol xs={12} sm={12} md={12} lg={9}>
                    <div className='weather-content p-3'>
                        <Input setQuery={setQuery} setUnits={setUnits} setMapData={setMapData} />
                        {weather && (
                            <div>
                                <TodayWeather units={units} weather={weather} />
                                <ForecastWeather units={units} title="5-Day Forecast" items={weather.daily} />
                            </div>
                        )}

                    </div>
                </MDBCol>
            </MDBRow>
            <ToastContainer className="p-3 p-md-0 mb-2 mb-md-0" autoClose={2000} theme="colored" newestOnTop={true} />
        </MDBContainer>
    )
}

export default Weather