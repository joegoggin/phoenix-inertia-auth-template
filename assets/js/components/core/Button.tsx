import { router } from "@inertiajs/react";
import React, { ReactNode } from "react";

export enum ButtonVariant {
    PRIMARY,
    SECONDARY,
}

type ButtonProps = {
    className?: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
    children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    className,
    href,
    onClick,
    variant = ButtonVariant.PRIMARY,
    children,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        if (href) {
            router.get(href);
        }
    };

    const getClassName = () => {
        let classes = `button`;

        switch (variant) {
            case ButtonVariant.PRIMARY:
                classes += " button--primary";
                break;
            case ButtonVariant.SECONDARY:
                classes += " button--secondary";
        }

        if (className) {
            classes += ` ${className}`;
        }

        return classes;
    };

    return (
        <button className={getClassName()} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
