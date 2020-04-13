import axios from "axios";

export const changeLocation = (key, charId, floor, room) => {
    return axios.patch(`/api/rooms/${key}/${charId}/${floor}/${room}`);
};

export const updateDatabase = (data) => {
    return axios.patch(`/api/rooms`, data);
}