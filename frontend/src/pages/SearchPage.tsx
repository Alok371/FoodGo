import { useParams } from "react-router-dom";

export default function SearchPage() {
    const { city } = useParams();
    return (
        <span>
            User Searched for {city}
        </span>
    )
}
