import React, { useEffect, useState } from 'react';
import NewsCategoryChart from './NewsCategoryChart';
import JournalistPostsChart from './JournalistPostsChart';
import useFirebaseAuthToken from '../../hook/useFirebaseAuthToken';
import { fetchData } from '../../api';
import AuthorCharts from './AuthorCharts';

const Dashboard = () => {
  const [adminName, setAdminName] = useState('Admin');
  const [newsCategoryData, setNewsCategoryData] = useState([]);
  const [journalistData, setJournalistData] = useState([]);
  const [authorCategories, setAuthorCategories] = useState([]);
  const user = useFirebaseAuthToken();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user?.token) {
        try {
          const [userData, categoriesResponse, journalistsResponse] = await Promise.all([
            fetchData(`${import.meta.env.VITE_API}/journalist/${user.uid}`, user.token),
            fetchData(`${import.meta.env.VITE_API}/news`, user.token),
            fetchData(`${import.meta.env.VITE_API}/journalist`, user.token),
          ]);

          setAdminName(userData?.name || 'Admin');
          const authorCategories = categoriesResponse.data.filter(
            news => news.authorId === user.uid
          );

          const categories = Array.isArray(categoriesResponse.data)
            ? categoriesResponse.data
            : categoriesResponse;

          const groupedData = categories.reduce((acc, news) => {
            const category = news.category;
            if (!acc[category]) {
              acc[category] = { name: category, newsCount: 0 };
            }
            acc[category].newsCount += 1;
            return acc;
          }, {});

          setNewsCategoryData(Object.values(groupedData));

          setJournalistData(journalistsResponse.data || journalistsResponse);

          setAuthorCategories(authorCategories);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      }
    };


    fetchDashboardData();
  }, [user]);

  return (
    <div>
      <h1 className='text-center mb-4'>
        Halo <b>{adminName}</b>, Selamat Datang di Dashboard Winnicode
      </h1>
      <div className='my-5 mx-auto p-4'>
        <h2 className='text-center'>Statistik Postingan</h2>
        <AuthorCharts authorCategories={authorCategories} />

      </div>
      <div className="d-flex justify-content-between mt-4">
        <div>
          <h2>Berita Berdasarkan Kategori</h2>
          <NewsCategoryChart data={newsCategoryData} />
        </div>
        <div>
          <h2>Jumlah Postingan Penulis</h2>
          <JournalistPostsChart data={journalistData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
