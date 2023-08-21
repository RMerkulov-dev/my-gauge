import React from 'react';
import { useEvaState} from "@eva-ics/webengine-react";
import { Eva } from "@eva-ics/webengine";



const EvaTest = ({engine}:{engine:Eva}) => {

    const state = useEvaState({ oid: "sensor:tests/temp",engine });
    console.log(state)

    let value = state.value;
    return <span>{value}</span>;

};

export default EvaTest;
