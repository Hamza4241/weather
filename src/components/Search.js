import React, { useState, useEffect } from 'react';
import axios from "axios";

const Search = () => {

    const [location, setLocation] = useState('');
    const [days, setDays] = useState('');
    const [dayCount, setDayCount] = useState('');
    const [data, setData] = useState({});
    const [showLocation, setShowLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    // const [inputs, setInputs] = useState({});

    const options = { weekday: 'long' };

    var x = 8;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=074d357f4482b7d0427f700aca9f3194`;


    const handleChange = (event) => {
        // const name = event.target.name;
        // const value = event.target.value;
        // setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        // console.log(inputs);
    }


    const searchLocation = (event) => {
        console.log("You are here, congrats")
        if (location == ''){
            alert("Please Enter City Name");
            return;
        }
        if (days == ''){
            alert("Please Enter Number of Days");
            return;
        }
        if (days < 1 || days > 4){
            alert("Please Enter Number of Days in the range (1 to 4)");
            return;
        }


        axios.get(url).then((response) => {
        if (response.status === 200){
            setData(response.data);
            // console.log(response.data);
            setShowLocation(location);
            setDayCount(days);

            const myCode = response.data.list[0].weather[0].icon;
            // const myTemp = Math.trunc( (response.data.list[0].main.temp-32)*5/9 );
            // console.log("This is my code: " + myCode);
            // console.log("This is my temp: " + myTemp);
            const fetchImage = async (myCode) => {
            try {
                const imageUrl = `https://openweathermap.org/img/wn/${myCode}@2x.png`;
                setImageUrl(imageUrl);
                // console.log("This is your URL: " + imageUrl);
            } catch (error) {
                console.log('Error fetching image:', error);
            }
            };

            // dispatch(increment({name: location, code: myCode, temp: myTemp}));
            // setImageCode(myCode);
            fetchImage(myCode);

        }
        }).catch((error) => {
            alert("Please Enter correct city name");
        })
        setLocation('');
        setDays('');
    }



  return (

    <div className='weather max-w-full my-6'>

        <div className='user-input flex flex-row justify-center'>
            <div>
                <label>Enter City Name:
                    <input 
                        className='bg-slate-800 text-sm mx-4 py-2 px-3 rounded-2xl'
                        type="text" 
                        name="cityname" 
                        placeholder="City Name"
                        required
                        onChange={event => setLocation(event.target.value)}
                        value={location} 
                    />
                </label>
            </div>
            <div>
                <label>Enter Number of Days for Forecast:
                    <input 
                        className='bg-slate-800 text-sm mx-4 py-2 px-3 rounded-2xl'
                        type="number" 
                        name="days" 
                        placeholder="Range (1 to 4)"
                        value={days} 
                        required
                        onChange={event => setDays(event.target.value)}
                    />
                </label>
            </div>
        </div>
        <div className='search-button flex justify-center mt-6'>
            <button className='button rounded-2xl text-xl font-semibold bg-blue-700 px-7 py-1 hover:bg-blue-800' 
                onClick={() => searchLocation()}>
                Search
            </button>
        </div>
        {data.list ?
        <div className='table mt-6'>
            <hr></hr>
            <table className="forecast-table border-collapse border border-slate-500 mt-8">
                <thead>
                <tr className='bg-slate-600'>
                    <th className='border border-slate-600 px-10 py-2'>Day</th>
                    <th className='border border-slate-600 px-3'>City Name</th>
                    <th className='border border-slate-600 px-3'>Temperature</th>
                    <th className='border border-slate-600 px-3'>Real Feel</th>
                    <th className='border border-slate-600 px-3'>Wind Speed</th>
                    <th className='border border-slate-600 px-3'>Chance of Rain</th>
                    <th className='border border-slate-600 px-3'>Humidity</th>
                    <th className='border border-slate-600 px-3'>Weather Description</th>
                    <th className='border border-slate-600 px-3'>Weather Icon</th>
                    <th className='border border-slate-600 px-3'>Visibility</th>
                </tr>
                </thead>
                <tbody>
                    
                    <tr className='text-center'>
                        <td className='border border-slate-700'>{new Date(data.list[8].dt_txt).toLocaleString('en-US', options)}</td>
                        <td className='border border-slate-700'>{showLocation}</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[8].main.temp-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[8].main.feels_like-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{(data.list[8].wind.speed*1.60934).toFixed(2)} km/h</td>
                        <td className='border border-slate-700'>{(data.list[8].pop*100).toFixed(0)}%</td>
                        <td className='border border-slate-700'>{data.list[8].main.humidity}%</td>
                        <td className='border border-slate-700'>{data.list[8].weather[0].description.charAt(0).toUpperCase() + data.list[8].weather[0].description.slice(1)}</td>
                        <td className='border border-slate-700'>{<img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`} alt="Weather Icon" />}</td>
                        <td className='border border-slate-700'>{data.list[8].visibility} m</td>
                    </tr>

                {dayCount > 1 ?
                    <tr className='text-center bg-slate-800'>
                        <td className='border border-slate-700'>{new Date(data.list[16].dt_txt).toLocaleString('en-US', options)}</td>
                        <td className='border border-slate-700'>{showLocation}</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[16].main.temp-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[16].main.feels_like-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{(data.list[16].wind.speed*1.60934).toFixed(2)} km/h</td>
                        <td className='border border-slate-700'>{(data.list[16].pop*100).toFixed(0)}%</td>
                        <td className='border border-slate-700'>{data.list[16].main.humidity}%</td>
                        <td className='border border-slate-700'>{data.list[16].weather[0].description.charAt(0).toUpperCase() + data.list[16].weather[0].description.slice(1)}</td>
                        <td className='border border-slate-700'>{<img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`} alt="Weather Icon" />}</td>
                        <td className='border border-slate-700'>{data.list[16].visibility} m</td>
                    </tr>
                : null}

                {dayCount > 2 ?
                    <tr className='text-center'>
                        <td className='border border-slate-700'>{new Date(data.list[24].dt_txt).toLocaleString('en-US', options)}</td>
                        <td className='border border-slate-700'>{showLocation}</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[24].main.temp-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[24].main.feels_like-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{(data.list[24].wind.speed*1.60934).toFixed(2)} km/h</td>
                        <td className='border border-slate-700'>{(data.list[24].pop*100).toFixed(0)}%</td>
                        <td className='border border-slate-700'>{data.list[24].main.humidity}%</td>
                        <td className='border border-slate-700'>{data.list[24].weather[0].description.charAt(0).toUpperCase() + data.list[24].weather[0].description.slice(1)}</td>
                        <td className='border border-slate-700'>{<img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`} alt="Weather Icon" />}</td>
                        <td className='border border-slate-700'>{data.list[24].visibility} m</td>
                    </tr>
                : null}

                {dayCount > 3 ?
                    <tr className='text-center bg-slate-800'>
                        <td className='border border-slate-700'>{new Date(data.list[32].dt_txt).toLocaleString('en-US', options)}</td>
                        <td className='border border-slate-700'>{showLocation}</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[32].main.temp-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{Math.trunc( (data.list[32].main.feels_like-32)*5/9 )}°</td>
                        <td className='border border-slate-700'>{(data.list[32].wind.speed*1.60934).toFixed(2)} km/h</td>
                        <td className='border border-slate-700'>{(data.list[32].pop*100).toFixed(0)}%</td>
                        <td className='border border-slate-700'>{data.list[32].main.humidity}%</td>
                        <td className='border border-slate-700'>{data.list[32].weather[0].description.charAt(0).toUpperCase() + data.list[32].weather[0].description.slice(1)}</td>
                        <td className='border border-slate-700'>{<img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`} alt="Weather Icon" />}</td>
                        <td className='border border-slate-700'>{data.list[32].visibility} m</td>
                    </tr>
                : null}

                </tbody>
            </table>
        </div>
        : null}

       

    </div>

  )
}

export default Search




    {/* .slice(0, 5) */}


