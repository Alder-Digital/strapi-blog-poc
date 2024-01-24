import PageHeader from "../components/PageHeader";
import { fetchAPI } from "../utils/fetch-api";
import ArticleList from "../components/ArticleList";
import { Locale } from "../../../../i18n-config";

/**
 * fetch articles by a given category.
 */
async function fetchArticlesByCategory({
  category,
  locale,
}: {
  category: string;
  locale: Locale;
}) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = "/articles";

    const urlParamsObject = {
      sort: {
        createdAt: "desc",
      },
      filters: {
        category: {
          slug: category,
        },
      },
      locale,
      populate: {
        cover: {
          fields: ["url"],
        },
        category: {
          populate: "*",
        },
        authorsBio: {
          populate: "*",
        },
      },
    };

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (e) {
    console.error(e);
  }
}

/**
 * We don't know the category name in advance.
 * This page is generated using Next's "Dynamic Segment" (i.e. [category]) on runtime.
 * Next automatically passes the dynamic segment's value as a prop inside the params object.
 *
 * the page calls fetchArticlesByCategory() to fetch articles based on the category param.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 *
 * @example params.category = "general"
 */
export default async function CategoryRoute({
  params,
}: {
  params: { category: string; locale: Locale };
}) {
  const filter = params.category;
  const { data } = await fetchArticlesByCategory(params);

  if (data.length === 0) {
    return (
      <div className="container">
        <PageHeader heading="No articles found" />
      </div>
    );
  }

  const { name, description } = data[0]?.attributes.category.data.attributes;

  return (
    <div>
      <PageHeader heading={name} text={description} />
      <ArticleList articles={data} />
    </div>
  );
}

/**
 * generates static paths based on dynamic routes. In this case, it returns an empty array.
 */
export async function generateStaticParams() {
  return [];
}
