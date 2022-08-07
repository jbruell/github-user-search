import { Box } from "@mui/material";
import { useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { useInfiniteQuery } from "react-query";
import { queryUsersByUsername, parseLinkRelations } from "../../api";
import debounce from "lodash.debounce";

export function LandingPage() {
    const [queryInput, setQueryInput] = useState("");

    const {
        data,
        error,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(
        ["users", queryInput],
        pageParam => queryUsersByUsername(queryInput, 1, pageParam),
        {
            getNextPageParam: lastPage => parseLinkRelations(lastPage)
        }
    );

    return (
        <Box>
            <SearchInput onChange={debounce(setQueryInput, 200)} />
            {hasNextPage && (
                <Box>
                    <button onClick={() => fetchNextPage()}>Load</button>
                    <div>{isFetchingNextPage && <span>fetching!</span>}</div>
                </Box>
            )}
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
