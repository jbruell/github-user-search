import "./App.css";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import { LandingPage } from "../LandingPage/LandingPage";

const queryClient = new QueryClient();

function App() {
    return (
        <CssBaseline>
            <QueryClientProvider client={queryClient}>
                <LandingPage />
            </QueryClientProvider>
        </CssBaseline>
    );
}

export default App;
