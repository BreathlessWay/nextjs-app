import React from 'react';
import { AnyProps } from '../types/interface';

export default class Error extends React.Component<{ statusCode: number }, {}> {
  static getInitialProps ({res, err}: AnyProps) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return {statusCode};
  }

  render () {
    return (
      <section className="four-zero-four">
        <div className="text-center">
          <p className="four">
            <span/>
            <span/>
            <span/>
          </p>
        </div>
        <div className="text-center">
          <p className="zero">
            <span/>
            <span/>
            <span/>
            <span/>
          </p>
        </div>
        <div className="text-center">
          <p className="four">
            <span/>
            <span/>
            <span/>
          </p>
        </div>
        <style jsx={true} global={true}>{`
          html, body {
            height: 100%;
            background: linear-gradient(gray, silver);
          }
          .four-zero-four {
            div {
              width: 100%
            }
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap
          }

          .four-zero-four p {
            width: 10rem;
            height: 10rem;
            /*border: 1px dashed white;*/
            display: inline-block;
            position: relative;
            text-align: left
          }

          .four-zero-four p span {
            position: absolute;
            box-sizing: border-box;
            filter: opacity(0.8);
            animation-duration: 5s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            background-color: plum;
          }

          .four span:nth-child(1) {
            width: 20%;
            height: 80%;
            left: 10%;
            background-color: yellowgreen;
            animation-name: left0;
          }

          .four span:nth-child(2) {
            width: 100%;
            height: 20%;
            bottom: 30%;
            animation-name: bottom30;
            background-color: turquoise;
          }

          .four span:nth-child(3) {
            width: 20%;
            height: 100%;
            right: 10%;
            animation-name: right0;
            background-color: pink;
          }

          .zero span:nth-child(1) {
            width: 20%;
            height: 100%;
            left: 10%;
            animation-name: left0;
            background-color: skyblue;
          }

          .zero span:nth-child(2) {
            width: 100%;
            height: 20%;
            top: 10%;
            animation-name: top0;
          }

          .zero span:nth-child(3) {
            width: 20%;
            height: 100%;
            right: 10%;
            animation-name: right0;
            background-color: lightcoral;
          }

          .zero span:nth-child(4) {
            width: 100%;
            height: 20%;
            bottom: 10%;
            animation-name: bottom10;
            background-color: peachpuff;
          }

          @keyframes top0
          {
            0% {
              top: 10%;
             }
            50% {
              top: 0;
              background-color: #fff;
              filter: opacity(1);
             }
            100% {
              top: 10%;
             }
          }
          @keyframes left0
          {
            0% {
              left: 10%;
             }
            50% {
              left: 0;
              background-color: #fff;
              filter: opacity(1);
             }
            100% {
              left: 10%;
             }
          }
          @keyframes bottom10
          {
            0% {
              bottom: 10%;
             }
            50% {
              bottom: 0;
              background-color: #fff;
              filter: opacity(1);
             }
            100% {
              bottom: 10%;
             }
          }
          @keyframes bottom30
          {
            0% {
              bottom: 30%;
             }
            50% {
              bottom: 80%;
              background-color: #fff;
              filter: opacity(1);
             }
            100% {
              bottom: 30%;
             }
          }
          @keyframes right0
          {
            0% {
              right: 10%;
             }
            50% {
              right: 0;
              height: 80%;
              background-color: #fff;
              filter: opacity(1);
             }
            100% {
              right: 10%;
             }
          }
        `}</style>
      </section>
    );
  }
}
