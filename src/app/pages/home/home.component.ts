import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { SolutionsComponent } from '../../components/solutions/solutions.component';
import { DoctorsComponent } from '../../components/doctor/doctor.component';
import { HowItWorksComponent } from '../../components/working/working.component';
import { BlogComponent } from '../../components/blog/blog.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeroComponent,
        SolutionsComponent,
        DoctorsComponent,
        HowItWorksComponent,
        BlogComponent,

    ],
    templateUrl: './home.component.html'
})
export class HomeComponent { }