interface User {
  id: number;
  email: string;
  fullName: string;
  avatarUrl: string;
  userName: string;
  phoneNumber: string;
}

export const useUser = (): User | null => {
  const getUserFromStorage = (): User | null => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return null;
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error("Error getting user from localStorage:", error);
      return null;
    }
  };

  return getUserFromStorage();
};
