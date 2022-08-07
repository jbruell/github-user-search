import { TextField } from "@mui/material";

export type SearchInputProps = {
    onChange?: (s: string) => void;
};

export function SearchInput(props: SearchInputProps): JSX.Element {
    const { onChange } = props;

    return (
        <TextField
            id="search"
            label="Search Github Users"
            onChange={e => onChange && onChange(e.currentTarget.value)}
        />
    );
}
