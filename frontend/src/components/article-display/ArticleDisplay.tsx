import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks";
import { LinkIcon } from "../../icons";
import "./articleDisplay.scss";

type ArticleDisplayProps = {};

interface ArticleData {
  og: {
    image: string;
    url: string;
    title: string;
    site_name: string;
    description: string;
  };
}
const ArticleDisplay: React.FC<ArticleDisplayProps> = () => {
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useAxios.get("/metadata");
        setArticleData(response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(articleData);

  const extractDomain = (url: string) => {
    const match = url.match(/:\/\/(www[0-9]?\.)?([^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    } else {
      return null;
    }
  };

  return (
    <div>
      {articleData ? (
        <a href={articleData.og.url} target="_blank" className="article-data-container">
          <div
            className="img"
            style={{ backgroundImage: `url(${articleData?.og.image})` }}
          ></div>
          <div className="content">
            <div className="url">
            <LinkIcon size={18} color="gray" />
            <p>www.{extractDomain(articleData.og.url)}</p>
            </div>
            <div className="description">
                <p>{articleData.og.title}</p>
                <span>{articleData.og.description}</span>
            </div>
          </div>
        </a>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArticleDisplay;
