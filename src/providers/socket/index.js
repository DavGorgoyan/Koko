import { Server as IoServer } from "socket.io";
import { _WRONG_PARAMS_ } from '../../helpers/err-codes.js';
import { format } from 'date-fns'
import { auth } from '../../middlewares/socketMiddlewares.js';
import { insert } from '../db/operations.js';

export const secretKey = `69shantxa69`;


const init = async (server) => {
    const io = new IoServer(server, {
        cors: {
            origin: "*",
            credentials: true
        }
    });
    const chatWithUser = io.of(`/chatWithUser`);
    const chatWithModerator = io.of(`/chatWithModerator`);
    chatWithModerator.use(auth(`user`));

    chatWithModerator.on(`connection`, (socket) => {
        const uid = socket.data?.tokenData?.uid;
        const room = `${secretKey}-${uid}`;
        socket.join(room);

        socket.on(`message`, async (data) => {
            try {
                const { message } = data;
                const payload = {
                    content: message,
                    creation_date: format(new Date(), "yyyy-MM-dd hh:mm"),
                    uid,
                    sender: `user`
                };
                const { insertId } = await insert(`chat`, payload);
                chatWithUser.emit(`message`, { id: insertId, ...payload });

            } catch (err) {
                socket.to(room).emit(`error`, _WRONG_PARAMS_);

            }
        })
    })


    chatWithUser.use(auth(`admin`));

    chatWithUser.on(`connection`, (socket) => {
        socket.on(`message`, async (data) => {
            try {
                const { message, uid } = data;
                const payload = {
                    content: message,
                    creation_date: format(new Date(), "yyyy-MM-dd hh:mm"),
                    uid,
                    sender: `admin`
                };
                const { insertId } = await insert(`chat`, payload);
                const room = `${secretKey}-${uid}`;
                chatWithModerator.to(room).emit(`message`, { id: insertId, ...payload })

            } catch (err) {
                socket.emit('error', _WRONG_PARAMS_);

            }
        })

    })
}

export default init;
