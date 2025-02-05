import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import clsx from "clsx";
import { Spin } from "@/components/Icons";


const buttonVariants = cva("inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed", {
  variants: {
    variant: {
      default: "text-white transition-all duration-150 ease-linear outline-none bg-primary-o-600 hover:bg-primary-o-550 focus:outline-none cursor-pointer",
      secondary: "transition-all duration-150 ease-linear outline-none bg-gray-o-250 hover:bg-gray-o-150 text-black-b-300 border border-gray-p-350 font-medium focus:outline-none",
      tertiary:"text-primary-o-600 bg-white cursor-pointer border border-secondary-g-20 hover:bg-primary-o-600 hover:text-white transition-all"
    },
    size: {
      default: "text-sm px-6 md:px-9 h-10 py-2 rounded-md",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, isLoading, children, ...props }, ref) => {
  return <button className={buttonVariants({ variant, size, className })} ref={ref} type="button" {...props}><Spin className={clsx("animate-spin w-5 h-5 mr-3", !isLoading && "hidden")}/>{children}</button>;
});

Button.displayName = "Button";

export { Button };