import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks";
import "./feed.scss";

type NewsFeedProps = {};
const NewsFeed: React.FC<NewsFeedProps> = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNFLNews = async () => {
      setLoading(true);
      try {
        const response = await useAxios.get("espn/news");
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Optionally, set an error state here
      } finally {
        setLoading(false);
      }
    };

    fetchNFLNews();
  }, []);
  return (
    <div className="feed news-feed">
        <p>{loading && 'loading'}</p>
      {news.map((news) => (
        <div className="news-card">
          <p>{news.headline}</p>
          <p>{news.description}</p>
          <div className="categories">
            {news.categories.map((category: any, index: number) => {
              if (index === 0) {
                return <span className="category">{category.description}</span>;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
