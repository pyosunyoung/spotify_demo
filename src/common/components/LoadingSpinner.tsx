import React from "react";
import { ScaleLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <ScaleLoader loading={true} height={40} width={4} margin={3} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // 화면 중앙 정렬
  }
};

export default LoadingSpinner;
