import { Pagination } from "./pagination";

export interface ApiResponse {
    data: any | any[] | Pagination;
    mensaje: string;
}
