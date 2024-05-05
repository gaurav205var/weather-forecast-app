import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { iconUrlFromCode } from "../components/Service";

const TodayWeather = ({
    weather: { name, country, details,
        icon,
        temp,
        speed,
        humidity,
        feels_like, }, units }) => {
    return (
        <>
            <MDBRow className='today-weather d-flex justify-content-around align-items-center p-2 mt-5 text-white'>
                <MDBCol size={12} md={3} className='location d-flex flex-column align-items-center mb-4 mb-md-0'>
                    <h3>{`${name}, ${country}`}</h3>
                    <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
                    <h3>{details}</h3>
                </MDBCol>
                <MDBCol size={8} md={3} className='location d-flex flex-column align-items-center'>
                    <div>
                        <i className="fas fa-temperature-full mx-1"></i>
                        Real fell: <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div>
                        <i className="fas fa-droplet mx-1"></i> Humidity: <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div>
                        <i className="fas fa-wind mx-1"></i> Wind Speed: <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
                    </div>

                </MDBCol>
                <MDBCol size={4} md={3} className='location d-flex flex-column align-items-center'>
                    <h1>{`${temp.toFixed()}° ${units === "metric" ? "C" : "F"
                        }`}</h1>
                    <p className="text-5xl"></p>
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default TodayWeather