import React from 'react';

// Style
import '../styles/post.css';

import calendarLogo from '../assets/icon/calendar.svg'

const Item = (props) => {
    const post = props.post;

    // method used to format the list of categories
    const formatCat = () => {
        let categories = "";
        for (let category of post.categories) {
            categories += category.name + ", ";
        }
        return categories.slice(0, categories.length - 2);
    }

    return (
        <table className='item-body'>
            <tbody>
                <tr>
                    <td className='author'>
                        <img className='author-icon' src={post.author.avatar} alt={post.author.name + ' avatar'}></img>
                        <div className='author-name'> {post.author.name} </div>
                    </td>

                    <td className='post-infos'>
                        <div> <b>Title</b> : {post.title} </div>
                        <div> <b>Summary</b> : {post.summary} </div>
                    </td>

                    <td className='post-infos2'>
                        <div>
                            <img src={calendarLogo} alt='calendarLogo' className='calendarLogo' height='18px' width='18px'></img>
                            {/* formatting the date */}
                            {new Date(post.publishDate).toLocaleDateString('en-US')}
                        </div>
                        <div> <b>Categories</b> : {formatCat()} </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Item;