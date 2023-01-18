import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

// Material UI Themes
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// JSX Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const theme = createTheme();

export default function Tag() {

    const [posts, setPosts] = useState('');
    const [loading, setLoading] = useState(true);

    let { tagname } = useParams();

    useEffect(() => {
        const getRecentBlogs = async () => {
          const blogRef = collection(db, "blogs");
          const recentBlogs = query(
            blogRef,
            where("category", "array-contains", tagname)
          );
          const snapshot = await getDocs(recentBlogs);
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, title: doc.title, ...doc.data() })));
          setLoading(false);
        };
    
        getRecentBlogs();
      }, [tagname]);

    const sections = [
        { title: 'Technology' },
        { title: 'Business' },
        { title: 'Politics' },
        { title: 'Opinion' },
        { title: 'Science' },
        { title: 'Travel' },
        { title: 'Literature' },
    ];

    const sidebar = {
        title: tagname.toUpperCase(),
        description:
        `Explore blogs tagged with "${tagname}". Search for relevant posts catered to your interests.`,
    };

    if (loading) {
        return <Spinner />;
    }

    if (!loading && posts.length !== 0) {
        sidebar['archives'] = posts.map(( {title, id }) => ({title: title, url: id}))
    } else {
        sidebar["archives"] = [ { title: 'Not Available', url: '#'} ]
    }
        
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container>
                <Header title="The Anonymous American" sections={sections} />
                <main>                
                    <Grid container spacing={5} sx={{ mt: 2 }}>
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
