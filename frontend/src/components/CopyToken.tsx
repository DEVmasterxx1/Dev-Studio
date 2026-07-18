export default function CopyToken() {
    const copy = async () => {
        const t = localStorage.getItem("token") || "";
        if (!t) return alert("No token found in localStorage");
        try {
            await navigator.clipboard.writeText(t);
            alert("Token copied to clipboard");
        } catch {
            // fallback
            prompt("Copy the token manually:", t);
        }
    };
    return (
        <button
            onClick={copy}
            className="px-3 py-1 bg-gray-700 rounded text-white hover:bg-gray-600"
            title="Copy JWT to clipboard (dev only)"
        >
            Copy Token
        </button>
    );
}

