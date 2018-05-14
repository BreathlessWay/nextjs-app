import * as React from 'react';
import { Modal, Flex } from 'antd-mobile';
import Router from 'next/router';

export default class AddScreenComponent extends React.Component<{ handleClose: () => void }, {}> {

  render () {
    return (
      <Modal
        className="add-screen"
        visible={true}
        closable={true}
        maskClosable={true}
        transparent={true}
        popup={true}
        title={<h4>添加到手机主屏幕</h4>}
        onClose={() => {
          this.props.handleClose();
        }}
        footer={[
          {
            text: '点击查看详情',
            onPress: () => {
              Router.push('/addIntro');
            }
          }
        ]}
      >
        <Flex className="add-screen_intro" align="start">
          <div>
            <img src={require('../../../static/img/add-screen-1.png')} alt=""/>
          </div>
          <Flex.Item>
            1、选择页面底部的分享按钮
          </Flex.Item>
        </Flex>
        <Flex className="add-screen_intro" align="start">
          <div>
            <img src={require('../../../static/img/add-screen-2.png')} alt=""/>
          </div>
          <Flex.Item>
            2、选择添加到主屏幕
          </Flex.Item>
        </Flex>
        <Flex className="add-screen_intro" align="start">
          <div>
            <img src={require('../../../static/img/add-screen-3.png')} alt=""/>
          </div>
          <Flex.Item>
            3、选择添加
          </Flex.Item>
        </Flex>
        <Flex className="add-screen_intro" align="start">
          <div>
            <img src={require('../../../static/img/add-screen-4.png')} alt=""/>
          </div>
          <Flex.Item>
            <Flex align="start">
              <span>4、</span>
              <Flex.Item>以后每次使用桌面打开足球魔方lite版</Flex.Item>
            </Flex>
          </Flex.Item>
        </Flex>
        <style jsx={true} global={true}>{`
        @import "../../../style/var";

        .add-screen {
          width: 80%;
          max-width: $max-width * 0.8;
          margin: auto;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          .am-modal-content {
            overflow: visible;
            padding-top: 0;
            .am-modal-close {
              top: -12px;
              right: -12px;
              width: 28px;
              height: 28Px;
            }
            .am-modal-close-x {
              width: 28px;
              height: 28Px;
              background: url("/static/img/add-screen-close.png") no-repeat center / cover;
            }
            .am-modal-header {
              border-radius: 7px 7px 0 0;
            }
          }
          .am-modal-header {
            padding: 22px 0;
            background: $bgColorE8;
            h4 {
              font-size: 17px;
              color: #333;
            }
          }
          .am-modal-footer {
            background: $bgColorE8;
            border-radius: 0 0 7px 7px;
            .am-modal-button {
              font-size: $font-size + 1;
              color: $link-color;
            }
          }
          .am-modal-content .am-modal-body {
            padding: 26px;
          }
          .add-screen_intro {
            font-size: $font-size;
            color: $color-3;
            & ~ .add-screen_intro {
              margin-top: 13px;
            }
            img {
              width: 30px;
              height: 30Px;
              margin-right: $font-size;
            }
          }
        }
        `}</style>
      </Modal>
    );
  }
}