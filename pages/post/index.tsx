import * as React from 'react';
import withSentry from 'components/withSentry';

class Post extends React.Component<{ url: { [propsName: string]: any } }, {}> {
  render () {
    console.log(this.props.url.asPath);
    return (
      <div>{this.props.url.asPath}</div>
    );
  }
}

export default withSentry(Post);