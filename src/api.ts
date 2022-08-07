import axios, { AxiosResponse } from "axios";
import { QueryFunctionContext } from "react-query";

const client = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Content-type": "application/json",
        Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
        accept: "application/vnd.github+json"
    }
});

export function queryUsersByUsername(
    name: string,
    page: 1,
    cursor?: QueryFunctionContext<string[], any>
) {
    if (name.length < 3) return;

    if (cursor?.pageParam?.next) {
        return client.get<GithubResponse<User>>(cursor?.pageParam?.next);
    }

    return client.get<GithubResponse<User>>("/search/users", {
        params: {
            q: `${name} in:login`,
            page: page,
            per_page: 20
        }
    });
}

export function parseLinkRelations(
    res?: AxiosResponse<GithubResponse<any>, any>
) {
    let data = res?.headers?.link;
    if (!data) return;
    let arrData = data.split("link:");
    data = arrData.length === 2 ? arrData[1] : data;
    let parsed_data: {
        [key: string]: string;
    } = {};

    arrData = data.split(",");

    for (const d of arrData) {
        const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(d);
        if (!linkInfo?.length || linkInfo?.length < 2) return;

        parsed_data[linkInfo[2]] = linkInfo[1];
    }

    return parsed_data;
}

export type GithubResponse<T> = {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
};

export type User = {
    id: number;
    login: string;
};
