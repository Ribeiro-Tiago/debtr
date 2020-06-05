import { connect } from 'react-redux';

import TopBar from './component';
import { StoreState } from '../../types/store';

const mapStateToProps = (state: StoreState) => ({
  amountLeft: state.amountLeft,
});

export default connect(mapStateToProps)(TopBar);
