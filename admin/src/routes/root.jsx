import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import { Link } from "react-router-dom";

function Root() {
    return (
        <div className="root">
            <Navbar />
            <p>hi</p>
            <Link to="/dashboard">DASHBOARD</Link>
            <AbcIcon />
        </div>
    );
}

export default Root

