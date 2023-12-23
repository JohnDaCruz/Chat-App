/** @type {import('next').NextConfig} */
const headers = async () => {
    return [
        {
            // Correto:
            source: "https://server-socketio.onrender.com/", // Define para quais rotas aplicar os headers
            headers: [
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
                { key: "Access-Control-Allow-Headers", value: "Content-Type" },
            ],
        },
    ];
};

const nextConfig = {
    headers
}

module.exports = nextConfig
