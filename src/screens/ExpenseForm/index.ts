import { connect } from 'react-redux';

import component from './component';
import { StoreState } from '../../types/store';
import { addItem, updateItem, removeItem } from '../../store/actions/items';
import { Item } from '../../types';

// don't know which react navigation typing this is, but it has params
interface Nav {
  params: {
    id?: string;
  };
}

const mapStateToProps = (state: StoreState, { params }: Nav) => {
  const id = params && params.id;

  return {
    isNew: !id,
    item: state.current.item,
    selectedMonths: state.current.months,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    create: (item: Item) => dispatch(addItem(item)),
    update: (item: Item) => dispatch(updateItem(item)),
    remove: (id: string) => dispatch(removeItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
