import { connect } from 'react-redux';

import component from './component';
import { StoreState } from '../../types/store';
import { Item } from '../../types';
import { addItem, removeItem, updateItem } from '../../store/actions/items';

const mapStateToProps = (state: StoreState) => {
  return { items: state.items };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addItem: (item: Item) => dispatch(addItem(item)),
    removeItem: (id: string) => dispatch(removeItem(id)),
    updateItem: (item: Item) => dispatch(updateItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
