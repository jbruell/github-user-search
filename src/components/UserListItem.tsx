import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from "@mui/material";
import { useState } from "react";
import { User } from "../api";
import { FavUsersProvider } from "../context/FavoriteUsersContext";
import { DetailDialog } from "./DetailDialog";
import { FavoriteButton } from "./FavoriteButton";

export type UserListItemProps = {
    user: User;
};

export function UserListItem(props: UserListItemProps) {
    const { user } = props;
    const { id, avatar_url, login } = user;

    const [open, setOpen] = useState(false);

    return (
        <FavUsersProvider>
            <ListItem
                disablePadding
                secondaryAction={<FavoriteButton id={id} />}
            >
                <ListItemButton onClick={() => setOpen(true)}>
                    <ListItemAvatar>
                        <Avatar src={avatar_url} alt={login} />
                    </ListItemAvatar>
                    <ListItemText primary={login} />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
            <DetailDialog
                open={open}
                onBackgroundClick={() => setOpen(false)}
                user={user}
            />
        </FavUsersProvider>
    );
}
