import { ImGithub } from "react-icons/im";
import { AppLogo } from "./components/AppLogo";
export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-dark overflow-x-hidden">
      <div className="h-5/6 flex flex-col justify-center items-center">
        <AppLogo />
        <header className="flex flex-row gap-2">
          <h1 className="text-white text-5xl font-primary font-black">
            Translate.
          </h1>
          <h1 className="text-5xl font-primary font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create.
          </h1>
          <h1 className="text-white text-5xl font-primary font-black">
            Share.
          </h1>
        </header>

        <p>Combo Companion was made for the FGC community to store knowledge</p>
        
      </div>
      <footer className="h-32 flex flex-row w-screen items-center justify-center gap-3">
        <span className="font-primary text-white font-bold text-lg">
          @andr30z
        </span>
        <ImGithub size={33} className="text-white cursor-pointer" />
      </footer>
    </main>
  );
}
