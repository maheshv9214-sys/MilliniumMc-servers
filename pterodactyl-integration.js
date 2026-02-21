class PterodactylIntegration {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async request(endpoint, method = 'GET', body = null) {
        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${this.apiUrl}${endpoint}`, options);
        return response.json();
    }

    async getServerStatus(serverId) {
        return await this.request(`/servers/${serverId}/status`);
    }

    async startServer(serverId) {
        return await this.request(`/servers/${serverId}/power`, 'POST', { action: 'start' });
    }

    async stopServer(serverId) {
        return await this.request(`/servers/${serverId}/power`, 'POST', { action: 'stop' });
    }

    async restartServer(serverId) {
        return await this.request(`/servers/${serverId}/power`, 'POST', { action: 'restart' });
    }

    async sendCommand(serverId, command) {
        return await this.request(`/servers/${serverId}/command`, 'POST', { command });
    }
}

// Usage example
// const pterodactyl = new PterodactylIntegration('https://panel.example.com/api', 'your_api_key');
// pterodactyl.startServer('server_id');