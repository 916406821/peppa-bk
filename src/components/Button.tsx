import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
}

export default function Button({ className = '', children, ...props }: ButtonProps) {
    return (
        <button
            className={`rounded-lg p-2 transition-colors duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
