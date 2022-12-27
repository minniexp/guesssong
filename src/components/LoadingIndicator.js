//loading imports
import { usePromiseTracker } from "react-promise-tracker";
import {TailSpin} from 'react-loader-spinner'

export default function LoadingIndicator(){
    // Loading Symbol
    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        
        return (
            promiseInProgress && 
            <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                    alignItems: "center"
            }}
            >
                <TailSpin color="#00d8d8" height="200" width="200" />
            </div>
        )
    }
    
    return(
        <LoadingIndicator/>
    )
}