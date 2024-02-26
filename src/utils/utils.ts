import {ru} from "./momentLocalization";
import moment from "moment";

export const format_date_end = (value) => {
    if (!value) {
        return "Не рассчитано"
    }

    console.log(value)
    if (value == "1970-01-01") {
        return "Не удалось рассчитать"
    }

    return moment(value).locale(ru()).format("D MMMM")
}