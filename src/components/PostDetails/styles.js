import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  message: {
    display: 'block',
    'text-overflow': 'ellipsis',
    'word-wrap': 'break-word',
    overflow: 'hidden',
    'max-height': '3.6em',
    'line-height': '1.2em',
    fontSize: '12px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      with: '100%',
    },
  },
  // recommendedPosts: {
  //   display: 'flex',
  //   [theme.breakpoints.down('sm')]: {
  //     flexDirection: 'column',
  //   },
  // },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '80vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  recommendedPosts: {
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f2f5',
    },
  },
}));
