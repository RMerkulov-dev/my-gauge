import {useEffect, useState} from 'react';
import {ItemValue, useEvaState} from "@eva-ics/webengine-react";
import {ClassNameColors, ThermometerParams} from "./index";

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
                         showValue,
                         label,
                         showMinMax
                     }: ThermometerParams) => {
    const [progressColorOfValue, setProgressColorOfValue] = useState(
        ClassNameColors.Normal
    );
    const state = useEvaState({oid, engine});
    const {value} = state;
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

    useEffect(() => {
        if (warnValue === undefined && critValue === undefined) {
            setProgressColorOfValue(ClassNameColors.Normal);
        } else if (critValue === undefined) {
            setProgressColorOfValue(
                value < warnValue! ? ClassNameColors.Normal : ClassNameColors.Warning
            );
        } else if (warnValue === undefined) {
            setProgressColorOfValue(
                value < critValue ? ClassNameColors.Normal : ClassNameColors.Critical
            );
        } else {
            switch (true) {
                case value >= minValue && value < warnValue:
                    setProgressColorOfValue(ClassNameColors.Normal);
                    break;
                case value > warnValue && value < critValue:
                    setProgressColorOfValue(ClassNameColors.Warning);
                    break;
                case value >= critValue:
                    setProgressColorOfValue(ClassNameColors.Critical);
                    break;
                default:
                    return;
            }
        }
    }, [value, warnValue, critValue, minValue, maxValue, progressColorOfValue]);

    return (
        <div className="thermometer-container">
            {showMinMax && <div className="thermometer-min-value">
                <span>{maxValue}</span>
            </div>}

            <div className="thermometer-progress-container">
                <div
                    className={progressColorOfValue}
                    style={{
                        height: `${percentage}%`,
                    }}
                ></div>
                <div className="thermometer-separator">
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                </div>
            </div>
            {showMinMax && <div className="thermometer-max-value">
                <span>{minValue}</span>
            </div>}
            <div className="thermometer-values-container">
                <p className="thermometer-label">{label}</p>
                {showValue && (
                    <ItemValue
                        engine={engine}
                        oid={oid}
                        digits={digits}
                        units={units}
                        threshold={threshold}
                        format_with={format_with}
                    />
                )}
            </div>
        </div>
    );
};

export default Thermometer;
