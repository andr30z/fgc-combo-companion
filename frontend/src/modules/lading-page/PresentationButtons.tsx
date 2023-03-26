"use client";
import { AppLogo } from "@/common/components/AppLogo";
import { ButtonProps, Button } from "@/common/components/Button";
import Image from "next/image";
import type { FC } from "react";
import { BiTransfer } from "react-icons/bi";

interface PresentationProps extends Omit<ButtonProps, "onClick"> {}

export const PresentationButtons: FC<PresentationProps> = () => {
  return (
    <div className="z-10 flex items-center justify-center flex-wrap gap-3">
      <Button
        onClick={() => null}
        text="Translate Combos"
        extraStyles="flex-auto"
        rightIcon={<BiTransfer size={23} />}
      />
      <Button
        onClick={() => null}
        text="Create Combos"
        color="light"
        useHoverStyles={false}
        extraStyles="group/combo flex-auto"
        rightIcon={
          <Image
            priority
            className="group-hover/combo:scale-125 group-hover/combo:transition-all group-hover/combo:duration-300 group-hover/combo:ease-in-out"
            alt="FGC Combo"
            src="/combo-fist.svg"
            height={23}
            width={23}
          />
        }
      />
    </div>
  );
};
