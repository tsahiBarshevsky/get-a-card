import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function LoadingAnimation() 
{
    return (
        <div className="full-container">
            <Loader
                type="Bars"
                color="#1a73e8"
                height={70}
                width={70}
            />
        </div>
    )
}
