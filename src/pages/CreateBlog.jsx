import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Material UI Themes
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// JSX Components
import Header from '../components/Header';
import Main from '../components/Main';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

const theme = createTheme();

export default function CreateBlog() {

    const sections = [
        { title: 'Technology' },
        { title: 'Business' },
        { title: 'Politics' },
        { title: 'Opinion' },
        { title: 'Science' },
        { title: 'Travel' },
        { title: 'Literature' },
    ];

    const [post, setPost] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [loading, setLoading] = useState(true);

    let { docId } = useParams();

    useEffect(() => {
        const getRecentBlogs = async () => {
            const blogRef = doc(db, "blogs", docId)
            const docSnap = await getDoc(blogRef);
            setPost(docSnap.data()); 
            setLoading(false);
        }

        getRecentBlogs();
    }, [docId]);

    if (loading) {
        return <Spinner />;
    }

    fetch(post?.postUrl)
        .then((response) => {
        response.text().then(function(text) {
            setMarkdown(text);
        });
    });
        

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container>
                <Header title="The Anonymous American" sections={sections} />
                <main>
                    <Grid container spacing={5} sx={{ mt: 2 }}>
                        <Main title={''} posts={markdown} />
                    </Grid>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}
