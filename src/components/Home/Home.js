import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { fetchPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
} // this allow use it as a hook
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1; //Read url and see if we have a page parameter in there
  // const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // Search post
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch logic -> fetch search Posts
      dispatch(fetchPostsBySearch({ search, tags: tags.join(',') })); // ['europe', 'usa'] -> "europe,usa"
      history.push(`/posts/search/?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent='space-between' spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                size='small'
                name='search'
                variant='outlined'
                label='Search Memories'
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                className={classes.customChipInput}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search tags'
                variant='outlined'
                size='small'
              />
              <Button size='small' onClick={searchPost} color='primary' className={classes.searchButton} variant='contained'>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} page={page} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
