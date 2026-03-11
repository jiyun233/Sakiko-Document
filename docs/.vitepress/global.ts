const isDebugMode = false

export const baseURL = isDebugMode ? 'https://localhost:9527' : 'https://api.sakiko.moeneko.cc'
export const redirectUri = isDebugMode ? 'https://localhost:5173/auth' : 'https://sakiko.moeneko.cc/auth'