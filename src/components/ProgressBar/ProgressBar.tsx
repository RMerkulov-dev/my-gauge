import {useEffect, useState} from "react";
import {ClassNameColors, ProgressBarParams} from "./index";
import {ItemValue, useEvaState} from "@eva-ics/webengine-react";

const ProgressBar = ({
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
                         showMinMaxValues,
                         label,
                     }: ProgressBarParams) => {
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
    }, [value, warnValue, critValue, minValue, progressColorOfValue]);

    return (
        <>
            <div className="progressbar-container">
                <div className="progressbar-labels-container">
                    {showMinMaxValues && <div className="progressbar-max-value">
                        <span>{minValue}</span>
                    </div>}
                    <div className="progressbar-progress-container">
                        <div
                            className={progressColorOfValue}
                            style={{
                                width: `${percentage}%`,
                                height: "100%",
                            }}
                        ></div>
                    </div>
                    {showMinMaxValues && <div className="progressbar-min-value">
                        <span>{maxValue}</span>
                    </div>}

                </div>
                <div className="progressbar-values">
                    {showValue && (
                        <div className="progressbar-values-container">
                            <p className="progressbar-values-label">{label}</p>
                            <ItemValue
                                engine={engine}
                                oid={oid}
                                digits={digits}
                                units={units}
                                threshold={threshold}
                                format_with={format_with}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProgressBar;
