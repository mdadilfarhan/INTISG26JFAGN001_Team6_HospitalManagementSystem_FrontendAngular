import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { SolutionsComponent } from '../../components/solutions/solutions.component';
import { BlogComponent } from '../../components/blog/blog.component';
import { HowItWorksComponent } from '../../components/working/working.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeroComponent,
        SolutionsComponent,
        BlogComponent,
        HowItWorksComponent,
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent { }