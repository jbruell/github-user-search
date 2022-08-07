import { Star, StarBorder } from "@mui/icons-material";
import {
    Avatar,
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from "@mui/material";
import { User } from "../api";
import {
    FavUsersProvider,
    useFavoriteUsers
} from "../context/FavoriteUsersContext";

export type UserListItemProps = {
    user: User;
};

export function UserListItem(props: UserListItemProps) {
    const {
        user: { id, avatar_url, login }
    } = props;

    const [isFavorite, add, remove] = useFavoriteUsers();

    function onFavoriteBtnClick() {
        isFavorite(id) ? remove(id) : add(id);
    }

    return (
        <FavUsersProvider>
            <ListItem
                disablePadding
                secondaryAction={
                    <IconButton onClick={onFavoriteBtnClick}>
                        {isFavorite(id) ? <Star /> : <StarBorder />}
                    </IconButton>
                }
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={avatar_url} alt={login} />
                    </ListItemAvatar>
                    <ListItemText primary={login} />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </FavUsersProvider>
    );
}
