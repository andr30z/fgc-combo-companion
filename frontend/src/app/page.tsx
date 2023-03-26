import { ImGithub } from "react-icons/im";
import { AppLogo } from "@/common/components/AppLogo";
import { PresentationButtons } from "@/modules/lading-page/PresentationButtons";
import Image from "next/image";
import { Button } from "@/common/components/Button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-screen bg-dark overflow-x-hidden px-10 md:px-20">
      <header className="flex justify-between items-center py-3 h-32">
        <Image
          priority
          src="/full-logo.svg"
          height={200}
          width={200}
          alt="FGC Combo Companion logo"
          className="hidden sm:inline-flex"
        />
        <AppLogo extraStyles="inline-flex sm:hidden" />
        <div className="flex flex-row gap-2">
          <Button text="Login" color="dark" extraStyles="hover:text-primary" />
          <Button text="Sign Up" color="primary" />
        </div>
      </header>
      <div
        style={{ minHeight: 800 }}
        className="flex flex-col justify-center items-center gap-5 font-primary relative"
      >
        <h1 className="z-10 items-center flex flex-row gap-2 text-light text-2xl sm:text-5xl font-primary font-black px-10">
          Translate.
          <span className="font-primary font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create.
          </span>
          Share.
        </h1>

        <p className="z-10  text-white text-lg text-center px-10">
          Combo Companion is an open source project made for the{" "}
          <span className="font-semibold text-xl text-secondary">
            Fighting Game Community
          </span>{" "}
          to store/share knowledge over combos in various fighting games.
        </p>
        <PresentationButtons />
        <div className="rounded-full absolute self-auto inset-auto bg-secondary w-full h-1/2 sm:w-2/5 blur-3xl drop-shadow-2xl opacity-20 z-0" />
      </div>
      <footer className="w-full flex-1 flex items-end justify-center text-center pb-10">
        <span className="text-light">
          Created by{" "}
          <a
            target="_blank"
            href="https://github.com/andr30z/fgc-combo-companion"
            className="hover:text-secondary cursor-pointer text-light inline-flex items-center gap-2"
          >
            @andr30z
            <ImGithub size={25} />
          </a>
        </span>
      </footer>
    </main>
  );
}
