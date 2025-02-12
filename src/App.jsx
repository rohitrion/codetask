import React, { useState, useEffect } from "react";

const App = () => {
 
  const [post, setpost] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {

    fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
      .then((res) => res.json())
      .then((data) => {

        setpost(data);
      })
      .catch((error) => console.error("Error fetching job ID:", error));
  }, []);

  useEffect(() => {
    if (post.length > 0) {
      const fetchJobs = async () => {
  
        const start = page * pageSize;
        const end = start + pageSize;
        const jobSlice = post.slice(start, end);

        const jobData = await Promise.all(
          jobSlice.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (res) => res.json()
            )
          )
        );

        setJobs(jobData);
      };
      fetchJobs();
    }
  }, [page, post]);

  return (
    <div className="max-w-2xl mx-auto p-4">
   
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="mb-3 p-4 bg-gray-100 rounded-md shadow">
            <a
              target="_blank"
              className=" font-semibold"
            >
              {job.title}
            </a>
            <p className="text-sm text-gray-600">By: {job.by}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 0));
          }}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => {
        
            setPage((prev) => prev + 1);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={(page + 1) * pageSize >= post.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
