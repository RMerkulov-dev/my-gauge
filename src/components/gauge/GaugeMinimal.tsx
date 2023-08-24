import React, {useEffect, useState} from 'react';
import {useGauge} from './useGauge';
import {ClassNameColors, GaugeParams, StrokeLineCamp} from "./types/types";
import {ItemValue} from "@eva-ics/webengine-react";


const options = {
    value: 0, // Indicator value
    diameter: 150, // GaugeStandard diameter value
    minValue: 0, // Minimum value indicator
    maxValue: 100, // Maximum value indicator
    startAngle: 90, // Initial indicator position
    endAngle: 270, // End indicator position
    numTicks: 7, // Step of indicator values
    offset: -40, // Distance of indicator line from the center
    arcStrokeWidth: 24, // Indicator line thickness
    strokeLineCap: StrokeLineCamp.INHERIT, // Type of progress line
    tickLength: 10, // Length of ticks
    baseRadius: 5, // Radius of central point of arrow indicator
    middleRadius: 15, //Radius of middle circle of arrow indicator
    tipRadius: 2, // Radius of end point of arrow indicator
    needleOffset: 30, // Length of arrow indicator
};
options

const GaugeMinimal = ({
                          oid,
                          minValue,
                          maxValue,
                          warnValue,
                          critValue,
                          engine,
                          digits,
                          units,
                          threshold,
                          format_with,
                          showValue,
                          value = options.value,
                          diameter = options.diameter,
                          startAngle = options.startAngle,
                          endAngle = options.endAngle,
                          numTicks = options.numTicks,
                          offset = options.offset,
                          arcStrokeWidth = options.arcStrokeWidth,
                          strokeLineCap = options.strokeLineCap,
                          tickLength = options.tickLength,
                          baseRadius = options.baseRadius,
                          tipRadius = options.tipRadius,
                          needleOffset = options.needleOffset,
                          middleRadius = options.middleRadius,

                      }: GaugeParams) => {
    const [progressColorOfValue, setProgressColorOfValue] = useState(ClassNameColors.GREEN);

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
        <div className="gauge-container">
            <div className="gauge-wrapper">
                <svg {...getSVGProps()} className="gauge-preview">
                    <path
                        {...getArcProps({
                            offset,
                            startAngle,
                            endAngle,
                        })}
                        fill="none"
                        className="progress-background-color"
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
                                    className={ClassNameColors.TICK}
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
                        <circle className="middle-base-color" {...base} r={middleRadius}/>
                        <circle className={ClassNameColors.NEEDLE} {...base} />
                        <circle className={ClassNameColors.NEEDLE} {...tip} />
                        <polyline className={ClassNameColors.NEEDLE} points={points}/>
                        <circle className="midpoint-color" {...base} r={4}/>
                    </g>
                </svg>
                <div className="gauge-value">
                    {showValue &&
                        // @ts-ignore
                        <ItemValue engine={engine} oid={oid} digits={digits} units={units} threshold={threshold}
                                   format_with={format_with}/>}
                </div>
            </div>
        </div>
    );
};

export default GaugeMinimal;