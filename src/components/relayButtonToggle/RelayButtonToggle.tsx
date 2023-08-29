import React from 'react';
import {Eva, EvaError, ActionResult, EvaErrorKind} from "@eva-ics/webengine";
import {get_engine, useEvaState} from "@eva-ics/webengine-react";

interface RelayButton {
    oid: string;
    css_class?: string;
    engine?: Eva;
    on_success?: (result: ActionResult) => void;
    on_fail?: (err: EvaError) => void;
}

const RelayButtonToggle = ({
                               oid,
                               css_class,
                               engine,
                               on_success,
                               on_fail
                           }: RelayButton) => {
    const state = useEvaState({oid: oid, engine});
    const toggleOn = state.value > 0

    console.log(toggleOn)


    const handle_action_finished = (
        result: ActionResult,
        on_success?: (result: ActionResult) => void,
        on_fail?: (err: EvaError) => void
    ) => {
        if (result.exitcode === 0) {
            if (on_success) on_success(result);
        } else if (on_fail) {
            on_fail(new EvaError(EvaErrorKind.FUNC_FAILED, result.err || undefined));
        }
    };

    const handle_action_error = (
        err: EvaError,
        on_fail?: (err: EvaError) => void
    ) => {
        if (on_fail) {
            on_fail(err);
        }
    };

    const handle_action = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        const eva_engine: Eva = engine || (get_engine() as Eva);
        eva_engine.action
            .toggle(oid, true)
            .then((result) => handle_action_finished(result, on_success, on_fail))
            .catch((err) => handle_action_error(err, on_fail));
    }

    return (
        <div className="relay-button-wrapper" onClick={handle_action}>
            {toggleOn ?
                <div className="relay-switch-container">
                    <div className="relay-contact-left"></div>
                    <div className="relay-contact-right"></div>
                </div> :
                <div className="relay-switch-container">
                    <div className="relay-contact-left"></div>
                    <div className="relay-contact-right__off"></div>
                </div>
            }
        </div>
    );
};

export default RelayButtonToggle;
