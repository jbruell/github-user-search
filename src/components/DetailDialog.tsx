import { AccountCircle, Link as LinkIcon } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
    DialogContent
} from "@mui/material";
import { User } from "../api";
import { FavoriteButton } from "./FavoriteButton";

export type DetailDialogProps = {
    open: boolean;
    onBackgroundClick: () => void;
    user: User;
};

export function DetailDialog(props: DetailDialogProps) {
    const {
        open,
        onBackgroundClick,
        user: { id, login, avatar_url }
    } = props;

    const profile_url = `https://github.com/${login}`;

    return (
        <Dialog open={open} onBackdropClick={onBackgroundClick}>
            <DialogTitle>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box sx={{ flex: 1 }}>Details</Box>
                    <FavoriteButton id={id} />
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: "2rem"
                    }}
                >
                    <Avatar
                        src={avatar_url}
                        alt={login}
                        sx={{
                            width: "6rem",
                            height: "6rem"
                        }}
                    />
                </Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary={login} />
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Link
                                    href={profile_url}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {profile_url}
                                </Link>
                            }
                        />
                    </ListItem>
                    <Divider />
                </List>
            </DialogContent>
        </Dialog>
    );
}
