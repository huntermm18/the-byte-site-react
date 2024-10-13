import React from "react";
import { useNavigate } from 'react-router-dom';


export const HuntPage = () => {
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const input = event.target.value.replaceAll(" ", "").toLowerCase();
        if (input === '18285670562881') {
            navigate('/aaa')
        }
    }
    return (
        <div style={{ fontFamily: 'Courier New', fontSize: 12 }}>
            <div>i reAlly wi$h i c0ulD g0 bAck 2 $undanCe</div>
            <input onChange={handleInputChange} />
        </div>
    );
};

export const AaaPage = () => {
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const input = event.target.value.replaceAll(" ", "").toLowerCase();
        if (input === 'ilovehunter') {
            navigate('/xyz')
        }
    }
    return (
        <div style={{ fontFamily: 'Courier New', fontSize: 12 }}>
            <div><img src={require('../data/scode.jpeg')} alt='https://open.spotify.com/playlist/4MGJFnRzaijiMKLusAa6st?si=cb6481d383fc45b6' /></div>

            <input onChange={handleInputChange} />
        </div>
    );
};

export const XyzPage = () => {
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const input = event.target.value.replaceAll(" ", "").toLowerCase();
        if (input === 'youfoundme') {
            navigate('/annie')
        }
    }
    return (
        <div style={{ fontFamily: 'Courier New', fontSize: 12 }}>
            <div><img src={require('../data/maze.png')} alt='maze' /></div>

            <input onChange={handleInputChange} />
        </div>
    );
};

export const AnniePage = () => {

    return (
        <div style={{ fontFamily: 'Courier New', fontSize: 12 }}>
            <div><img src={require('../data/IMG_2217.jpg')} alt='maze' /></div>
        </div>
    );
};