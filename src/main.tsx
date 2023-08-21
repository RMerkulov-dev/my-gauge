import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Eva, EvaError, EventKind} from "@eva-ics/webengine";

const engine=new Eva()
const eva = new Eva();
const log = eva.log;

eva.login = "rmerkulov";
eva.password= "xxx";

eva.api_uri = "http://10.90.5.20:7727";

eva.watch("sensor:tests/temperature", (state) => {
    document.getElementById("temperature")!.innerHTML = state.value;
});
eva.on(EventKind.LoginSuccess, () => {
    log.info("logged into", eva.system_name());
});

eva.on(EventKind.LoginFailed, (err: EvaError) => {
    log.error("login failed", err);
});

eva.start();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App engine={engine} />
  </React.StrictMode>,
)
