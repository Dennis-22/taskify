import SyncLoader from "react-spinners/SyncLoader";

const override = {
    display: "block",
    margin: "10px auto",
    textAlign:'center',
}

export default function Loader({className, loading}){
  return <div className={className}>
    <SyncLoader
      color={"#0B7FEA"}
      cssOverride={override}
      loading={loading}
      size={10}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
}