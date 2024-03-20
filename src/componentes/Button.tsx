import {VariantProps, cva} from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export const buttonStyles = cva(["transition-colors"], {
    variants:{
        variant:{
            default:["bg-secondary", "hover:bg-secondary-hover"],
            gost:["hover:bg-gray-100" ],
            dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"],
        },
        size:{
            default: ["rounded", "p-2"],
            icon: [ "rounded-full", "w-10", "h-10", "flex", "items-center", "justify-center", "p-2.5",],
        }
    },
    defaultVariants:{
        variant: "default",
        size:"default"
    }
})

type ButttonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

const Button = ({ variant, size,className, ...props}: ButttonProps) => {
  return (
    <div>
        <button { ...props} className={ twMerge( buttonStyles({ variant, size}),className ) } />
    </div>
  )
}

export default Button