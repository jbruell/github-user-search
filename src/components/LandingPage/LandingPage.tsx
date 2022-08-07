import { Box } from "@mui/material";
import { useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { useInfiniteQuery } from "react-query";
import { queryUsersByUsername, parseLinkRelations } from "../../api";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";

export function LandingPage() {
    const [queryInput, setQueryInput] = useState("");
    console.log("render", queryInput);

    const {
        data,
        error,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery(
        ["users", queryInput],
        pageParam => queryUsersByUsername(queryInput, 1, pageParam),
        {
            getNextPageParam: lastPage => parseLinkRelations(lastPage)
        }
    );

    return (
        <Box>
            <>
                <SearchInput onChange={debounce(setQueryInput, 200)} />
                {hasNextPage && (
                    <Box>
                        <button onClick={() => fetchNextPage()}>Load</button>
                        <div>
                            {isFetchingNextPage && <span>fetching!</span>}
                        </div>
                    </Box>
                )}
                {isFetching && <span>fetching...</span>}
                {error && <span>{JSON.stringify(error)}</span>}
                {data && (
                    <InfiniteScroll
                        dataLength={
                            data?.pages.reduce(
                                (prev, curr) =>
                                    prev + (curr?.data.total_count ?? 0),
                                0
                            ) ?? 0
                        }
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        // below props only if you need pull down functionality
                        refreshFunction={refetch}
                        pullDownToRefresh
                        pullDownToRefreshThreshold={50}
                        pullDownToRefreshContent={
                            <h3 style={{ textAlign: "center" }}>
                                &#8595; Pull down to refresh
                            </h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{ textAlign: "center" }}>
                                &#8593; Release to refresh
                            </h3>
                        }
                    >
                        <Box>
                            {data?.pages.map((group, i) => (
                                <React.Fragment key={i}>
                                    {group?.data.items.map(item => (
                                        <div key={item.id}>{item.login}</div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Box>
                    </InfiniteScroll>
                )}
            </>
        </Box>
    );
}
