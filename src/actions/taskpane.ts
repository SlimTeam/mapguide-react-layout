import { MgError } from "../api/error";
import {
    ReduxThunkedAction
} from "../api/common";
import { ActionType } from '../constants/actions';
import { ITaskPaneBackAction, ITaskPaneForwardAction, ITaskPanePushUrlAction } from './defs';

/**
 * Go back to the initial task URL
 *
 * @export
 * @returns {ReduxThunkedAction}
 * 
 * @browserapi MapGuide.Actions.TaskPane
 */
export function goHome(): ReduxThunkedAction {
    return (dispatch, getState) => {
        const initUrl = getState().taskpane.initialUrl;
        if (initUrl != null) {
            dispatch({
                type: ActionType.TASK_PANE_HOME
            });
        } else {
            throw new MgError("Case not handled yet: Home action when no initial task URL set");
        }
    };
}

/**
 * Go back one entry in the task pane navigation history
 *
 * @export
 * @returns
 * 
 * @browserapi MapGuide.Actions.TaskPane
 */
export function goBack(): ITaskPaneBackAction {
    return {
        type: ActionType.TASK_PANE_BACK
    };
}

/**
 * Go forward one entry in the task pane navigation history
 *
 * @export
 * @returns
 * 
 * @browserapi MapGuide.Actions.TaskPane
 */
export function goForward(): ITaskPaneForwardAction {
    return {
        type: ActionType.TASK_PANE_FORWARD
    };
}

/**
 * Pushes the given URL to the task pane navigation history stack
 *
 * @export
 * @param {string} url
 * @param {boolean} [silent]
 * @returns
 * 
 * @browserapi MapGuide.Actions.TaskPane
 */
export function pushUrl(url: string, silent?: boolean): ITaskPanePushUrlAction {
    return {
        type: ActionType.TASK_PANE_PUSH_URL,
        payload: {
            url: url,
            silent: silent
        }
    };
}