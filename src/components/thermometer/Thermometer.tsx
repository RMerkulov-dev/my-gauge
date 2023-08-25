import React from 'react';
import {useEvaState} from "@eva-ics/webengine-react";

const Thermometer = ({oid, engine, minValue, maxValue}) => {
    const state = useEvaState({oid, engine});
    const {value} = state;
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    console.log(percentage)


    return (
        <>
            <div className="container">
                <div className="value-wrapper">
                    <span>{maxValue}</span>
                  
                </div>
                <div className="thermometer-wrapper">
                    <div className="progress" style={{height: `${percentage}%`}}></div>
                </div>
                <div className="value-wrapper">
                    <span>{minValue}</span>
                </div>
            </div>

        </>

    );
};

export default Thermometer;
