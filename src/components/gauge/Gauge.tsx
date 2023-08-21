import React, {useEffect, useState} from 'react';
import {useGauge} from '../../hooks/useGauge';
import {GaugeParams} from "../../types";


const defaultGaugeOptions = {
    value: 0, // Indicator value
    diameter: 300, // Gauge diameter value
    minValue: 0, // Minimum value indicator
    maxValue: 100, // Maximum value indicator
    startAngle: 90, // Initial indicator position
    endAngle: 270, // End indicator position
    numTicks: 11, // Step of indicator values
    offset: 8, // Distance of indicator line from the center
    arcStrokeWidth: 24, // Indicator line thickness
    progressColor: '#19e0e0', // Color of progress
    strokeLineCap: 'round', // Type of progress line
    tickColor: '#ccc', // Color of ticks
    tickLength: 10, // Length of ticks
    baseRadius: 12, // Radius of central point of arrow indicator
    tipRadius: 2, // Radius of end point of arrow indicator
    needleColor: '#374151', // Color of arrow indicator
    needleOffset: 35, // Length of arrow indicator
};

const Gauge = ({
                   value,
                   diameter = defaultGaugeOptions.diameter,
                   minValue,
                   warnValue,
                   critValue,
                   maxValue,
                   startAngle = defaultGaugeOptions.startAngle,
                   endAngle = defaultGaugeOptions.endAngle,
                   numTicks = defaultGaugeOptions.numTicks,
                   offset = defaultGaugeOptions.offset,
                   arcStrokeWidth = defaultGaugeOptions.arcStrokeWidth,
                   progressColor = defaultGaugeOptions.progressColor,
                   strokeLineCap = "round",
                   tickColor = defaultGaugeOptions.tickColor,
                   tickLength = defaultGaugeOptions.tickLength,
                   baseRadius = defaultGaugeOptions.baseRadius,
                   tipRadius = defaultGaugeOptions.tipRadius,
                   needleColor = defaultGaugeOptions.needleColor,
                   needleOffset = defaultGaugeOptions.needleOffset,
               }: GaugeParams) => {
    const [progressColorOfValue, setProgressColorOfValue] = useState("#329e11");


    // useEffect(() => {
    //     if (warnValue === undefined) {
    //         // If no warnValue, show green and red
    //         setProgressColorOfValue(value >= maxValue ? "#c7472e" : "#329e11");
    //     } else if (critValue === undefined) {
    //         // If no critValue, show green and yellow
    //         setProgressColorOfValue(value >= warnValue ? "#dceb15" : "#329e11");
    //         setProgressColorOfValue(value >= maxValue ? "#c7472e" : "#329e11");
    //         setProgressColorOfValue(value <= warnValue ? "#329e11" : "#dceb15");
    //     } else {
    //         { // If both warnValue and critValue are available
    //             if (value >= minValue && value < warnValue) {
    //                 setProgressColorOfValue("#329e11");
    //             } else if (value >= warnValue && value < critValue) {
    //                 setProgressColorOfValue("#dceb15");
    //             } else if (value >= critValue && value < maxValue) {
    //                 setProgressColorOfValue("#c7472e");
    //             } else if (value >= maxValue) {
    //                 setProgressColorOfValue("#c7472e");
    //             }
    //         }
    //     }
    // }, [value, warnValue, critValue, minValue, maxValue]);

    useEffect(() => {
        if (warnValue === undefined && critValue === undefined) {
            setProgressColorOfValue("#329e11");
        } else if (critValue === undefined) {
            // @ts-ignore
            setProgressColorOfValue(value < warnValue ? "#329e11" : "#dceb15");
        } else if (warnValue === undefined) {
            setProgressColorOfValue(value < critValue ? "#329e11" : "#c7472e");
        } else {
            switch (true) {
                case value >= minValue && value < warnValue:
                    setProgressColorOfValue("#329e11");
                    break;
                case value > warnValue && value < maxValue:
                    setProgressColorOfValue("#dceb15");
                    break;
                case value >= critValue:
                    setProgressColorOfValue("#c7472e");
                    break;
                default:
                    return;
            }
        }
    }, [value, warnValue, critValue, minValue, maxValue]);


    const {
        ticks,
        getTickProps,
        getLabelProps,
        valueToAngle,
        angleToValue,
        getArcProps,
        getNeedleProps,
        getSVGProps,
    } = useGauge({
        startAngle,
        endAngle,
        numTicks,
        diameter,
        domain: [minValue, maxValue],
    });

    const {tip, base, points} = getNeedleProps({
        value,
        baseRadius,
        tipRadius,
        offset: needleOffset,
    });

    return (
        <div className="gauge-wrapper">
            <svg {...getSVGProps()} className="gauge-preview">
                <path
                    {...getArcProps({
                        offset,
                        startAngle,
                        endAngle,
                    })}
                    fill="none"
                    className="stroke-default-color"
                    strokeWidth={arcStrokeWidth}
                    strokeLinecap={strokeLineCap as "round" | "butt" | "square" | "inherit" | undefined}
                />
                {value > minValue && (
                    <path
                        {...getArcProps({
                            offset,
                            startAngle,
                            endAngle: valueToAngle(value),
                        })}
                        fill="none"
                        stroke={progressColorOfValue}
                        strokeWidth={arcStrokeWidth}
                        strokeLinecap={strokeLineCap as "round" | "butt" | "square" | "inherit" | undefined}
                    />
                )}
                <g id="ticks">
                    {ticks.map((angle) => (
                        <React.Fragment key={`tick-group-${angle}`}>
                            <line
                                stroke={tickColor}
                                {...getTickProps({angle, length: tickLength})}
                            />
                            <text
                                className="text-default-color"
                                {...getLabelProps({angle, offset: 20})}
                            >
                                {angleToValue(angle)}
                            </text>
                        </React.Fragment>
                    ))}
                </g>
                <g id="needle">
                    <circle className="middle-circle-color" {...base} r={24}/>
                    <circle fill={needleColor} {...base} />
                    <circle fill={needleColor} {...tip} />
                    <polyline fill={needleColor} points={points}/>
                    <circle className="midpoint-color" {...base} r={4}/>
                </g>
            </svg>
        </div>
    );
};

export default Gauge;
