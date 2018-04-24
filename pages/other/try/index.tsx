import * as React from 'react';
import { initStore } from 'store/store';
import './style.scss'
import withSentry from 'components/withSentry';

class Try extends React.Component {
  render () {
    console.log(initStore);
    return (
      <div className="try">球队B</div>
    );
  }
}

export default withSentry(Try)