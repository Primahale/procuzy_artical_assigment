import React from 'react';

const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[\w\d-]*)*\/?$/;

const ArticleList = ({ articles }) => {
  const validatedArticles = articles.map(article => ({
    ...article,
    url: urlRegex.test(article.url) ? article.url : '#',
  // console.log(articles)
  return (
    <ul>
      {validatedArticles.map((article, index) => (
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
