"use-client"
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["400", "500", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export function LoadDefaultFonts() {
  return (
    <style jsx global>
      {`
        :root {
          --roboto-font: ${roboto.style.fontFamily};
        }
      `}
    </style>
  );
}
