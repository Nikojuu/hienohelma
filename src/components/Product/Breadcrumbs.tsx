import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { CategoryReference } from "@putiikkipalvelu/storefront-sdk";

interface BreadcrumbsProps {
  categories: CategoryReference[];
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categories,
  productName,
}) => {
  const getCombinedCategoryPath = (
    categories: CategoryReference[]
  ): CategoryReference[] => {
    const categoryMap = new Map(categories.map((c) => [c.id, c]));
    const path: CategoryReference[] = [];

    for (const category of categories) {
      const categoryPath: CategoryReference[] = [];
      let currentCategory: CategoryReference | undefined = category;

      while (currentCategory) {
        categoryPath.unshift(currentCategory);
        currentCategory = currentCategory.parentId
          ? categoryMap.get(currentCategory.parentId)
          : undefined;
      }

      for (const cat of categoryPath) {
        if (!path.some((c) => c.id === cat.id)) {
          path.push(cat);
        }
      }
    }

    return path;
  };

  const combinedPath = getCombinedCategoryPath(categories);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm font-secondary">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-stone hover:text-blush transition-colors duration-300"
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-stone/50 mx-1" />
        </li>
        <li className="flex items-center">
          <Link
            href="/products"
            className="text-stone hover:text-blush transition-colors duration-300"
          >
            Tuotteet
          </Link>
          <ChevronRight className="w-4 h-4 text-stone/50 mx-1" />
        </li>
        {combinedPath.map((category, index) => (
          <li key={category.id} className="flex items-center">
            <Link
              href={`/products/${combinedPath
                .slice(0, index + 1)
                .map((c) => c.slug)
                .join("/")}`}
              className="text-stone hover:text-blush transition-colors duration-300"
            >
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-stone/50 mx-1" />
          </li>
        ))}
        <li className="flex items-center">
          <span className="text-midnight font-medium truncate max-w-[200px]">
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
