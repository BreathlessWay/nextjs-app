import * as React from 'react';

export default class Loading extends React.Component {
  render () {
    return (
      <div className="skeleton-screen">
        <div className="skeleton-screen_animated">
          <div className="skeleton-screen_white skeleton-screen_one"/>
          <div className="skeleton-screen_white skeleton-screen_two"/>
          <div className="skeleton-screen_white skeleton-screen_three"/>
          <div className="skeleton-screen_white skeleton-screen_four"/>
          <div className="skeleton-screen_white skeleton-screen_five"/>
          <div className="skeleton-screen_white skeleton-screen_six"/>
          <div className="skeleton-screen_white skeleton-screen_seven"/>
        </div>
        <style jsx={true}>
          {`
            .skeleton-screen {
              padding: 15px;
              height: 70px;
              background-color: #fff;
              border-bottom: 1Px solid #eee;
              box-sizing: content-box;
            }

            @keyframes placeHolderShimmer {
              0%{
                background-position: -300px 0;
              }
              100%{
                background-position: 300px 0;
              }
            }

            .skeleton-screen_animated {
              animation-duration: 1s;
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
              animation-name: placeHolderShimmer;
              animation-timing-function: linear;
              background: #f6f7f8;
              background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
              background-size: 800px 104px;
              height: 100%;
              position: relative;
            }

            .skeleton-screen_white {
              position: absolute;
              background: #fff;
            }

            .skeleton-screen_one {
              right: 100px;
              width: 20px;
              height: 100%;
            }

            .skeleton-screen_two {
              left: 150px;
              right: 100px;
              top: 21px;
              height: 21px;
              width: auto;
            }

            .skeleton-screen_three {
              left: 0;
              right: 100px;
              top: 42px;
              height: 14px;
              width: auto;
            }

            .skeleton-screen_four {
              left: 0;
              right: 100px;
              top: 19px;
              height: 4px;
              width: auto;
            }

            .skeleton-screen_five {
              left: 70px;
              bottom: 0;
              width: 12px;
              height: 20px;
            }

            .skeleton-screen_six {
              left: 110px;
              bottom: 0;
              width: 12px;
              height: 20px;
            }

            .skeleton-screen_seven {
              left: 160px;
              right: 100px;
              bottom: 0;
              width: auto;
              height: 20px;
            }
          `}
        </style>
      </div>
    );
  }
}
