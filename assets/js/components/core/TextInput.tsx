import { SetData } from "@/types/SetData";
import { ChangeEvent, useEffect, useState } from "react";
import { capitalize } from "@/utils/capitalize";

type TextInputProps<T> = {
    className?: string;
    label?: string;
    placeholder?: string;
    name: keyof T;
    data: T;
    setData: SetData<T>;
    password?: boolean;
    error?: string;
};

const TextInput = <T,>({
    className,
    label,
    placeholder = "",
    name,
    data,
    setData,
    password,
    error,
}: TextInputProps<T>) => {
    const [classes, setClasses] = useState<string>("text-input");
    const [showError, setShowError] = useState<boolean>(error ? true : false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData(name, e.target.value);
        setShowError(false);
    };

    useEffect(() => {
        setShowError(error ? true : false);
    }, [error]);

    useEffect(() => {
        let newClasses = "text-input";

        if (showError) {
            newClasses += " text-input--error";
        }

        if (className) {
            newClasses += ` ${className}`;
        }

        setClasses(newClasses);
    }, [showError, className]);

    const getErrorString = () => {
        let formated_name = "";
        const split = (name as string).split("_");

        split.forEach((str) => {
            formated_name += `${capitalize(str)} `;
        });

        return `${formated_name}${error}`;
    };

    return (
        <div className={classes}>
            {label && <label>{label}</label>}
            <input
                type={password ? "password" : "text"}
                placeholder={placeholder}
                onChange={handleChange}
                value={data[name] as string}
            />
            {showError && <p>{getErrorString()}</p>}
        </div>
    );
};

export default TextInput;
