import { SyncLoader } from "react-spinners";

export default function Preloader() {
    return (
        <div className="flex items-center justify-center h-full">
            <SyncLoader speedMultiplier={0.5} color="blue" />
        </div>
    )
}
