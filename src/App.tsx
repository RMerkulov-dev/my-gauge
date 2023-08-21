import React from 'react';
import EvaTest from "./components/EvaStateComponent";
import {Eva, EvaError, EventKind} from "@eva-ics/webengine";
import Gauge from "./components/gauge/Gauge";




const App=({engine}:{engine:Eva})=> {


   return(
       <>
     <Gauge/>
       <EvaTest engine={engine} />
       </>
   )
}

export default App
