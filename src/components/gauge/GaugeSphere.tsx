import React, {useEffect, useState} from 'react';
import {useGauge} from './index';
import {ItemValue, ItemValueThreshold} from "@eva-ics/webengine-react";
import {Eva} from "@eva-ics/webengine";


enum StrokeLineCamp {
    BUTT = "butt",
    ROUND = "round",
    SQUARE = "square",
    INHERIT = 'inherit'
}

enum ClassNameColors {
    GREEN = "progress-color",
    YELLOW = "warning-progress-color",
    RED = "critical-progress-color",
    TICK = "tick-color",
    NEEDLE = "needle-color"
}

enum GaugeType {
    STANDARD = "standard",
    SPHERE = "sphere",
    MINIMAL = "minimal",
    LIGHT = "light"
}


interface GaugeParams {
    oid: string;
    minValue: number,
    maxValue: number,
    type?: GaugeType;
    engine?: Eva;
    value?: number;
    digits?: number;
    units?: number;
    threshold?: Array<ItemValueThreshold>;
    format_with?: (value: any) => any;
    diameter?: number,
    warnValue?: number;
    critValue?: number;
    startAngle?: number,
    endAngle?: number,
    numTicks?: number,
    offset?: number,
    arcStrokeWidth?: number,
    strokeLineCap?: StrokeLineCamp | undefined,
    tickLength?: number,
    baseRadius?: number,
    tipRadius?: number,
    needleOffset?: number,
    middleRadius?: number,
    showValue?: boolean,
}

const options = {
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

export default GaugeSphere;
