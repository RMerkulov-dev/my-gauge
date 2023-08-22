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

export enum ClassNameColors {
    GREEN = "progress-color",
    YELLOW = "warning-progress-color",
    RED = "critical-progress-color",
    TICK = "tick-color",
    NEEDLE = "needle-color"
}

export interface GaugeParams {
    engine?: Eva;
    oid?: string;
    value: number;
    diameter?: number,
    minValue: number,
    maxValue: number,
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
    middleRadius?: number
}

