import axiosAPI from "axios";
import { HOST_NAME } from "../../config/HOST";

async function axios(option) {
    try {
        let { data, status, statusText } = await axiosAPI({
            ...option,
            url: HOST_NAME + option.url,
        });

        return {
            data,
            status,
            statusText,
            ok: statusText === "OK",
        };
    } catch (error) {
        console.log(error);
        return {
            status: 404,
            statusText: "Exception",
            ok: false,
        };
    }
}

function download({ url }) {
    try {
        let a = document.createElement("a");
        a.download = true;
        a.href = `${HOST_NAME}${url}`;
        a.click();
    } catch (error) {
        console.log(error);
    }
}

export { axios, download };
