import { TextField } from "@mui/material";

export type SearchInputProps = {
    value: string;
    onChange: (s: string) => void;
};

export function SearchInput(props: SearchInputProps): JSX.Element {
    const { value, onChange } = props;

    return (
        <TextField
            id="search"
            label="Search Github Users"
            value={value}
            onChange={e => onChange && onChange(e.currentTarget.value)}
        />
    );
}
