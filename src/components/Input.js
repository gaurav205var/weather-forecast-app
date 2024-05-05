import React, { useState } from 'react'
import { MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Input = ({ setQuery, setUnits, setMapData }) => {
    const [city, setCity] = useState("");
    const [cities, setCities] = useState(JSON.parse(localStorage.getItem("cities")) || []);


    const handleUnitsClick = (e) => {
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);

        const isCelsius = currentUnit === "C";
        button.innerText = isCelsius ? "°F" : "°C";
        setUnits(isCelsius ? "metric" : "imperial");
    };


    // here i already implemented the feauter of map visualition by city name but due to not having billing account or paid api key its not working...

    
    // const handleSearchClick = async () => {
    //     if (city.trim() !== '') {
    //         setQuery({ q: city });
    //         try {
    //             const response = await fetch(
    //                 `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //                     city
    //                 )}&key=AIzaSyCGmc-ceyM9btbEXCcHiwqodJLRYCsXkz0`
    //             );
    //             const data = await response.json();
    //             console.log("hhh", data);
    //             if (data.results && data.results.length > 0) {
    //                 const { lat, lng } = data.results[0].geometry.location;
    //                 setQuery({
    //                     lat,
    //                     lon: lng,
    //                 });
    //                 setMapData({ lat, lng });
    //             } else {
    //                 toast.error('City not found.');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching city coordinates:', error);
    //             toast.error('Error fetching city coordinates.');
    //         }
    //     }
    // };

    const handleSearchClick = () => {
        if (city.trim() !== '') {
            setQuery({ q: city });

            // Check if the city already exists in the array
            if (cities.includes(city)) {
                return;
            }
            const updatedCities = [...cities, city]; // Add new city to the array
            setCities(updatedCities);
            localStorage.setItem('cities', JSON.stringify(updatedCities));
            setCity("")
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info("Fetching users location.");
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("loactionaaa", position)
                toast.success("Location fetched!");
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({
                    lat,
                    lon,
                });
                setMapData({ lat, lon });
            });
        }
    };

    return (
        <MDBRow className='d-flex justify-content-center justify-content-md-between align-items-center'>
            <MDBCol xs={12} sm={12} md={5} lg={3} className='search d-flex align-items-center justify-content-center justify-content-lg-start' >
                <input className='me-1' type='text' placeholder='search for city...'
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    onKeyPress={handleKeyPress} />

                <MDBIcon onClick={handleSearchClick} className='p-2' size='lg' fas icon="search" />
            </MDBCol>
            <MDBCol size={9} md={4} lg={3} className='current-location d-flex justify-content-center align-items-center my-3 my-md-0 mx-2 mx-sm-0 mx-md-0' onClick={handleLocationClick}>
                <MDBIcon className='p-2' size='lg' fas icon="map-marker-alt" />
                <h5>Current Location</h5>
            </MDBCol>
            <MDBCol size={2} md={1} lg={2} className='unit-btn d-flex justify-content-center justify-content-sm-end align-items-center'>
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </MDBCol>
        </MDBRow>
    )
}

export default Input