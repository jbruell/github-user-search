import "./App.css";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import { LandingPage } from "../LandingPage/LandingPage";
import { FavUsersProvider } from "../../context/FavoriteUsersContext";

const queryClient = new QueryClient();

function App() {
    return (
        <CssBaseline>
            <QueryClientProvider client={queryClient}>
                <FavUsersProvider>
                    <LandingPage />
                </FavUsersProvider>
            </QueryClientProvider>
        </CssBaseline>
    );
}

export default App;
