import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";

export const handleAPIDocs = (router: Router) => {
    router.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
