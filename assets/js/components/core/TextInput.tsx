import { SetData } from "@/types/SetData";
import { ChangeEvent } from "react";

type TextInputProps<T> = {
    className?: string;
    label?: string;
    placeholder?: string;
    name: keyof T;
    data: T;
    setData: SetData<T>;
    password?: boolean;
};

const TextInput = <T,>({
    className = "",
    label,
    placeholder = "",
    name,
    data,
    setData,
    password,
}: TextInputProps<T>) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData(name, e.target.value);
    };

    return (
        <div className={`text-input ${className}`}>
            {label && <label>{label}</label>}
            <input
                type={password ? "password" : "text"}
                placeholder={placeholder}
                onChange={handleChange}
                value={data[name] as string}
            />
        </div>
    );
};

export default TextInput;
