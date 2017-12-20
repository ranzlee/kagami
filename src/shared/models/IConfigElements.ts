export interface IConfigElements {
    [key: string]: {                // Key is config ID
        [key: string]: string[];    // Key is ConfiguartionElementType enum string and value is string [] of ids
    }
}