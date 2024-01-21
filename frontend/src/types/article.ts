export interface Article {
  id: 4;
  attributes: {
    locale: "nl" | "en" | "de-CH" | "de-DE";
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data?: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}
