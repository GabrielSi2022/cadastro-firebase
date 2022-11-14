import { useEffect } from "react";
import { firebase, auth } from "../service/firebase";
import useAuth from "../Hook/useAuth";

export function Sidebar() {
  const { user, setNewUser } = useAuth();
  console.log(user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;

        if (!displayName || !photoURL)
          throw new Error("O usuario não tem display name ou foto URL");

        setNewUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        });
      }
    });
  }, []);

  const HandleClickButtonLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { uid, displayName, photoURL } = result.user;
      if (!displayName || !photoURL)
        throw new Error("O usuario não tem display name ou photoUrl");

      setNewUser({ id: uid, avatar: photoURL, name: displayName });
    }
  };
  return (
    <div
      className="max-w-xl pt-8 mx-auto 
                      bg-gray-900
                      rounded-lg
                      overflow-hidden"
    >
      <aside>
       
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 
                            rounded-lg border-4 border-solid border-gray-600
                            outline outline-2 outline-indigo-500"
            src={
              user.avatar ? user.avatar : "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_960_720.png"
            }
          />
          <strong
            className="mt-10
                              text-indigo-500 text-2xl font-bold"
          >
            {user.name ? user.name : "Faça o seu Login ou Cadastre-se!"}
          </strong>
          <input className="w-96 p-1 mt-5 
                            rounded-lg border-2 border-solid border-indigo-500
                            placeholder:text-indigo-900 placeholder:text-xl placeholder:font-bold" 
                            type="email" name="" id="" placeholder="E-mail" />
          <input className="w-96 p-1 mt-5
                            rounded-lg border-2 border-solid border-indigo-500
                            placeholder:text-indigo-900 placeholder:text-xl placeholder:font-bold" 
                            type="password" name="" id="" placeholder="Senha" />
          <button
              className="      w-36
                               p-2
                               mt-5
                               flex items-center justify-center
                               gap-3.5
                               bg-transparent
                               text-indigo-500
                               font-bold
                               border border-solid border-indigo-500 rounded-lg
                               hover:bg-indigo-500 hover:text-white 
                               transition duration-150 ease-out hover:ease-in"
            >
              LOGIN
            </button>
            <span
            className="text-3xl font-bold
                             mt-3"
          >
            {user.id ? `ID: ${user.id}` : null}
          </span>
        </div>
        <footer
          className="border-t border-solid border-indigo-500
                             mt-10 p-5
                             flex justify-around"
        >
          {user.id.length > 0 ? (
            <button
              className="w-1/2
                             p-2
                             flex items-center justify-center
                             gap-3.5
                             text-white
                             font-bold
                             bg-indigo-500 hover:bg-transparent
                             border border-solid border-indigo-500 rounded-lg
                             transition duration-150 ease-out hover:ease-in"
              onClick={() => {
                auth.signOut();
                window.location.reload();
              }}
            >
              Deslogar
            </button>
          ) : (
            <button
              className="      w-36
                               p-2
                               flex items-center justify-center
                               gap-3.5
                               bg-transparent
                               text-indigo-500
                               font-bold
                               border border-solid border-indigo-500 rounded-lg
                               hover:bg-indigo-500 hover:text-white 
                               transition duration-150 ease-out hover:ease-in"
              onClick={() => HandleClickButtonLogin()}
            >
              LOGIN GOOGLE
            </button>
          )}

            <button
              className="      w-36
                               p-2
                               flex items-center justify-center
                               gap-3.5
                               bg-transparent
                               text-indigo-500
                               font-bold
                               border border-solid border-indigo-500 rounded-lg
                               hover:bg-indigo-500 hover:text-white 
                               transition duration-150 ease-out hover:ease-in"
            >
              CADASTRO
            </button>
        </footer>
      </aside>
    </div>
  );
}