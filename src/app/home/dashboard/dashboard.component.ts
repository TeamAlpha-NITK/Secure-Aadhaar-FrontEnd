import { Component, OnInit, ElementRef, SecurityContext, Inject } from '@angular/core';
import { User, Aadhaar } from '../../user-model';
import { SecureAadhaarApiService } from '../../services/secure-aadhaar-api.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  received: any[];
  sent: any[];
  sentTransactions: any[];
  receivedTransactions: any[];
  isWalletAssigned: boolean;
  loading = true;
  user: User;
  userId: String;
  accessHistory: any;
  aadhaar: any;
  constructor(private api: SecureAadhaarApiService, private el: ElementRef, private sb: MatSnackBar,
    private dialog: MatDialog, private auth: AuthService) { }

  viewMyAadhaar() {
    this.loading = true;
    this.api.getAadhaar(this.userId.slice(-4)).subscribe(res => {
      this.aadhaar = res;
      this.loading = false;
      const dialogRef = this.dialog.open(ViewAadhaarComponent, {
        width: '50%',
        data: { aadhaar: res }
      });

      // console.log(res);
    });
  }

  setupUser() {
    this.api.getCurrentParticipant().subscribe(identity => {
      this.userId = identity.participant;
      // console.log(this.userId);
      this.api.getWallets().subscribe(wallet => {
        if (wallet.length < 1) {
        } else {
          this.api.getUser(this.userId.slice(-4)).subscribe(user => {
            this.user = user;
            // console.log(this.user);
            this.setupTransactions();
          });
        }
      });
    });
  }
  grantAccess(tx) {
    this.loading = true;
    this.api.commitGrantAccessTransaction(JSON.stringify({
      from: `resource:org.alpha.secureid.User#${this.userId.slice(-4)}`,
      to: `resource:org.alpha.secureid.User#${tx.otherUserId}`,
      reqTxnId: tx.txId
    })).subscribe(res => {
      this.setupTransactions();
    });
  }

  rejectAccess(tx) {
    this.loading = true;
    this.api.commitRejectAccessTransaction(JSON.stringify({
      from: `resource:org.alpha.secureid.User#${this.userId.slice(-4)}`,
      to: `resource:org.alpha.secureid.User#${tx.otherUserId}`,
      reqTxnId: tx.txId
    })).subscribe(res => {
      // this.sb.open(JSON.stringify(res));
      this.setupTransactions();
    });
  }

  viewAadhaar(tx) {
    this.loading = true;
    this.api.commitViewAadhaarTransaction(JSON.stringify({
      from: `resource:org.alpha.secureid.User#${this.userId.slice(-4)}`,
      to: `resource:org.alpha.secureid.User#${tx.otherUserId}`
    })).subscribe(res => {
      // this.sb.open(JSON.stringify(res));
      // console.log(res);
      this.api.getAadhaar(res.to.slice(-4)).subscribe(aadhaar => {
        this.aadhaar = aadhaar;
        const dialogRef = this.dialog.open(ViewAadhaarComponent, {
          width: '50%',
          data: { aadhaar: aadhaar }
        });
        this.setupTransactions();
      });
    });
  }

  requestAadhaar() {
    this.loading = true;
    const dialogRef = this.dialog.open(RequestAadhaarComponent, {
      width: '250px',
      data: { aadhaarNo: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (result != null) {
        // console.log(result);
        this.api.commitRequestAccessTransaction(JSON.stringify({
          from: `resource:org.alpha.secureid.User#${this.userId.slice(-4)}`,
          to: `resource:org.alpha.secureid.User#${result}`
        })).subscribe(res => {
          this.setupTransactions();
        });
      }
    });
  }

  setupTransactions() {
    this.api.getAccessHistory(this.userId.slice(-4)).subscribe(as => {
      this.accessHistory = as;
      // console.log(as);
      this.receivedTransactions = as.received;
      this.sentTransactions = as.sent;
      this.loading = false;
      // as.sent.forEach(element => tsent.push({txId: element.txId, }));
      // as.received.forEach(element => trec.push(element.txId));

    });
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#card');
    const fileCount = inputEl.files.length;
    if (fileCount > 0) {
      let formData = new FormData();
      formData.set('name', 'user1@secure-aadhaar');
      formData.set('card', inputEl.files.item(0));
      // console.log(formData.get('card'));
      // console.log(inputEl.files[0]);
      this.loading = true;
      this.api.addWallet(formData, inputEl.files.item(0).name.slice(0, -5)).subscribe(res => {
        if (!res) {
          this.setupUser();
          this.isWalletAssigned = true;
          // console.log(res);
        }
      });
    }
  }

  ngOnInit() {
    // if (this.auth.isLoggedIn()) {
    //   this.setupUser();
    //   this.isIdentityAssigned = true;
    // } else {
    //   this.isIdentityAssigned = false;
    // }
    this.api.getCurrentParticipant().subscribe(res => {
      this.isWalletAssigned = true;
      this.loading = true;
      this.setupUser();
      // console.log(res);
    }, err => {
      this.isWalletAssigned = false;
      this.loading = false;
    });
  }

}

@Component({
  selector: 'app-about-dialog',
  template: `
    <h2>Request Aadhaar</h2>
    Enter aadhaar number to request access:
    <mat-form-field>
      <input matInput [(ngModel)]="data.aadhaarNo">
    </mat-form-field>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Close</button>
      <button mat-button color="primary" [mat-dialog-close]="data.aadhaarNo" cdkFocusInitial>Send Request</button>
    </div>
  `
})
export class RequestAadhaarComponent {

  constructor(
    public dialogRef: MatDialogRef<RequestAadhaarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-aadhar-view',
  template: `
    <h2>Aadhaar Details</h2>
    <div style="padding: 10px">
    <p>Name: {{ data.aadhaar.firstName }} {{ data.aadhaar.lastName }}</p>
    <p>Address: {{ data.aadhaar.address }}</p>
    <p>Gender: {{ data.aadhaar.gender }}</p>
    <p>Date of Birth: {{ data.aadhaar.dob.date }}/{{ data.aadhaar.dob.month }}/{{ data.aadhaar.dob.year }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Close</button>
    </div>
  `
})
export class ViewAadhaarComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewAadhaarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
