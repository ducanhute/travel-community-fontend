import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: '150px',
    // paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '340px',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 16px',
  },
  title: {
    padding: '0 16px',
    fontWeight: 'bold',
    display: 'block',
    'text-overflow': 'ellipsis',
    'word-wrap': 'break-word',
    overflow: 'hidden',
    'max-height': '1.2em',
    'line-height': '1.2em',
    fontSize: '14px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
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
  cardContTent: {
    paddingBottom: '5px !important',
    paddingTop: '5px !important',
  },
});
