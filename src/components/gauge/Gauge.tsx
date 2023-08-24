import React from 'react';
import {ItemValueThreshold, useEvaState} from "@eva-ics/webengine-react";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";
import {Eva} from "@eva-ics/webengine";

enum StrokeLineCamp {
    BUTT = "butt",
    ROUND = "round",
    SQUARE = "square",
    INHERIT = 'inherit'
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
    type?: "standard" | "sphere" | "minimal" | "light";
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

const Gauge = ({
                   oid,
                   minValue,
                   maxValue,
                   type,
                   engine,
                   digits,
                   units,
                   threshold,
                   format_with,
                   diameter,
                   warnValue,
                   critValue,
                   startAngle,
                   endAngle,
                   numTicks,
                   offset,
                   arcStrokeWidth,
                   strokeLineCap,
                   tickLength,
                   baseRadius,
                   tipRadius,
                   needleOffset,
                   middleRadius,
                   showValue
               }: GaugeParams) => {

    const state = useEvaState({oid, engine});
    const {value} = state;

    switch (type) {
        case GaugeType.SPHERE:
            return <GaugeSphere oid={oid} value={value} minValue={minValue} maxValue={maxValue} engine={engine}
                                digits={digits}
                                units={units} threshold={threshold} format_with={format_with} diameter={diameter}
                                warnValue={warnValue} critValue={critValue} startAngle={startAngle} endAngle={endAngle}
                                numTicks={numTicks} offset={offset} arcStrokeWidth={arcStrokeWidth}
                                strokeLineCap={strokeLineCap} tickLength={tickLength} baseRadius={baseRadius}
                                tipRadius={tipRadius} needleOffset={needleOffset} middleRadius={middleRadius}
                                showValue={showValue}/>;
        case GaugeType.LIGHT:
            return <GaugeLight oid={oid} value={value} minValue={minValue} maxValue={maxValue} engine={engine}
                               digits={digits}
                               units={units} threshold={threshold} format_with={format_with} diameter={diameter}
                               warnValue={warnValue} critValue={critValue} startAngle={startAngle} endAngle={endAngle}
                               numTicks={numTicks} offset={offset} arcStrokeWidth={arcStrokeWidth}
                               strokeLineCap={strokeLineCap} tickLength={tickLength} baseRadius={baseRadius}
                               tipRadius={tipRadius} needleOffset={needleOffset} middleRadius={middleRadius}
                               showValue={showValue}/>;
        case GaugeType.MINIMAL:
            return <GaugeMinimal oid={oid} value={value} minValue={minValue} maxValue={maxValue} engine={engine}
                                 digits={digits}
                                 units={units} threshold={threshold} format_with={format_with} diameter={diameter}
                                 warnValue={warnValue} critValue={critValue} startAngle={startAngle} endAngle={endAngle}
                                 numTicks={numTicks} offset={offset} arcStrokeWidth={arcStrokeWidth}
                                 strokeLineCap={strokeLineCap} tickLength={tickLength} baseRadius={baseRadius}
                                 tipRadius={tipRadius} needleOffset={needleOffset} middleRadius={middleRadius}
                                 showValue={showValue}/>;
        default:
            return <GaugeStandard oid={oid} value={value} minValue={minValue} maxValue={maxValue} engine={engine}
                                  digits={digits}
                                  units={units} threshold={threshold} format_with={format_with} diameter={diameter}
                                  warnValue={warnValue} critValue={critValue} startAngle={startAngle}
                                  endAngle={endAngle}
                                  numTicks={numTicks} offset={offset} arcStrokeWidth={arcStrokeWidth}
                                  strokeLineCap={strokeLineCap} tickLength={tickLength} baseRadius={baseRadius}
                                  tipRadius={tipRadius} needleOffset={needleOffset} middleRadius={middleRadius}
                                  showValue={showValue}/>;
    }
};

export default Gauge;
