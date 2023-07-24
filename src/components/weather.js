import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHalf, faDroplet, faWind, faSun, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

const Weather = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [showLocation, setShowLocation] = useState('');
    const [imageCode, setImageCode] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const options = { weekday: 'long' };

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=074d357f4482b7d0427f700aca9f3194`;
    // const coodinateURL = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=074d357f4482b7d0427f700aca9f3194`;

    // const imageURL = `https://openweathermap.org/img/wn/${imageCode}d@2x.png`
    // const imageURL = "https://openweathermap.org/img/wn/13n@2x.png";

    function handleLocationClick() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
    }

    function success(position) {
      // console.log("Latitude: " + position.coords.latitude + " Longtitude: " + position.coords.longitude)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // setLocation({ latitude, longitude });
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // console.log("This is your location: " + location.latitude);
  
      // Make API call to OpenWeatherMap
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=074d357f4482b7d0427f700aca9f3194`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setShowLocation(data.city.name);

          const code = data.list[0].weather[0].icon;
          const fetchImage = async (code) => {
            try {
              const imageUrl = `https://openweathermap.org/img/wn/${code}@2x.png`;
              setImageUrl(imageUrl);
              // console.log("This is your URL: " + imageUrl);
            } catch (error) {
              console.log('Error Fetching Image:', error);
            }
          };

          setImageCode(code);
          fetchImage(code);
          // console.log("This is your data" + data);
        })
        .catch(error => console.log(error));
    }

    function error() {
      alert("Unable to Retrieve your Location, Please try Searching by City Name Instead");
    }
  



    const searchLocation = (event) => {
        if (event.key === 'Enter') {
          axios.get(url).then((response) => {
            if (response.status === 200){
              setData(response.data);
              // console.log(response.data);
              setShowLocation(location);
    
              const code = response.data.list[0].weather[0].icon;
              const fetchImage = async (code) => {
                try {
                  const imageUrl = `https://openweathermap.org/img/wn/${code}@2x.png`;
                  setImageUrl(imageUrl);
                  // console.log("This is your URL: " + imageUrl);
                } catch (error) {
                  console.log('Error fetching image:', error);
                }
              };
    
              setImageCode(code);
              fetchImage(code);
    
            }
          }).catch((error) => {
              alert("Please Enter Correct City Name");
          })
          setLocation('');
        }
      }


  return (
    <>
      {data.list ? (
        <>

        <div className='weather max-w-full mt-6 flex flex-col lg:flex-row'>

        <div className='todays-weather basis-3/5 mr-3'>

          <div className="search">
              <input 
                  className='bg-slate-800 w-full text-sm py-2 px-3 rounded-2xl'
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                  onKeyDown={searchLocation}
                  placeholder="Search for cities"
                  type="text"/>
          </div>
        
          <div className='main-info py-9 px-12 flex flex-row justify-between h-60'>

            <div className='right-info relative'>
              <div className="loaction text-4xl font-bold pb-2">
                  <p>{showLocation}</p>
              </div>
              
              <div className="rain text-slate-400 text-sm">
                  {data.list ? <p>Chance of rain: {(data.list[0].pop*100).toFixed(0)}%</p> : null}
              </div>

              {/* <div className="rain text-sm">
                  {data.list ? <p>Time: {data.list[0].dt_txt}</p> : null}
              </div> */}
            
              <div className="temp text-5xl font-extrabold absolute bottom-0">
                  {data.list ? <p>{Math.trunc( (data.list[0].main.temp-32)*5/9 )}°</p> : null}
              </div>
            </div>


          
            <div className="left-info weather-icon">
                {/* {data.list ? <img src={imageWeather} alt="icons" /> : null} */}
                {imageUrl ? ( <img className='h-5/6' src={imageUrl} alt="Weather Icon" /> ) : ( null )}
                {/* <p>Image Code: {imageCode}</p> */}
            </div>

          </div>


          <div className='todays-forecast bg-slate-700 rounded-2xl p-5'>
            <p className='heading-forecast text-sm text-slate-400 font-bold'>TODAY'S FORECAST</p>
            <div className='3hr-timestamp flex flex-row justify-between pt-3 pl-5 pr-5 pb-2'>
              
              <div className='+3hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[1].dt_txt.substr(11,5)}</p> : null}
                </div>
                
                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>
                
                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[1].main.temp-32)*5/9 )}°</p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>
              
              <div className='vertival-line mx-2 w-px h-25 bg-slate-500'></div>
              

              <div className='+6hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[2].dt_txt.substr(11,5)}</p> : null}
                </div>
                
                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>
                
                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[2].main.temp-32)*5/9 )}°</p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

              <div className='vertival-line mx-2 w-px h-25 bg-slate-500'></div>

              <div className='+9hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[3].dt_txt.substr(11,5)}</p> : null}
                </div>

                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>

                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[3].main.temp-32)*5/9 )}°</p> : null}
                </div>
              </div>

              <div className='vertival-line mx-2 w-px h-25 bg-slate-500'></div>

              <div className='+12hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[4].dt_txt.substr(11,5)}</p> : null}
                </div>

                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>

                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[4].main.temp-32)*5/9 )}°</p> : null}
                </div>
              </div>

              <div className='vertival-line mx-2 w-px h-25 bg-slate-500'></div>

              <div className='+15hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[5].dt_txt.substr(11,5)}</p> : null}
                </div>

                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>

                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[5].main.temp-32)*5/9 )}°</p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

              <div className='vertival-line mx-2 w-px h-25 bg-slate-500'></div>

              <div className='+18hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[6].dt_txt.substr(11,5)}</p> : null}
                </div>

                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>

                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[6].main.temp-32)*5/9 )}°</p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

            </div>

          </div>



          <div className='air-condition bg-slate-700 rounded-2xl p-5 mt-4'>
            <div className='air-condition-header flex flex-row justify-between pr-3'>
              <p className='heading-air-condition text-sm text-slate-400 font-bold'>AIR CONDITIONS</p>
              <button className='button rounded-2xl text-xs bg-blue-600 px-3 py-1 hover:bg-blue-700'>See more</button>
            </div>
            
            <div className='air-condition-data flex flex-row pt-3 px-1 pb-2'>

              <div className='dataset-1 basis-1/2 text-slate-400'>

                <div className='feels-like'>
                  <FontAwesomeIcon className='temp-icon pr-3' icon={faTemperatureHalf} />
                  Real Feel
                  {data.list ? <p className='text-2xl font-bold text-white pl-6'>{Math.trunc( (data.list[0].main.feels_like-32)*5/9 )}°</p> : null}
                </div>
                <div className='chance-of-rain pt-4'>
                  <FontAwesomeIcon className='rain-icon pr-3' icon={faCloudShowersHeavy} />
                  Chance of rain
                  {data.list ? <p className='text-2xl font-bold text-white pl-7'> {(data.list[0].pop*100).toFixed(0)}%</p> : null}
                </div>

              </div>

              <div className='dataset-2 basis-1/2 text-slate-400'>

                <div className='wind'>
                  <FontAwesomeIcon className='wind-icon pr-3' icon={faWind} />
                  Wind
                  {data.list ? <p className='text-2xl font-bold text-white pl-7'> {(data.list[0].wind.speed*1.60934).toFixed(2)} km/h </p> : null}
                  {/* 1.609 */}
                </div>
                <div className='uv-index pt-4'>
                  <FontAwesomeIcon className='drop-icon pr-3' icon={faDroplet} />
                  Humidity
                  {data.list ? <p className='text-2xl font-bold text-white pl-6'> {data.list[0].main.humidity}% </p> : null}
                </div>

              </div>
 
            </div>

          </div>

        </div>


        <div className='basis-2/5 ml-3 mr-10'>


          <div className='btn flex mx-auto'>
            <button onClick={handleLocationClick} className='button rounded-2xl text-base font-medium bg-blue-600 px-3 py-1 hover:bg-blue-700 m-auto'>
              Get Your Weather
            </button>
          </div>

          <div className='next-days-weather mt-12 bg-slate-700 rounded-2xl p-8 pb-2'>  
            <p className='heading-air-condition text-sm text-slate-400 font-bold'>5-DAY FORECAST</p>

            <div className='6-day-forecast flex flex-col justify-between pt-3 pb-2'>                
                <div className='today flex flex-row justify-between items-center'>
                  <div className='day text-base text-slate-400'>
                    {data.list ? <p>Today</p> : null}
                  </div>
                  <div className='image flex items-center'>
                    {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                    {data.list ? <p>{data.list[0].weather[0].description.charAt(0).toUpperCase() + data.list[0].weather[0].description.slice(1)}</p> : null}
                  </div>
                  <div className='temp'>
                    {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[0].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[0].main.temp_min-32)*5/9 )}</p></p> : null}
                  </div>
                </div>

                <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>

                <div className='+1day flex flex-row justify-between items-center'>
                  <div className='day text-base text-slate-400'>
                    {data.list ? <p>{(new Date(data.list[8].dt_txt).toLocaleString('en-US', options)).substr(0, 3)}</p> : null}
                  </div>
                  <div className='image flex items-center'>
                    {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                    {data.list ? <p>{data.list[8].weather[0].description.charAt(0).toUpperCase() + data.list[8].weather[0].description.slice(1)}</p> : null}
                  </div>
                  <div className='temp'>
                    {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[8].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[8].main.temp_min-32)*5/9 )}</p></p> : null}
                  </div>
                </div>

                <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>

                <div className='+2day flex flex-row justify-between items-center'>
                  <div className='day text-base text-slate-400'>
                    {data.list ? <p>{(new Date(data.list[16].dt_txt).toLocaleString('en-US', options)).substr(0, 3)}</p> : null}
                  </div>         
                  <div className='image flex items-center'>
                    {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                    {data.list ? <p>{data.list[16].weather[0].description.charAt(0).toUpperCase() + data.list[16].weather[0].description.slice(1)}</p> : null}
                  </div>
                  <div className='temp'>
                    {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[16].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[16].main.temp_min-32)*5/9 )}</p></p> : null}
                  </div>
                </div>

                <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>

                <div className='+3day flex flex-row justify-between items-center'>

                  <div className='day text-base text-slate-400'>
                    {data.list ? <p>{(new Date(data.list[24].dt_txt).toLocaleString('en-US', options)).substr(0, 3)}</p> : null}
                  </div>
                  
                  <div className='image flex items-center'>
                    {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                    {data.list ? <p>{data.list[24].weather[0].description.charAt(0).toUpperCase() + data.list[24].weather[0].description.slice(1)}</p> : null}
                  </div>
                  
                  <div className='temp'>
                    {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[24].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[24].main.temp_min-32)*5/9 )}</p></p> : null}
                  </div>
                  {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
                </div>

                <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>





                <div className='+4day flex flex-row justify-between items-center'>

                  <div className='day text-base text-slate-400'>
                    {data.list ? <p>{(new Date(data.list[32].dt_txt).toLocaleString('en-US', options)).substr(0, 3)}</p> : null}
                  </div>
                  
                  <div className='image flex items-center'>
                    {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                    {data.list ? <p>{data.list[32].weather[0].description.charAt(0).toUpperCase() + data.list[32].weather[0].description.slice(1)}</p> : null}
                  </div>
                  
                  <div className='temp'>
                    {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[32].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[32].main.temp_min-32)*5/9 )}</p></p> : null}
                  </div>
                  {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
                </div>
              </div>
          </div>
        </div>


        </div>
        </>
      ) :
      //  Section start which displays info only when nothing is fetched from API
       <>
       <div className='weather max-w-full mt-6'>
        <div className='user-controls flex flex-row'>
            <div className='todays-weather basis-3/5 mr-3'>
              <div className="search">
                  <input 
                      className='bg-slate-800 w-full text-sm py-2 px-3 rounded-2xl'
                      value={location}
                      onChange={event => setLocation(event.target.value)}
                      onKeyDown={searchLocation}
                      placeholder="Search for cities"
                      type="text"/>
              </div>
            </div>

              <div className='basis-2/5 ml-3 mr-10'>

              <div className='btn flex mx-auto'>
                <button onClick={handleLocationClick} className='button rounded-2xl text-base font-medium bg-blue-600 px-3 py-1 hover:bg-blue-700 m-auto'>
                  Get Your Weather
                </button>
              </div>

            </div>
          </div>

          <div className='todays-forecast basis-full bg-slate-700 rounded-2xl p-5 mr-8 mt-10 h-44 flex justify-center items-center'>
              <p className='heading-forecast text-xl text-slate-300 font-bold'>SEARCH FOR A CITY OR GET YOUR AREA'S WEATHER</p>
          </div>
        </div>

       </> 
      //  Section ends which displays info only when nothing is fetched from API
      }

    
    </>
    
  )
}

export default Weather;

