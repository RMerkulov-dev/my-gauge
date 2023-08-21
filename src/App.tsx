import React from 'react';
import {Eva, EvaError, EventKind} from "@eva-ics/webengine";
import Gauge from "./components/gauge/Gauge";




const App=({engine}:{engine:Eva})=> {


   return(
       <>
     <Gauge engine={engine}/>

       </>
   )
}

export default App
