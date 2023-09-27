import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '0 0 30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 50px',
    maxWidth: '100%',
    marginBottom: '10px',
    [theme.breakpoints.down('xs')]: {
      padding: '5px 20px',
    },
    [theme.breakpoints.down('400')]: {
      padding: '0px 10px',
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },
  image: {
    [theme.breakpoints.down('350')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    // width: '400px',
    padding: '0px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  userName: {
    display: 'flex',
    fontWeight: 'bold',
    alignItems: 'center',
    [theme.breakpoints.down('700y')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      marginRight: '30px',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    [theme.breakpoints.down('400')]: {
      fontSize: '8px',
      heading: '16px !important',
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    [theme.breakpoints.down('700')]: {
      display: 'none',
    },
  },
}));
