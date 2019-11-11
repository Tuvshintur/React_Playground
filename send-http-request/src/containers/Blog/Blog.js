import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
// import axios from '../../axios';

import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
// import NewPost from './NewPost/NewPost';

import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});


class Blog extends Component {

    state = {
        auth: false
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                            >Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                //if you want to jump of the page from read hashtag
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {!this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    {/* <Redirect from="/" to="posts" /> */}
                    <Route render={() => <h1>NOT FOUND</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;