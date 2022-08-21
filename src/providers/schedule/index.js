import { scheduleJob } from "node-schedule";
import schedule_types from "./schedule_types.js";



export default function start() {
    for (let i = 0; i < schedule_types.length; i++) {
        const element = schedule_types[i];
        element.callback(new Date());
        scheduleJob(element.date, element.callback)
    }
}