/**
 * START 12.08.2022
 */

import app from "./server.js";
import socketInit from "./providers/socket/index.js";


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})

socketInit(server);
