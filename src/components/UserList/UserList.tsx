import { Box, Card, CircularProgress, List } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { parseLinkRelations, queryUsersByUsername } from "../../api";
import { UserListItem } from "../UserListItem";

export type UserListProps = {
    queryInput: string;
};

export function UserList(props: UserListProps) {
    const { queryInput } = props;

    const { data, error, isFetching, hasNextPage, fetchNextPage, refetch } =
        useInfiniteQuery(
            ["users", queryInput],
            pageParam => queryUsersByUsername(queryInput, 1, pageParam),
            {
                getNextPageParam: parseLinkRelations
            }
        );

    if (!data?.pages || !data?.pages[0]) {
        return null;
    }

    return (
        <Card
            elevation={3}
            sx={{
                width: "75%",
                mt: "4rem",
                overflowY: "scroll"
            }}
        >
            <>
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
                        loader={
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: "1rem"
                                }}
                            >
                                <CircularProgress />
                            </Box>
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
                        <List>
                            {data?.pages.map((group, i) => (
                                <React.Fragment key={i}>
                                    {group?.data.items.map(item => (
                                        <UserListItem
                                            key={item.id}
                                            user={item}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </List>
                    </InfiniteScroll>
                )}
            </>
        </Card>
    );
}
