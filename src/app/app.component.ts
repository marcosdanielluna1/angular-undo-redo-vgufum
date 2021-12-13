import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {  
  dataCurrentArray: Array<any> = [];
  dataUndoArray: Array<any> = [];
  dataRedoArray: Array<any> = [];
  undoLimit: number = 5;
  showUndo:boolean = false;
  showRedo:boolean = false;

  ngOnInit(): void {
    
  }
  
  doSomething(): void {
    const elem = <HTMLInputElement>document.getElementById('something');
    if (elem.value != '' ) {
      this.dataRedoArray = [];
      this.showRedo = false;
      if (this.dataCurrentArray.length === 0) {
        this.dataCurrentArray.push(elem.value);    
      } else {
        if (this.dataUndoArray.length == this.undoLimit) {
          this.dataUndoArray.reverse().pop();
          this.dataUndoArray.reverse();
        }
        this.dataUndoArray.push(this.dataCurrentArray.pop());  
        this.dataCurrentArray.push(elem.value);
        this.showUndo = true;
      }   
    } else {
      alert('Please type something.')
    }

    elem.value = '';
    elem.focus();
  }

  clearAll(): void {
    this.dataCurrentArray = [];
    this.dataUndoArray = [];
    this.dataRedoArray = [];
    this.showUndo = false;
    this.showRedo = false;
  }

  undo(): void {
    this.showRedo = true;
    if (this.dataUndoArray.length != 0) {    
      this.dataRedoArray.push(this.dataCurrentArray.pop());  
      this.dataCurrentArray.push(this.dataUndoArray.pop());
      if (this.dataUndoArray.length == 0) {
        this.showUndo = false;
      }
    }    
  }

  redo(): void {
     if (this.dataRedoArray.length != 0) {    
      this.dataUndoArray.push(this.dataCurrentArray.pop());
      this.dataCurrentArray.push(this.dataRedoArray.pop());
      if (this.dataRedoArray.length == 0) {
        this.showRedo = false;
      }
    }

    if (this.dataUndoArray.length > 0) {
      this.showUndo = true;
    } else {
      this.showUndo = false;
    }  
  }

}
