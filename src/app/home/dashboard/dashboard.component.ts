import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../../user-model';
import { SecureAadhaarApiService } from '../../services/secure-aadhaar-api.service';

export interface RequestAccessTransacation {
  from: string;
  to: string;
}

export interface ActedAccessTransaction {
  reqTxnId: string;
  from: string;
  to: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  received: RequestAccessTransacation[];
  isIdentityAssigned = false;
  user: User;
  userId: String;
  constructor(private api: SecureAadhaarApiService, private el: ElementRef) { }

  viewMyAadhaar() {

  }
  setupUser() {
    this.api.getWallets().subscribe(wallet => {
      if (wallet.length < 0) {

      } else {
        this.api.getCurrentParticipant().subscribe(identity => {
          this.userId = identity.participant;
          this.api.getUser(this.userId).subscribe(user => {
            this.user = user;

            this.setupTransactions();
          });
        });
      }
    });
  }

  setupTransactions() {
    
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#card');
    const fileCount = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0));
      this.api.addWallet(formData).subscribe(res => {
        if (res) {
          this.setupUser();
          this.isIdentityAssigned = true;
        } else {
          console.log('Could not add card');
        }
      });
    }
  }

  ngOnInit() {
    if (this.isIdentityAssigned) {
      this.setupUser();
    }
  }

}
