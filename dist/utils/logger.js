export function logInfo(message, ...args) {
    console.log(`[INFO]: ${message}`, ...args);
}
export function logError(message, ...args) {
    console.error(`[ERROR]: ${message}`, ...args);
}
