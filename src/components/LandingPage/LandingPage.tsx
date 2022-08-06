import { Box } from "@mui/material";
import { useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { useQuery } from "react-query";
import { queryUsersByUsername } from "../../api";

export function LandingPage() {
    const [queryInput, setQueryInput] = useState("");

    const { data, error, isFetching } = useQuery(["users", queryInput], () =>
        queryUsersByUsername(queryInput)
    );

    return (
        <Box>
            <SearchInput value={queryInput} onChange={setQueryInput} />
            <Box>
                {isFetching ? (
                    <span>fetching...</span>
                ) : error ? (
                    <span>{JSON.stringify(error)}</span>
                ) : (
                    <span>{JSON.stringify(data)}</span>
                )}
            </Box>
        </Box>
    );
}
