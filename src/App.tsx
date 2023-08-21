import React from 'react';
import {Eva, EvaError, EventKind} from "@eva-ics/webengine";
import Gauge from "./components/gauge/Gauge";
import {useEvaState} from "@eva-ics/webengine-react";


const App = ({engine}: { engine: Eva }) => {
    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const value = state.value;

    console.log(value)

    return (
        <>
            <Gauge engine={engine} minValue={0} maxValue={93} value={value} midValue={40}/>
        </>
    )
}

export default App
