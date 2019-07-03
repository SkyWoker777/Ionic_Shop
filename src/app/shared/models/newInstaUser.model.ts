export class NewInstaUserModel {
    id: string;
    username: string;
    full_name: string;
    profile_picture: string;
    bio: string;
    website: string;
    is_business: boolean;
    counts: InstaCountsModel;
}

export class InstaCountsModel {
    media: number;
    follows: number;
    followed_by: number;
}