import React from 'react';
import {useEvaState} from "@eva-ics/webengine-react";
import {GaugeParams, GaugeType} from "./types/types";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";

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
