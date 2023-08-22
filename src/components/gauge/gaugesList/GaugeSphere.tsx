import React, {useEffect, useState} from 'react';
import {useGauge} from '../hooks/useGauge';
import {ClassNameColors, GaugeParams, StrokeLineCamp} from "../types";
import {ItemValue} from "@eva-ics/webengine-react";


const defaultGaugeOptions = {
    value: 0, // Indicator value
    diameter: 200, // GaugeStandard diameter value
    minValue: 0, // Minimum value indicator
    maxValue: 100, // Maximum value indicator
    startAngle: 45, // Initial indicator position
    endAngle: 315, // End indicator position
    numTicks: 5, // Step of indicator values
    offset: -50, // Distance of indicator line from the center
    arcStrokeWidth: 24, // Indicator line thickness
    strokeLineCap: StrokeLineCamp.BUTT, // Type of progress line
    tickLength: 10, // Length of ticks
    baseRadius: 6, // Radius of central point of arrow indicator
    middleRadius: 14, //Radius of middle circle of arrow indicator
    tipRadius: 2, // Radius of end point of arrow indicator
    needleOffset: 10, // Length of arrow indicator
};

const GaugeSphere = ({
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
                         strokeLineCap = defaultGaugeOptions.strokeLineCap,
                         tickLength = defaultGaugeOptions.tickLength,
                         baseRadius = defaultGaugeOptions.baseRadius,
                         tipRadius = defaultGaugeOptions.tipRadius,
                         needleOffset = defaultGaugeOptions.needleOffset,
                         middleRadius = defaultGaugeOptions.middleRadius,
                         engine
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
                    {/*@ts-ignore*/}
                    {value ? <ItemValue engine={engine} oid="sensor:tests/temp" digits="2" units="C"/> : ""}
                </div>
            </div>

        </div>
    );
};

export default GaugeSphere;
