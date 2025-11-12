export interface ApiResponse<T> {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: T[]; // 동적인 값 제네릭 타입 선정정
}