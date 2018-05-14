import * as React from 'react';

export default class SkeletonScreen extends React.Component {
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
          <div className="skeleton-screen_white skeleton-screen_eight"/>
          <div className="skeleton-screen_white skeleton-screen_nine"/>
          <div className="skeleton-screen_white skeleton-screen_ten"/>
          <div className="skeleton-screen_white skeleton-screen_eleven"/>
          <div className="skeleton-screen_white skeleton-screen_twelve"/>
          <div className="skeleton-screen_white skeleton-screen_thirteen"/>
        </div>
        <style jsx={true}>
          {`
            .skeleton-screen {
               display:inline-block;
               background: #fff;
               border: 1px solid;
               border-color: #e5e6e9 #dfe0e4 #d0d1d5;
               border-radius: 8px;
               padding: 12px;
               margin-right: 10px  ;
               width: 300px;
               box-sizing:border-box;
               height: 137px;
            }

            @keyframes placeHolderShimmer{
                0%{
                    background-position: -300px 0
                }
                100%{
                    background-position: 300px 0
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
            .skeleton-screen_white{
              position:absolute;
              background: #fff;
              width: 10px;
              height: 10px
            }
            .skeleton-screen_one{
              left: 45px;
              height: 45px;
            }
            .skeleton-screen_two{
              height: 5px;
              left: 45px;
              width: 230px
            }
            .skeleton-screen_three{
              left: 45px;
              top: 20px;
              width: 230px
            }
            .skeleton-screen_four{
              left: 45px;
              top: 41px;
              width: 230px
            }
            .skeleton-screen_five{
              top: 45px;
              width: 280px
            }
            .skeleton-screen_six{
              top: 66px;
              width: 280px
            }
            .skeleton-screen_seven{
              top: 86px;
              width: 280px
            }
            .skeleton-screen_eight{
              top: 106px;
              width: 280px
            }
            .skeleton-screen_nine{
              left: 250px;
              top: 30px;
              width: 30px;
              height: 13px;
            }
            .skeleton-screen_ten{
              top: 96px;
              width: 80px;
              left: 200px
            }
            .skeleton-screen_eleven{
              top:55px;
              height: 12px;
              width: 5px;
              left: 8px
            }
            .skeleton-screen_twelve{
              top:75px;
              height: 12px;
              width: 5px;
              left: 8px
            }
            .skeleton-screen_thirteen{
              top:95px;
              height: 12px;
              width: 5px;
              left: 8px
            }
          `}
        </style>
      </div>
    );
  }
}