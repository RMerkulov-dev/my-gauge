import React from 'react';
import {Eva} from "@eva-ics/webengine";
import {useEvaState} from "@eva-ics/webengine-react";
import {Gauge} from "./components/gauge/index";
import {GaugeType} from "./components/gauge/types";


const App = ({engine}: { engine: Eva }) => {

    return (
        <>
            <Gauge engine={engine} minValue={0} warnValue={30} critValue={65}
                   maxValue={95}/>
        </>
    )
}

export default App
