import React from 'react';
import {useEvaState} from "@eva-ics/webengine-react";
import {GaugeConstructor, GaugeType} from "./types";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";


const Gauge = ({
                   type = GaugeType.STANDARD,
                   minValue,
                   maxValue,
                   warnValue,
                   critValue,
                   engine,
                   value,
                   diameter,
                   startAngle,
                   endAngle,
                   numTicks,
                   offset,
                   arcStrokeWidth,
                   strokeLineCap,
                   tickLength,
                   baseRadius,
                   tipRadius,
                   middleRadius,
                   needleOffset,

               }: GaugeConstructor) => {
    const GAUGES = {
        [GaugeType.STANDARD]: GaugeStandard,
        [GaugeType.SPHERE]: GaugeSphere,
        [GaugeType.MINIMAL]: GaugeMinimal,
        [GaugeType.LIGHT]: GaugeLight,
    };

    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const stateValue = state.value;

    const SelectedGauge = GAUGES[type];

    return (
        <SelectedGauge engine={engine} value={stateValue} maxValue={maxValue} minValue={minValue} diameter={diameter}
                       warnValue={warnValue} critValue={critValue} startAngle={startAngle} endAngle={endAngle}
                       numTicks={numTicks} offset={offset} arcStrokeWidth={arcStrokeWidth} strokeLineCap={strokeLineCap}
                       tickLength={tickLength} baseRadius={baseRadius} tipRadius={tipRadius} middleRadius={middleRadius}
                       needleOffset={needleOffset}/>
    );
};

export default Gauge;
