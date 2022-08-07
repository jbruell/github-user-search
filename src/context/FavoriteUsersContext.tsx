import React, { ReactNode, useContext } from "react";
import useLocalStorage from "use-local-storage";

type MyProps = {
    children: ReactNode;
};

type FavUsersContextType = [
    (id: number) => boolean,
    (id: number) => void,
    (id: number) => void
];

export const FavUsersContext = React.createContext<FavUsersContextType>([
    () => false,
    () => {},
    () => {}
]);

export const FavUsersProvider = ({ children }: MyProps) => {
    const [localStorageState, setLocalStorageState] = useLocalStorage<{
        [key: number]: 0;
    }>("favUsers", {});

    function isFavorite(id: number) {
        return id in localStorageState;
    }
    function add(id: number) {
        setLocalStorageState({ ...localStorageState, [id]: 0 });
    }
    function remove(id: number) {
        const newState = { ...localStorageState };
        delete newState[id];
        setLocalStorageState(newState);
    }

    return (
        <FavUsersContext.Provider value={[isFavorite, add, remove]}>
            {children}
        </FavUsersContext.Provider>
    );
};

export function useFavoriteUsers(): FavUsersContextType {
    const context = useContext(FavUsersContext);
    if (context === undefined) {
        throw new Error(
            "useFavoriteUsers must be used within a RootElementProvider"
        );
    }
    return context;
}
