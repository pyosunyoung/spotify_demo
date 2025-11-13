import React from "react";
import { ScaleLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <ScaleLoader color="currentColor" loading={true} height={40} width={4} margin={3} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "#1DB954",
  }
};

export default LoadingSpinner;
