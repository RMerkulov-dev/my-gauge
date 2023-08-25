import React, {useEffect, useState} from 'react';
import {ItemValueThreshold, useEvaState} from "@eva-ics/webengine-react";
import {Eva} from "@eva-ics/webengine";

enum ClassNameColors {
    GREEN = "#329e11",
    YELLOW = "#dceb15",
    RED = "#c7472e",
}

interface ThermometerParams {
    oid: string;
    minValue: number,
    maxValue: number,
    engine?: Eva;
    value?: number;
    digits?: number;
    units?: number;
    threshold?: Array<ItemValueThreshold>;
    format_with?: (value: any) => any;
    warnValue?: number;
    critValue?: number;
    showValue?: boolean,
}

const Thermometer = ({
                         oid,
                         minValue,
                         maxValue,
                         engine,
                         digits,
                         units,
                         threshold,
                         format_with,
                         warnValue,
                         critValue,
                         showValue
                     }: ThermometerParams) => {
    const [progressColorOfValue, setProgressColorOfValue] = useState(ClassNameColors.GREEN);
    const state = useEvaState({oid, engine});
    const {value} = state;
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;


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


    return (
        <>
            <div className="thermometer-container">
                <div className="min-value">
                    <span>{maxValue}</span>
                </div>
                <div className="thermometer-wrapper">
                    <div className="progress"
                         style={{height: `${percentage}%`, backgroundColor: `${progressColorOfValue}`}}></div>
                    <div className="separator">
                        <div>-</div>
                        <div>-</div>
                        <div>-</div>
                        <div>-</div>
                        <div>-</div>
                    </div>
                </div>
                <div className="max-value">
                    <span>{minValue}</span>
                </div>
            </div>

        </>

    );
};

export default Thermometer;
