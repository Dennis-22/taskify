import SyncLoader from "react-spinners/SyncLoader";

const override = {
    display: "block",
    margin: "10px auto",
    textAlign:'center',
}

export default function Loader({loading}){
    return <SyncLoader
    color={"#0B7FEA"}
    loading={loading}
    cssOverride={override}
    size={10}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
}