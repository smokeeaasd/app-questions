import Cookies from 'js-cookie';
import React, { ReactNode, createContext, useContext } from 'react';

interface AuthContextType {
	saveToken: (token: string) => void;
	clearToken: () => void;
	getToken: () => string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const getToken = () => {
		return Cookies.get('token');
	};

	// Função para definir o token em um cookie
	const saveToken = (token: string) => {
		Cookies.set('token', token, {
			// httpOnly: true,
			// secure: true,
		});
	};

	// Função para remover o token do cookie
	const clearToken = () => {
		Cookies.remove('token');
	};

	return (
		<AuthContext.Provider
			value={{
				saveToken,
				clearToken,
				getToken
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

export { AuthProvider, useAuth };
