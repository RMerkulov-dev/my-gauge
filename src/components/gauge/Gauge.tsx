import React from 'react';
import {useEvaState} from "@eva-ics/webengine-react";
import {GaugeConstructor, GaugeType} from "./types";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";


const GaugeComponent = ({type = GaugeType.STANDARD, minValue, maxValue, engine}: GaugeConstructor) => {
    const GAUGES = {
        [GaugeType.STANDARD]: GaugeStandard,
        [GaugeType.SPHERE]: GaugeSphere,
        [GaugeType.MINIMAL]: GaugeMinimal,
        [GaugeType.LIGHT]: GaugeLight,
    };


    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const value = state.value;

    const SelectedGauge = GAUGES[type] || GaugeStandard;

    return (
        <SelectedGauge engine={engine} value={value} maxValue={maxValue} minValue={minValue}/>
    );
};

export default GaugeComponent;
