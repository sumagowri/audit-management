import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './checklist/checklist.component';
import { LoginComponent } from './login/login.component';
import { SeverityComponent } from './severity/severity.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'checklist',component:ChecklistComponent},
  {path:'severity',component:SeverityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
