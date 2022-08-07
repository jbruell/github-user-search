import { Star, StarBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFavoriteUsers } from "../context/FavoriteUsersContext";

export type FavoriteButtonProps = {
    id: number;
};

export function FavoriteButton(props: FavoriteButtonProps) {
    const { id } = props;

    const [isFavorite, add, remove] = useFavoriteUsers();

    function onFavoriteBtnClick() {
        isFavorite(id) ? remove(id) : add(id);
    }

    return (
        <IconButton onClick={onFavoriteBtnClick}>
            {isFavorite(id) ? <Star /> : <StarBorder />}
        </IconButton>
    );
}
