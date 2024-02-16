export interface Pagination {
    from: number;
    to: number;
    current_page: number;
    last_page: number;
    first_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    last_page_url: string;
    path: string;
    links: any[];
    data: any | any[];
    total: number;
    per_page: number;
}