import { useEffect, useState } from 'react';

import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

function Demo() {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticle, setAllArticle] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copied, setcopied] = useState('');

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    );

    if (articlesFromLocalStorage) {
      setAllArticle(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      let newArticle = { ...article, summary: data.summary };
      const updateAllArticles = [...allArticle];
      newArticle = isExist(updateAllArticles, newArticle);
      updateAllArticles.push(newArticle);
      setArticle(newArticle);
      setAllArticle(updateAllArticles);

      localStorage.setItem('articles', JSON.stringify(updateAllArticles));
    }
  };

  const isExist = (articles, arti) => {
    let stat = false;
    let max = 0;
    articles.forEach((x) => {
      if (x.url === arti.url && x.count) {
        max = Math.max(x.count, max);
      }
      if (x.url === arti.url) {
        stat = true;
      }
    });

    if (stat) {
      arti.count = max + 1;
    }

    return arti;
  };

  const handleCopy = (copyUrl) => {
    setcopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setcopied(false), 3000);
  };
  return (
    <section className="w-full max-w-xl mt-16">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className="relative flex items-center justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <img
            src={linkIcon}
            className="absolute left-0 w-5 my-2 ml-3"
            alt="link_icon"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <span className="text-lg">↲</span>
          </button>
        </form>
        {/* History */}
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {allArticle.map((arti, i) => {
            return (
              <div
                key={`link-${i}`}
                onClick={() => setArticle(arti)}
                className="link_card"
              >
                <div className="copy-btn" onClick={() => handleCopy(arti.url)}>
                  <img
                    src={copied === arti.url ? tick : copy}
                    alt="copy icon"
                    className="w-[80%] h-[80%] object-contain"
                  />
                </div>
                <p className="flex-1 text-sm font-medium text-blue-700 truncate font-satoshi">
                  {arti.url}
                </p>
                <p>{arti.count > 0 && `[${arti.count}]`}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Display Results */}
      <div className="flex items-center justify-center max-w-full my-10">
        {isFetching ? (
          <img src={loader} alt="loader" className="object-contain w-20 h-20" />
        ) : error ? (
          <p className="font-bold text-center text-black font-inter">
            Well, That was not suposed to happen...
            <br />
            <span className="font-normal text-gray-700 font-satoshi">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-600 font-satoshi">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="text-sm font-medium text-gray-700 font-inter">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Demo;
