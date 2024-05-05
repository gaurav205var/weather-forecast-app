import React from 'react'
import "../styles/ForecastWeather.css";
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { iconUrlFromCode } from '../components/Service';

const ForecastWeather = ({ title, items, units }) => {
    console.log("hhhhhh", items)
    return (
        <>
            <MDBRow className='d-flex justify-content-evenly text-white'>
                <h3 className='text-center' style={{ color: "blanchedalmond" }}>{title}</h3>
                <hr className="my-2" />

                {items.map((item, index) => (
                    <MDBCol key={index} size={5} sm={4} md={3} lg={2} className='card mb-3 mx-2 mx-lg-0'>
                        <div
                            className="flex flex-col items-center justify-center"
                        >
                            <p className="font-light text-sm">{item.title}</p>
                            <div className='d-flex'>
                                <p className="font-medium">{`${item.temp.toFixed()}°${units === "metric" ? "C" : "F"
                                    }`}</p>
                                <img
                                    src={iconUrlFromCode(item.icon)}
                                    className=""
                                    alt="weather-icon"
                                    width={80}
                                    height={80}
                                />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <span className='mx-1'>
                                    <i className="fas fa-arrow-up-long"></i> max:
                                </span>
                                <p>{`${item.temp_max.toFixed()}°${units === "metric" ? "C" : "F"
                                    }`}</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <span className='mx-1'>
                                    <i className="fas fa-arrow-down-long"></i> min:
                                </span>
                                <p>{`${item.temp_min.toFixed()}°${units === "metric" ? "C" : "F"
                                    }`}</p>
                            </div>

                        </div>
                    </MDBCol>
                ))}

            </MDBRow>
        </>
    )
}

export default ForecastWeather