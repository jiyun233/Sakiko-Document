const isDebugMode = false

export const baseURL = isDebugMode ? 'https://localhost:9527' : 'https://sakiko.mic.run'
export const redirectUri = isDebugMode ? 'https://localhost:5173/auth' : 'https://chunithm.mic.run/auth'