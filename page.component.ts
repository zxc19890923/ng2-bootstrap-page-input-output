import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
  selector: "page",
  templateUrl: "../templates/page.component.html"
})
export class PageComponent {
  maxSize:number;
  bigCurrentPage:number;
  numPages:number;

  // 父组件传递过来的变量
  @Input()
  bigTotalItems:number = 0; // 父组件传递过来的条目总数

  // 发送给父组件的变量(1)
  @Output()
  currentPage = new EventEmitter();

  constructor() {
    this.maxSize = 5; // 最多显示页数,其余显示...
    // this.bigTotalItems = 200; // 总条目数
    console.log(this.bigTotalItems);
    this.bigCurrentPage = 1; // 刚加载初始化页
    this.numPages = 0; // 总分页数

  }

  public pageChanged(event) {
    // 将当前页传递给父组件(2)
    this.currentPage.emit(event.page);

    console.log('当前页: ' + event.page);
    console.log('每页显示条目: ' + event.itemsPerPage);
  }
}
