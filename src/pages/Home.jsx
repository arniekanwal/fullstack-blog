// Material UI Themes
import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// My Blog Components
import Header from '../components/Header';
import FeaturedPost from '../components/FeaturedPost';
import OtherPosts from '../components/OtherPosts';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

// Firebase Imports
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(
        blogRef,
        orderBy('postDate', 'desc'),
        limit(3)
      );
      const snapshot = await getDocs(recentBlogs);
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, title: doc.title, ...doc.data() })));
      setLoading(false);
    };

    getRecentBlogs();
  }, []);

  const sections = [
    { title: 'Technology' },
    { title: 'Business' },
    { title: 'Politics' },
    { title: 'Opinion' },
    { title: 'Science' },
    { title: 'Travel' },
    { title: 'Literature' },
  ];

  const mainFeaturedPost = {
    title: posts[0]?.title,
    description: posts[0]?.description,
    image: posts[0]?.imgUrl,
    imageText: 'null',
    linkText: 'Continue reading…',
    id: posts[0]?.id,
  };

  const featuredPosts = [
    {
      title: posts[1]?.title,
      date: posts[1]?.postDate.toDate().toDateString(),
      description: posts[1]?.description,
      image: posts[1]?.imgUrl,
      imageLabel: 'null',
      id: posts[1]?.id,
    },
    {
      title: posts[2]?.title,
      date: posts[2]?.postDate.toDate().toDateString(),
      description: posts[2]?.description,
      image: posts[2]?.imgUrl,
      imageLabel: 'null',
      id: posts[2]?.id,
    },
  ];

  const sidebar = {
    title: 'About',
    description:
    'Welcome to the Anonymous American, a personal blog covering all topics from current events to technology and more. This blog is an experiment for fullstack web development, learning popular frameworks like React, and discovering the power of cloud solutions like Firebase.',
    archives: [
      { title: 'Not Available', url: '#'},
    ]
  };

  const theme = createTheme();

  if (loading) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header title="The Anonymous American" sections={sections} />
        <main>
          <FeaturedPost post={mainFeaturedPost}/>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <OtherPosts key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
          </Grid>
        </main>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}
