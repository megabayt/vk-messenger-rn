export interface IPhotoAttachment {
  type: string;
  photo: {
    id: number;
    albumId: number;
    ownerId: number;
    sizes: ReadonlyArray<{
      type: string;
      url: string;
      width: number;
      height: number;
    }>;
    text: string;
    date: number;
    accessKey: string;
  };
}
export interface IStickerAttachment {
  type: string;
  sticker: {
    productId: number;
    stickerId: number;
    images: ReadonlyArray<{
      url: string;
      width: number;
      height: number;
    }>;
    imagesWithBackground: ReadonlyArray<{
      url: string;
      width: number;
      height: number;
    }>;
    animationUrl: string;
  };
}
export interface IWallPostAttachment {
  type: string;
  wall: {
    id: number;
    fromId: number;
    toId: number;
    date: number;
    postType: string;
    text: string;
    markedAsAds: number;
    attachments: ReadonlyArray<{
      type: string;
      doc: {
        id: number;
        ownerId: number;
        title: string;
        size: number;
        ext: string;
        url: string;
        date: number;
        type: number;
        preview: {
          photo: {
            sizes: ReadonlyArray<{
              src: string;
              width: number;
              height: number;
              type: string;
            }>;
          };
          video: {
            src: string;
            width: number;
            height: number;
            fileSize: number;
          };
        };
        accessKey: string;
      };
    }>;
    postSource: {
      type: string;
    };
    comments: {
      count: number;
      canPost: number;
      groupsCanPost: boolean;
    };
    likes: {
      count: number;
      userLikes: number;
      canLike: number;
      canPublish: number;
    };
    reposts: {
      count: number;
      userReposted: number;
    };
    views: {
      count: number;
    };
    isFavorite: boolean;
    accessKey: string;
  };
}
export type IAttachment = IPhotoAttachment
| IStickerAttachment
| IWallPostAttachment;
