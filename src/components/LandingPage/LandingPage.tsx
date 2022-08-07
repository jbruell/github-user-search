import { Box, Typography } from "@mui/material";
import debounce from "lodash.debounce";
import { useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { UserList } from "../UserList/UserList";

export function LandingPage() {
    const [queryInput, setQueryInput] = useState("");

    return (
        <Box
            sx={{
                height: "100vh",
                background: "#F2F4F9",
                p: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <>
                <Typography
                    variant="h3"
                    sx={{
                        mb: "3rem"
                    }}
                >
                    Github User Search
                </Typography>
                <SearchInput onChange={debounce(setQueryInput, 200)} />
                <UserList queryInput={queryInput} />
            </>
        </Box>
    );
}
