import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    // [theme.breakpoints.up('md')]: {
    // height: '90vh',
    // overflow: 'scroll',
    // },
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '50vh',
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
}));
