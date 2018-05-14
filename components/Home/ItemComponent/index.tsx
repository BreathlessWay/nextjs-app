import * as React from 'react';
import { Flex } from 'antd-mobile';

export default class Index extends React.Component<{ item: { [propsName: string]: any } }, {}> {
  render () {
    const {item} = this.props;
    return (
      <article className="index-match_item">
        <Flex justify='between' className="index-match_top">
          <section className="index-match_name">
            <span className="overflow-ellipsis">{item.matchInfo.league_name}</span>
            <span>{item.matchInfo.match_time}</span>
          </section>
          <img src={item.is_guanzhu ? require('../../static/img/icon-star.png') : require('../../static/img/icon-unstar.png')} alt="" width={20}/>
        </Flex>
        <Flex>
          <Flex.Item className="text-right index-match_team">
            <span className="overflow-ellipsis">{item.matchInfo.home_name}</span>
            <img className="vertical-middle" src={item.matchInfo.home_img} alt="" width={16}/>
          </Flex.Item>
          <section className="index-match_middle text-center">
            VS
          </section>
          <Flex.Item className="index-match_team">
            <img className="vertical-middle" src={item.matchInfo.away_img} alt="" width={16}/>
            <span className="overflow-ellipsis">{item.matchInfo.away_name}</span>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item className="text-right index-match_pl">
            {item.odds.yp.o1}
          </Flex.Item>
          <section className="index-match_middle text-center index-match_pl overflow-ellipsis">
            {item.odds.yp.o3}
          </section>
          <Flex.Item className="index-match_pl">
            {item.odds.yp.o2}
          </Flex.Item>
        </Flex>
        <Flex className="index-match_info">
          <Flex.Item className="text-center">
            <span>情报</span> <i>{item.overses.num}</i>
          </Flex.Item>
          <Flex.Item className="text-center">
            <span>培训</span> <i>{item.training.num}</i>
          </Flex.Item>
          <Flex.Item className="text-center">
            <span>推荐</span> <i>{item.box.num}</i>
          </Flex.Item>
        </Flex>
      </article>
    );
  }
}