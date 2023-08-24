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
                   type,
                   engine,
                   minValue,
                   maxValue,
                   ...rest
               }: GaugeParams) => {

    const state = useEvaState({oid, engine});
    const value = state.value;

    switch (type) {
        case GaugeType.SPHERE:
            return <GaugeSphere oid={oid} value={value} engine={engine} minValue={0} maxValue={100} {...rest} />;
        case GaugeType.LIGHT:
            return <GaugeLight oid={oid} value={value} engine={engine} minValue={0} maxValue={100} {...rest} />;
        case GaugeType.MINIMAL:
            return <GaugeMinimal oid={oid} value={value} engine={engine} minValue={0} maxValue={100} {...rest} />;
        default:
            return <GaugeStandard oid={oid} value={value} engine={engine} minValue={0} maxValue={100} {...rest} />;
    }
};

export default Gauge;
