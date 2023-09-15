import {ItemValueThreshold} from "@eva-ics/webengine-react";
import ProgressBar from "./ProgressBar";
import {Eva} from "@eva-ics/webengine";

export enum ClassNameColors {
    Normal = "progressbar-progress-color",
    Warning = "progressbar-warning-color",
    Critical = "progressbar-critical-color",
}

export interface ProgressBarParams {
    oid: string;
    minValue: number;
    maxValue: number;
    engine?: Eva;
    value?: number;
    digits?: number;
    units?: string;
    threshold?: Array<ItemValueThreshold>;
    format_with?: (value: any) => any;
    warnValue?: number;
    critValue?: number;
    showValue?: boolean;
    showMinMaxValues?: boolean;
    label?: string;
}

export {ProgressBar};
