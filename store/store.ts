import { action, observable, runInAction } from 'mobx';
import Timer = NodeJS.Timer;
import axios from 'libs/axios';

export interface StoreTypes {
  lastUpdate: number,
  light: boolean,
  articleList: Array<{ [propsName: string]: any }>
  start: () => void,
  stop: () => void,
  getArticleList: () => void
}

let store: StoreTypes | null = null;

class Store {
  @observable lastUpdate = 0;
  @observable light = false;
  @observable articleList = [];

  timer: Timer;

  constructor (public isServer: boolean, lastUpdate: number) {
    this.lastUpdate = lastUpdate;
  }

  @action
  start = () => {
    this.lastUpdate = Date.now();
    this.light = true;
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now();
      this.light = true;
    }, 1000);
  };

  @action
  stop = () => {
    this.light = false;
    clearInterval(this.timer);
  };

  @action
  async getArticleList () {
    try {
      const res = await axios.get('/topics', {params: {tab: '', limit: 1, page: 1}});
      runInAction(() => {
        this.articleList = res.data.data;
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function initStore (isServer: boolean, lastUpdate: number = Date.now()) {
  if (isServer) {
    return new Store(isServer, lastUpdate);
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate);
    }
    return store;
  }
}