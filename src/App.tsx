import { Sidebar } from "./Components/Sidebar";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen pt-10 w-full">
        <Sidebar />
      </div>
    </AuthContextProvider>
  );
}