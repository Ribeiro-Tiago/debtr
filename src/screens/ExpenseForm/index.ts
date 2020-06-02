import { connect } from 'react-redux';

import component from './component';
import { StoreState } from '../../types/store';

const mapStateToProps = (state: StoreState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Function) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
