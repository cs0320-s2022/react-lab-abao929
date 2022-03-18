import TextBox from './TextBox';
import { useState } from 'react';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import axios from 'axios';

function Horoscope() {    
    interface MatchesRequestData {
        sun: string;
        moon: string;
        rising: string;
    }

    interface Matches {
        [key: string]: string[];
    }

    const defaultMatches : Matches = {
        'horoscope': ['test', 'does', 'this', 'work', 'fodder']
    }

    const [sun, setSun] = useState('Taurus');
    const [moon, setMoon] = useState('Gemini');
    const [rising, setRising] = useState('Cancer');
    const [horoscope, setHoroscope] = useState(defaultMatches['horoscope']);

    //TODO: Fill in the ? with appropriate names/values for a horoscope.
    //HINT: Look at the HoroscopeHandler's response in Main.java to choose a default useState value.


    const requestHoroscope = () => {
        const toSend : MatchesRequestData = {
            //TODO: Pass in the values for the data. Follow the format the route expects!
            sun : sun,
            moon : moon,
            rising : rising
        };

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }

        //Install and import axios!
        //TODO: Fill in 1) location for request 2) your data 3) configuration
        axios.post('http://localhost:4567/horoscope', toSend, config)
        .then((response : any) => {
            console.log(response.data['horoscope']);
            //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
            //Note: It is very important that you understand how this is set up and why it works!
            setHoroscope(response.data['horoscope']);
        })
        .catch((error : any) => {
            console.log(error);
        });
    }

    return (
        <div className='Horoscope'>
            <h1>Horoscope</h1>
            <TextBox label='Sun Sign' change={setSun}></TextBox>
            <TextBox label='Moon Sign' change={setMoon}></TextBox>
            <TextBox label='Rising Sign' change={setRising}></TextBox>
            <AwesomeButton type='Primary' onPress={requestHoroscope}>Submit</AwesomeButton>
            <ul>
                {horoscope && horoscope.map((value : string) => <li>{value}</li>)}
            </ul>
        </div>
    );
}

export default Horoscope;