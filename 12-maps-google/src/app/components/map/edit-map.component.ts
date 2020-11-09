import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-map',
  templateUrl: './edit-map.component.html',
  styleUrls: ['./edit-map.component.css']
})
export class EditMapComponent implements OnInit {

  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    console.log(data);
    this.form = formBuilder.group({
      'title': data.title,
      'desc': data.description
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveEditChanges(): void {
    this.dialogRef.close(this.form.value);
  }

}
