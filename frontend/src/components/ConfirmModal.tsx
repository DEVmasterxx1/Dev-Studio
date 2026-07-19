import React from "react";

type Props = {
    open: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
};

export default function ConfirmModal({ open, title = "Confirm", message, onConfirm, onCancel, confirmText = "Yes", cancelText = "Cancel" }: Props) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded p-6 max-w-md w-full">
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="mb-4 text-sm">{message}</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">{cancelText}</button>
                    <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">{confirmText}</button>
                </div>
            </div>
        </div>
    );
}
