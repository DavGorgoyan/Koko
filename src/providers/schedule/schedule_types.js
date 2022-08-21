import { exec, insert, select, update } from "../db/operations.js";

const types = [
    {
        date: "0 0 * * MON",
        callback: bonuses
    }
];

async function bonuses() {
    try {
        const q = "SELECT b.uid,b.id FROM blog b " +
            "LEFT JOIN rate r " +
            "ON b.id = r.blog_id " +
            "GROUP BY b.id " +
            "ORDER BY IFNULL(SUM(r.type), 0) DESC;"

        const [sqlData, selected] = await Promise.all([exec(q), select(`bonus_trans`, ["blog_id"])]);
        const blogids = selected.map(el => el.blog_id);
        const sqlid = sqlData.map(el => el.id);


        for (let i = 0; i < sqlid.length; i++) {
            if (!blogids.includes(sqlid[i])) {
                await insert(`bonus_trans`, { blog_id: sqlid[i] });
                break;
            }
        }


    } catch (err) {
        console.error('error in shcedule');
    }
}


export default types;