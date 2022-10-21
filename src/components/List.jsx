import React from 'react';
import Item from './Item';

const List = (props) => {

    return (
        <div>
            <ul>
                {props.posts
                    .slice(props.start, props.end)
                    .map((post) => (
                        <>
                            <Item post={post} />
                        </>
                    ))
                }
            </ul>
        </div>
    );
};

export default List;