import React from 'react';
import { useGauge } from '../../hooks/useGauge';
import {defaultGaugeOptions} from "./defaultGaugeOptions";

const Gauge = () => {

    const {  value,
        diameter,
        minValue,
        maxValue,
        startAngle,
        endAngle,
        numTicks,
        offset,
        arcStrokeWidth,
        progressColor,
        strokeLineCap,
        tickColor,
        tickLength,
        baseRadius,
        tipRadius,
        needleColor,
        needleOffset}=defaultGaugeOptions

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

    const { tip, base, points } = getNeedleProps({
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
                        stroke={progressColor}
                        strokeWidth={arcStrokeWidth}
                        strokeLinecap={strokeLineCap as "round" | "butt" | "square" | "inherit" | undefined}
                    />
                )}
                <g id="ticks">
                    {ticks.map((angle) => (
                        <React.Fragment key={`tick-group-${angle}`}>
                            <line
                                stroke={tickColor}
                                {...getTickProps({ angle, length: tickLength })}
                            />
                            <text
                                className="text-default-color"
                                {...getLabelProps({ angle, offset: 20 })}
                            >
                                {angleToValue(angle)}
                            </text>
                        </React.Fragment>
                    ))}
                </g>
                <g id="needle">
                    <circle className="middle-circle-color" {...base} r={24} />
                    <circle fill={needleColor} {...base} />
                    <circle fill={needleColor} {...tip} />
                    <polyline fill={needleColor} points={points} />
                    <circle className="midpoint-color" {...base} r={4} />
                </g>
            </svg>
        </div>
    );
};

export default Gauge;
