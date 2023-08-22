import React from 'react';
import {Eva} from "@eva-ics/webengine";
import {useEvaState} from "@eva-ics/webengine-react";
import {GaugeComponent} from "./components/gauge/index";
import {GaugeTypeNames} from "./components/gauge/types";


const App = ({engine}: { engine: Eva }) => {

    return (
        <>
            <GaugeComponent type={GaugeTypeNames.LIGHT} engine={engine} minValue={0} warnValue={30} critValue={65}
                            maxValue={95}/>
        </>
    )
}

export default App
