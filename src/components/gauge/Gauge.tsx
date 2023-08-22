import React, {useEffect, useState} from 'react';
import {useGauge} from '../../hooks/useGauge';
import {ClassNameColors, GaugeParams, StrokeLineCamp} from "../../types";


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
    progressColor: ClassNameColors.GREEN, // Color of progress
    strokeLineCap: StrokeLineCamp.ROUND, // Type of progress line
    tickColor: '#ccc', // Color of ticks
    tickLength: 10, // Length of ticks
    baseRadius: 12, // Radius of central point of arrow indicator
    tipRadius: 2, // Radius of end point of arrow indicator
    needleColor: '#374151', // Color of arrow indicator
    needleOffset: 35, // Length of arrow indicator
};

const Gauge = ({
                   value = defaultGaugeOptions.value,
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
                   strokeLineCap = StrokeLineCamp.ROUND,
                   tickColor = defaultGaugeOptions.tickColor,
                   tickLength = defaultGaugeOptions.tickLength,
                   baseRadius = defaultGaugeOptions.baseRadius,
                   tipRadius = defaultGaugeOptions.tipRadius,
                   needleColor = defaultGaugeOptions.needleColor,
                   needleOffset = defaultGaugeOptions.needleOffset,
               }: GaugeParams) => {
    const [progressColorOfValue, setProgressColorOfValue] = useState(ClassNameColors.GREEN);
    console.log(progressColorOfValue)
    if (value > maxValue) {
        value = maxValue
    }

    useEffect(() => {
        if (warnValue === undefined && critValue === undefined) {
            setProgressColorOfValue(ClassNameColors.GREEN);
        } else if (critValue === undefined) {
            // @ts-ignore
            setProgressColorOfValue(value < warnValue ? ClassNameColors.GREEN : ClassNameColors.YELLOW);
        } else if (warnValue === undefined) {
            setProgressColorOfValue(value < critValue ? ClassNameColors.GREEN : ClassNameColors.RED);
        } else {
            switch (true) {
                case value >= minValue && value < warnValue:
                    setProgressColorOfValue(ClassNameColors.GREEN);
                    break;
                case value > warnValue && value < critValue:
                    setProgressColorOfValue(ClassNameColors.YELLOW);
                    break;
                case value >= critValue:
                    console.log("true", value)
                    setProgressColorOfValue(ClassNameColors.RED);
                    break;
                default:
                    return;
            }
        }
    }, [value, warnValue, critValue, minValue, maxValue, progressColorOfValue]);


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
                    strokeLinecap={strokeLineCap}
                />
                {value > minValue && (
                    <path
                        {...getArcProps({
                            offset,
                            startAngle,
                            endAngle: valueToAngle(value),
                        })}
                        fill="none"
                        className={progressColorOfValue}
                        strokeWidth={arcStrokeWidth}
                        strokeLinecap={strokeLineCap}
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
