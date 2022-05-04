import { useSelector } from 'react-redux';
import { selectColorScheme } from '../store/colorScheme/colorSchemeSlice';

const useIsDark = () => {
  return useSelector(selectColorScheme) === 'dark';
};

export default useIsDark;
