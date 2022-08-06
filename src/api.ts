import axios from "axios";

const client = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Content-type": "application/json",
        Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
    }
});

export function queryUsersByUsername(name: string) {
    return client.get<GithubResponse<User>>("/search/users", {
        headers: {
            accept: "application/vnd.github+json"
        },
        params: {
            q: `${name} in:login`
        }
    });
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
