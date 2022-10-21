import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import axios from 'axios'

//Style
import '../styles/home.css';

// Components
import List from '../components/List';

const Home = () => {
    // stock the whole data
    const [posts, setPosts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    // data corresponding to the filtered categories
    const [filteredPosts, setFilteredPosts] = useState([])

    // index of the first item displayed
    const [start, setStart] = useState(0);
    // index of the last item displayed
    const [end, setEnd] = useState(5);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        axios.get("/api/posts")
            .then((posts) => {
                let existingCategories = [];
                setPosts(posts.data.posts);
                setFilteredPosts(posts.data.posts);
                setIsMounted(true);
                // retrieve every existing categories in the API
                posts.data.posts.forEach(post => {
                    post.categories.forEach(category => {
                        if (!existingCategories.includes(category.name)) {
                            existingCategories.push(category.name);
                            categories.push({ value: category.name, label: category.name });
                        }
                    });
                });
            })
    }, [])

    // triggered when the user is changing the filter
    useEffect(() => {
        if (filteredCategories.length > 0) {
            filteringPosts();
        } else if (filteredCategories.length === 0) {
            setFilteredPosts(posts);
        }
    }, [filteredCategories]);

    // method to filter the posts by their category(ies)
    const filteringPosts = () => {
        let filtered = [];
        for (let post of posts) {
            for (let category of post.categories) {
                for (let filteredCategory of filteredCategories) {
                    if (filteredCategory.value === category.name) {
                        if (!filtered.includes(post)) {
                            filtered.push(post);
                        }
                    }
                }
            }
        }
        setFilteredPosts(filtered);
    };


    // methods used to change page
    // by incrementing or decrementing the starting and ending index
    const pageUp = () => {
        setStart(start + 5);
        setEnd(end + 5);
    }

    const pageDown = () => {
        setStart(start - 5);
        setEnd(end - 5);
    }

    return (
        (isMounted &&
            <div className='body'>
                <h1 className='title'> Welcome </h1>

                {/* select for filtering by categories */}
                <Select
                    options={categories}
                    placeholder="Filter by categories..."
                    onChange={setFilteredCategories}
                    noOptionsMessage={() => 'No results'}
                    isSearchable
                    isMulti
                    autoFocus
                />

                <List posts={filteredPosts} start={start} end={end} />

                <div className='pagination'>
                    <button className='page-button' onClick={() => pageDown()} disabled={start <= 0} >
                        {"<"}
                    </button>


                    {end / 5}

                    <button className='page-button' onClick={() => pageUp()} disabled={end >= filteredPosts.length} >
                        {">"}
                    </button>

                </div>
            </div>
        )
    );
};

export default Home;