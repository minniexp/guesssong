//loading imports
import { usePromiseTracker } from "react-promise-tracker";
import { TailSpin } from "react-loader-spinner";

export default function LoadingIndicator() {
  // Loading Symbol
  const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
      promiseInProgress && (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TailSpin color="#ff930f" height="200" width="200" />
          <p>If loading takes more than 30 seconds, please refresh the page.</p>
        </div>
      )
    );
  };

  return <LoadingIndicator />;
}
