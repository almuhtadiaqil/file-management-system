export interface Directory {
    id: string | null;
    name: string | null;
    path: string;
    parent_name: string | null;
    is_directory: boolean;
    created_at: string;
    updated_at: string;
}