import {useSelector} from 'react-redux';
import {GlobalState} from '../../store/reducers';

const useGlobalState = <T>(selector: (state: GlobalState) => T) => {
  return useSelector<GlobalState, T>(selector);
};

export default useGlobalState;
