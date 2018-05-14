declare namespace NodeJS {
  export class Process extends Process {
    // 这里描述你类的方法和属性就好了
    browser: boolean;
  }
}
declare namespace wx {
  function config (data: any): void
}