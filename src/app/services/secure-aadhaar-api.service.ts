import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SecureAadhaarApiService {

  COMPOSER_API_BASE_URL = 'http://localhost:3000/api/';
  EXPRESS_API_BASE_URL = 'http://localhost:3000/api/';

  constructor(private http: Http) { }

  issueAadhaarRequest(jsonData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.EXPRESS_API_BASE_URL}auth/register`,
      JSON.stringify(jsonData),
      { headers: headers })
      .map(res => res.json());
  }

  getCurrentParticipant() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.EXPRESS_API_BASE_URL}/system/ping`,
      { headers: headers })
      .map(res => res.json());
  }

  getWallets() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.EXPRESS_API_BASE_URL}/wallet`,
      { headers: headers })
      .map(res => res.json());
  }

  addWallet(formData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // if (extraData) {
    //   for (const key of extraData) {
    //     // iterate and set other form data
    //     formData.append(key, extraData[key]);
    //   }
    // }
    return this.http.post(`${this.COMPOSER_API_BASE_URL}wallet`, formData, {headers: headers})
      .map(res => res.json());
  }

  getAccessHistory(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.COMPOSER_API_BASE_URL}/AccessHistory/${user}`, {headers: headers})
      .map(res => res.json());
  }

  getUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.COMPOSER_API_BASE_URL}/User/${user}`, {headers: headers})
      .map(res => res.json());
  }

  commitRequestAccessTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/RequestAccess`, transaction, {headers: headers})
      .map(res => res.json());
  }

  commitGrantAccessTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/GrantAccess`, transaction, {headers: headers})
      .map(res => res.json());
  }

  commitRejectAccessTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/RejectAccess`, transaction, {headers: headers})
      .map(res => res.json());
  }

  commitViewAadhaarTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/ViewAadhaar`, transaction, {headers: headers})
      .map(res => res.json());
  }

  getAllRequestedTransactions(transactions) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectRequestTransaction?txns=${transactions}`,
      {headers: headers})
        .map(res => res.json());
  }

  getAllGrantTransactions(transactions) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectGrantTransaction?txns=${transactions}`,
      {headers: headers})
        .map(res => res.json());
  }

  getAllRejectTransactions(transactions) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectRejectTransaction?txns=${transactions}`,
      {headers: headers})
        .map(res => res.json());
  }

  getUsers(users) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectRelevantUsers?users=${users}`,
      {headers: headers})
        .map(res => res.json());
  }

  getAadhaar(aadhaarNumber) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/Aadhaar/${aadhaarNumber}`, {headers: headers})
        .map(res => res.json());
  }
}
