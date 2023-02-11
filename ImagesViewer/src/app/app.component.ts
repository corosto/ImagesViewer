import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imagesLinks: string[] = [
    "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80",
    "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80",
    "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];
  percentageStorage: any;

  ngOnInit(): void {
    const track = document.getElementById("container");
    if (track) {
      window.onmouseup = () => {
        track.dataset['mouseDownAt'] = "0";
        track.dataset['prevPercentage'] = this.percentageStorage;
      }

      window.onmousedown = (res) => {
        track.dataset['mouseDownAt'] = res.clientX.toString();
      }

      window.onmousemove = (res) => {
        if (track.dataset['mouseDownAt'] === '0') return;

        const mouseDelta = parseFloat(track.dataset['mouseDownAt'] as string) - res.clientX;
        const maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * (-100);
        let nextPercentage = parseFloat(track.dataset['prevPercentage'] as string) + percentage;

        nextPercentage = Math.min(nextPercentage, 0)
        nextPercentage = Math.max(nextPercentage, -100)

        this.percentageStorage = nextPercentage.toString();

        track.animate({
          transform: `translate(${nextPercentage}%, -50%)`
        }, {
          duration: 1200, fill: "forwards"
        });

        for (const image of track.getElementsByClassName("image")) {
          image.animate({
            objectPosition: `${nextPercentage + 100}% center`
          }, {
            duration: 1200, fill: "forwards"
          });
        }
      }
    }
  }
}
