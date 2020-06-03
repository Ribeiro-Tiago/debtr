import { connect } from 'react-redux';

import component from './component';
import { StoreState } from '../../types/store';
import { Item } from '../../types';
import { updateSelected } from '../../store/actions/current';

const mapStateToProps = (state: StoreState) => ({ items: state.items });

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrent: (item?: Item) => dispatch(updateSelected(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
