import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Phone, Bell, UserRound } from 'lucide-angular';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    readonly PhoneIcon = Phone;
    readonly BellIcon = Bell;
    readonly UserRoundIcon = UserRound;

    menuOpen = signal(false);
    hidden = signal(false);
    private lastScrollY = 0;

    navLinks = signal([
        { label: 'Home', path: '/', active: true },
        { label: 'Services', path: '/services', active: false },
        { label: 'Doctors', path: '/doctors', active: false },
        { label: 'Lab', path: '/lab', active: false },
        { label: 'About', path: '/about', active: false },
    ]);

    toggleMenu() {
        this.menuOpen.update(v => !v);
    }

    setActive(label: string) {
        this.navLinks.update(links =>
            links.map(link => ({ ...link, active: link.label === label }))
        );
    }

    @HostListener('window:scroll')
    onScroll() {
        const currentY = window.scrollY;

        if (currentY < 10) {
            this.hidden.set(false);
            this.lastScrollY = currentY;
            return;
        }

        if (currentY > this.lastScrollY && currentY > 80) {
            this.hidden.set(true);
        } else if (currentY < this.lastScrollY) {
            this.hidden.set(false);
        }

        this.lastScrollY = currentY;
    }
}