import { atom } from "recoil"



export const GCount = atom({
    key: "count", // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
})