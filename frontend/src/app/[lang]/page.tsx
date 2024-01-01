// import composables
import { useState, useEffect, useCallback } from "react";

// import utils
import { fetchAPI } from "./utils/fetch-api";

// import components
import Loader from "./components/Loader";
import PageHeader from "./components/PageHeader";
import ArticleList from "./components/ArticleList";

// import types
import { type Article } from "@/types";

/**
 * TODO: generate from API codegen with transformer interfaces
 */
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

/**
 * @description This code sets up a Next.js page that will fetch a list of all the articles
 * from the Strapi API /articlesendpoint and renders them in a neat blog-like format.
 * It includes pagination for loading more posts when the Load more posts button is clicked.
 */
export default function Page() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [articles, setArticles] = useState<Article[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      if (start === 0) {
        setArticles(responseData.data);
      } else {
        setArticles((prevData) => [...(prevData || []), ...responseData.data]);
      }

      setMeta(responseData.meta);

      return responseData;
    } catch (error) {
      console.error(error);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader heading="Our Blog" text="Checkout Something Cool" />
      <ArticleList data={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more posts...
            </button>
          </div>
        )}
      </ArticleList>
    </div>
  );
}
