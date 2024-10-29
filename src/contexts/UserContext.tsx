import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserData } from '../lib/UserData';

interface User {
    userId: number;
    userName: string;
    phoneNumber: string;
    email: string;
    sns: string;
}

interface UserContextType {
    currentUser: User | null;
    opponentUser: User | null;
    toggleUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(
        UserData.find(user => user.userId === 0) || null
    );

    // currentUser의 userId에 따라 opponentUser 설정
    const opponentUser: User | null = currentUser?.userId === 0 
        ? UserData.find(user => user.userId === 1) || null
        : UserData.find(user => user.userId === 0) || null;

    const toggleUser = () => {
        const newUser = currentUser?.userId === 0 
            ? UserData.find(user => user.userId === 1)
            : UserData.find(user => user.userId === 0);
        if (newUser) setCurrentUser(newUser);
    };

    return (
        <UserContext.Provider value={{ currentUser, opponentUser, toggleUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("error");
    }
    return context;
};
