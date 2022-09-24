import { Dispatch } from "react";


type Action = {
    type: string;
    payload?: any;
};

export const clear = function (payload:any) {
    return function(dispatch:Dispatch<Action>){
        dispatch({
            type: 'CLEAR',
            payload
        })
    }
}