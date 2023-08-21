import {Eva} from "@eva-ics/webengine";

export interface UseGaugeParams {
    diameter: number;
    startAngle: number;
    endAngle: number;
    numTicks: number;
    domain: [number, number];
}

export interface GetNeedleParams {
    value: number;
    baseRadius: number;
    tipRadius: number;
    offset?: number;
}

export interface GetArcPropsParams {
    offset?: number;
    startAngle: number;
    endAngle: number;
}

export interface GetTickPropsParams {
    length: number;
    angle: number;
}

export interface GetLabelPropsParams {
    angle: number;
    offset: number;
}

export enum StrokeLineCamp {
    BUTT = "butt",
    ROUND = "round",
    SQUARE = "square",
    INHERIT = 'inherit'
}

export interface GaugeParams {
    engine?: Eva;
    value: number;
    minValue: number,
    maxValue: number,
    warnValue?: number;
    critValue?: number;
    startAngle?: number,
    endAngle?: number,
    diameter?: number,
    numTicks?: number,
    offset?: number,
    arcStrokeWidth?: number,
    progressColor?: string,
    strokeLineCap?: StrokeLineCamp | undefined,
    tickColor?: string,
    tickLength?: number,
    baseRadius?: number,
    tipRadius?: number,
    needleColor?: string,
    needleOffset?: number,
}
