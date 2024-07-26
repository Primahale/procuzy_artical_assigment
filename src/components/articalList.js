import React from 'react';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const ArticleList = ({ articles }) => {
  const processedArticles = articles.map(article => ({
    ...article,
    date: dateRegex.test(article.date) ? article.date : 'Invalid date',
  }));

  
  // console.log(articles)
  return (
    <ul>
      {processedArticles.map((article, index) => (
        <li key={index}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h2>{article.title}</h2>
            <p>Author : {article.author}</p>
            <p>Date: {article.date}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
