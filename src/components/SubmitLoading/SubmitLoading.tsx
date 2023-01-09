import { CircularProgress } from "@material-ui/core";

const SubmitLoading = ({ submit }: { submit: boolean }) => {
  return submit ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10000,
        height: "100vh",
        width: "100%",
        background: "rgba(0,0,0,0.6)",
      }}
    >
      <CircularProgress size={40} style={{ color: "#fff" }} />
    </div>
  ) : null;
};

export default SubmitLoading;
