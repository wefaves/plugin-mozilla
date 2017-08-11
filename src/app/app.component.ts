import {Component, OnInit} from '@angular/core';
import {HistoryService} from "./services/history.service";
import { Http } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HistoryService]
})
export class AppComponent implements OnInit {

  //public list=['batman vs superman','civil war','deadpool', 'toto'];
  public list = [];

  constructor(private http: Http) {
  }

  public open(event) {
    window.open('http://dev.my.wefaves.com.s3-website.eu-central-1.amazonaws.com/');
  }

  public settings(event) {
    window.open('http://dev.my.wefaves.com.s3-website.eu-central-1.amazonaws.com/#/account');
  }

  public desconnect(event) {
    function onFulfilled() {
        console.log(`Desconnect OK`);
    }

    function onRejected(error) {
      console.log(`An error: on Desconnect`);
    }

    browser.cookies.remove({"url": "http://prod.my.wefaves.com.s3-website.eu-central-1.amazonaws.com/#/account", "name": "currentUser"}).then(onFulfilled, onRejected);
    // browser.cookies.remove({"url": "http://prod.my.wefaves.com.s3-website.eu-central-1.amazonaws.com/#/account", "name": "currentUser"}, function(cookie) {
    // });
  }

  public  displaySearch(value) {
    let result;
    this.http.get('./search.json')
      .map(res => res.json())
      .subscribe(
        val => result = val,
        err => console.error(err),
        () =>  {
          for (let i of result) {
            if (i.title === value) {
              this.list.push(i);
            }
          }
        });
  }

  ngOnInit() {
  }
}
