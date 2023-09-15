import Thermometer from "./Thermometer";
import {Eva} from "@eva-ics/webengine";
import {ItemValueThreshold} from "@eva-ics/webengine-react";

export enum ClassNameColors {
    Normal = "thermometer-progress-color",
    Warning = "thermometer-warning-color",
    Critical = "thermometer-critical-color",
}

export interface ThermometerParams {
    oid: string;
    minValue: number,
    maxValue: number,
    engine?: Eva;
    value?: number;
    digits?: number;
    units?: string;
    threshold?: Array<ItemValueThreshold>;
    format_with?: (value: any) => any;
    warnValue?: number;
    critValue?: number;
    showValue?: boolean,
    label?: string;
    showMinMax?: boolean;
}

export {Thermometer}
