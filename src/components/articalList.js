import React from 'react';


const ArticleList = ({ articles }) => {

  
  // console.log(articles)
  return (
    <ul>
      {articles.map((article, index) => (
        <li key={index}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h2>{article.title}</h2>
            <p>Author : {article.author}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};


export default ArticleList;
