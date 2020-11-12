export interface IUser  {
    name: string;
    login: string;
    email: string;
    password: number;
    created_at: string;
    update_at: string;
    new_element?: boolean;
    admin: boolean;
    id: number;
    can_view_users?: number;
    can_edit_users?: number;
    can_delete_users?: number;
    can_view_details?: number;
    can_view_details_full?: number;
    can_edit_users_full?: number;

}
