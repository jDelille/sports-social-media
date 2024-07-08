import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks";
import { LinkIcon } from "../../icons";
import "./articleDisplay.scss";

type ArticleDisplayProps = {
    metadata: any;
};

interface ArticleData {
  og: {
    image: string;
    url: string;
    title: string;
    site_name: string;
    description: string;
  };
}
const ArticleDisplay: React.FC<ArticleDisplayProps> = ({metadata}) => {


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
      {metadata ? (
        <a href={metadata.url} target="_blank" className="article-data-container">
          <div
            className="img"
            style={{ backgroundImage: `url(${metadata.image})` }}
          ></div>
          <div className="content">
            <div className="url">
            <LinkIcon size={18} color="gray" />
            <p>www.{extractDomain(metadata.url)}</p>
            </div>
            <div className="description">
                <p>{metadata.title}</p>
                <span>{metadata.description}</span>
            </div>
          </div>
        </a>
      ) : (
        null
      )}
    </div>
  );
};

export default ArticleDisplay;
