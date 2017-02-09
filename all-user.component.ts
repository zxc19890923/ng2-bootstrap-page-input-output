import {Component, OnInit} from "@angular/core";
import {HttpServer} from "../servers/http.server";
import {URLSearchParams} from "@angular/http";
@Component({
  selector: "all-user",
  templateUrl: "../templates/all-user.component.html"
})
export class AllUserComponent implements OnInit {
  allUser:Array<Object>;
  age:number;
  sex:string;
  position:string;
  address:string;
  username:string;
  message:string;

  page:number;

  // 分页总数, @input 传递给子组件
  total:number;

  constructor(public httpServer:HttpServer) {
    this.allUser = [];
    this.username = "";
    this.age = 0;
    this.sex = "";
    this.position = "";
    this.address = "";
    this.message = "";

    this.total = 0;
    this.page = 1;
  }

  initHandel() {
    var url = "http://localhost:3000/all_user";
    var params = new URLSearchParams();
    params.set("page", this.page.toString());
    params.set("callback", "JSONP_CALLBACK");
    this.httpServer.jsonpGet(url, params).subscribe(res=> {
      console.log(res);
      this.allUser = res;

      // 这里使用 limit每次返回一些信息,默认当前页码为1, 所以返回数据中,返回总页码,比较重要。
      this.total = 18;
    });
  }

  ngOnInit() {
    this.initHandel();
  }

  // 定义函数获取子组件传递过来的参数, 这个函数会在,子组件中发射事件触发的时候调用。
  pageHandel(event) {
    this.page = event;
    console.log(event);
    this.initHandel();
  }

  // 单机修改按钮的时候存储当前选择的用户
  infoClick(username, age, sex, position, address) {
    console.log(username, age, sex, position, address);
    this.age = age;
    this.sex = sex;
    this.position = position;
    this.address = address;
    this.username = username;
  }

  // 修改用户信息
  updateUser() {
    var url = "http://localhost:3000/all_user_update";
    var params = new URLSearchParams();
    params.set("callback", "JSONP_CALLBACK");
    params.set("age", this.age.toString());
    params.set("sex", this.sex);
    params.set("address", this.address);
    params.set("position", this.position);
    params.set("username", this.username);

    this.httpServer.jsonpGet(url, params).subscribe(res=> {
      console.log(res);
      if (res.affectedRows > 0) {
        this.message = "修改成功, 界面正在跳转...";
        window.location.reload();
      }
      else {
        this.message = "修改失败, 请刷新界面, 重新操作。"
      }
    });
  }

  // 单机删除用户
  deleteUser(id) {
    // 如果确定删除, 那么执行删除操作
    if (confirm("您确定删除用户吗?")) {
      console.log(id);
      var url = "http://localhost:3000/user_delete";
      var params = new URLSearchParams();
      params.set("callback", "JSONP_CALLBACK");
      params.set("id", id);
      this.httpServer.jsonpGet(url, params).subscribe(res=> {
        console.log(res);
        if (res.affectedRows > 0) {
          window.location.reload();
        }
        else {

        }
      });
    }
    else {
      console.log("如果单机取消,什么也不执行");
    }
  }
}
