import React, { useState, useEffect} from 'react';

// Material UI Themes
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// My Blog Components
import Header from '../components/Header';
import Main from '../components/Main';
// import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
// import post1 from '../post1.md';

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Travel', url: '#' },
  ];

// const posts = [post1];

const theme = createTheme();

export default function CreateBlog() {

    const [post, setPost] = useState('');

    useEffect(() => {
        import('../post1.md')
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

    // useEffect(() => {
    //     const getRecentBlogs = async () => {
    //       const blogRef = collection(db, "blogs");
    //       const recentBlogs = query(
    //         blogRef,
    //         orderBy("timestamp", "desc"),
    //         limit(5)
    //       );
    //       const docSnapshot = await getDocs(recentBlogs);
    //       setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    //     };
    
    //     getRecentBlogs();
    // }, []);

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container>
                <Header title="The Anonymous American" sections={sections} />
                <main>
                    <Grid container spacing={5} sx={{ mt: 2 }}>
                        <Main title="#From the firehose" posts={post} />
                        {/* <Sidebar
                        title={sidebar.title}
                        description={sidebar.description}
                        archives={sidebar.archives}
                        /> */}
                    </Grid>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}
