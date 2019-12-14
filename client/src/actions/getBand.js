import addBand from '../actions/addBand';
import getClientProxy from '../utils/getClientProxy';

const getBand = (previous, used) => async dispatch => {
  try {
    const reply = await fetch(
      `/api/getband?previous=${previous}&used=${JSON.stringify(used)}`
    );
    let { name, imgUrl, discogsId } = await reply.json();
    let proxy;
    if (name[name.length - 1].match(/\W/)) {
      proxy = getClientProxy(name);
      let str = proxy.match(/[a-z0-9 ]/g);
      proxy = str.join('');
    } else {
      proxy = name;
    }
    setTimeout(() => {
      dispatch(addBand(name, imgUrl, discogsId, 'computer'));
      dispatch({ type: 'ADD_TO_USED', payload: name });
      dispatch({
        type: 'SET_PREVIOUS',
        payload: proxy
      });
    }, 2000);
  } catch (e) {
    console.log(e.message);
  }
};

export default getBand;
