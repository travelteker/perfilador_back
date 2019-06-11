import { handleAPIDocs } from "./apiDocs";
import { handleCompression, handleCors, handleBodyRequestParsing, handleHelmet, handleHeadersType } from "./commons"

// Todos los middleware que queremos aplicar en el arranque de la aplicación
export default [
    handleAPIDocs,
    handleCompression,
    handleCors,
    handleBodyRequestParsing,
    handleHelmet,
    handleHeadersType
]