import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Feature.css';

function Feature() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/directions');
    };

    return (
        <div className="flex flex-col text-gray-800">
            <div className="container mx-auto px-6 pt-16 flex-1 text-center">
                <h2 className="text-2xl md:text-4xl lg:text-6xl uppercase text-gray-700">Welcome to</h2>
                <h1 className="text-3xl md:text-6xl lg:text-8xl uppercase font-black mb-8 text-gray-900">SafeCycle</h1>
                <p className="text-base md:text-lg lg:text-2xl mb-8 text-gray-700">A place for people looking to ride bicycle freely and safely in Melbourne.</p>
                <button onClick={handleClick} className="flex items-center font-black justify-center text-lg md:text-2xl lg:text-3xl py-2 px-4 md:py-4 md:px-10 lg:py-6 lg:px-12 bg-blue-500 bg-opacity-10 w-fit mx-auto mb-8 rounded-full text-blue-900 shadow-lg" > START </button>
                <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row gap-100">
                    <div className="flex-1 flex flex-col items-center text-center">
                        <img src="./src/assets/image1.jpg" alt="Stay Informed" className="w-full h-auto rounded-lg shadow-lg mb-4"/>
                        <p className="text-lg md:text-xl text-gray-700">Thanks for using SafeCycle! Here, you can discover the safest routes for your commute, avoid heavy traffic, and find useful cycling resources. Plan your journey, check risk levels, and stay informed about cycling conditions.</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center text-center">
                        <img src="./src/assets/image2.png" alt="Stay Safe" className="w-full h-auto rounded-lg shadow-lg mb-4"/>
                        <p className="text-lg md:text-xl text-gray-700">At SafeCycle, we regard your safety as our number one priority. Please follow the link to find out more on how to stay safe while cycling!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feature;
