import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  
  isLoading: boolean = false;
  items = [];

  constructor(private alertControl: AlertController, private dataService: DataService) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(()=>{
      this.refreshContent();
      this.isLoading = false;
    }, 4000);
  }

  refreshContent(){
    const data = this.dataService.getTasks.subscribe((data)=>{
      console.log('Data: ', data);
    });
  }

  async onClickNewTask() {
    this.alertControl
      .create({
        header: 'New Task',
        animated: true,
        translucent: true,
        inputs: [
          {
            name: 'title',
            placeholder: 'Give a title',
            type: 'text'
          },
          {
            name: 'description',
            placeholder: 'Write a description',
            type: 'textarea'
          },
          {   
            placeholder:"Deadline",
            label:"Deadline",         
            name: 'deadline',
            type: 'datetime-local',
          },
        ],

        buttons: [          
          {            
            text: 'Cancel',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Save',
            cssClass: 'alert-button-confirm',
            handler: (data) => {
              this.isLoading = true;

              console.log('Save Data: ', data);

              const task = {
                id: Math.random(),
                title: data.title,
                description: data.description,
                deadline: data.deadline,
                status: true
              };

              this.items.push(task);

              this.dataService.createNewTask(task);

              setTimeout(()=>{
                this.isLoading = false;
              }, 4000);

            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
