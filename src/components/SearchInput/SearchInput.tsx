import { Autocomplete, TextField } from "@mui/material";

export function SearchInput(): JSX.Element {
    return (
        <Autocomplete
            options={[]}
            filterOptions={x => x}
            renderInput={params => (
                <TextField {...params} label="Search User" />
            )}
        ></Autocomplete>
    );
}
