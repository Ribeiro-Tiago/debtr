import { connect } from 'react-redux';

import component from './component';
import { StoreState } from '../../types/store';
import { Item } from '../../types';
import { updateSelected } from '../../store/actions/current';
import { removeItem } from '../../store/actions/items';
import { subtractAmount } from '../../store/actions/amountLeft';

const mapStateToProps = (state: StoreState) => ({ items: state.items });

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrent: (item?: Item) => dispatch(updateSelected(item)),
  removeItem: (id: string, amount: number) => {
    dispatch(removeItem(id));
    dispatch(subtractAmount(amount));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
