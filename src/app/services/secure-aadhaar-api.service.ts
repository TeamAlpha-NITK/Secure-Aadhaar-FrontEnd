import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SecureAadhaarApiService {

  COMPOSER_API_BASE_URL = 'https://52.226.34.85:3000/api';
  EXPRESS_API_BASE_URL = 'http://52.226.34.85:4000/';

  constructor(private http: Http) { }

  issueAadhaarRequest(jsonData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.EXPRESS_API_BASE_URL}`,
      JSON.stringify(jsonData),
      { headers: headers })
      .map(res => res.json());
  }

  getCurrentParticipant() {
    const headers = new Headers();
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`${this.COMPOSER_API_BASE_URL}/system/ping`, { headers: headers, withCredentials: true })
      .map(res => res.json());
  }

  getWallets() {
    const headers = new Headers();
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.COMPOSER_API_BASE_URL}/wallet`,
      { headers: headers, withCredentials: true })
      .map(res => res.json());
  }

  addWallet(formData, name) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    // console.log(formData);
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/wallet/import?name=${name}`, formData, 
    {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  getAccessHistory(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.get(`${this.COMPOSER_API_BASE_URL}/AccessHistory/${user}`, 
    {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  getUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.get(`${this.COMPOSER_API_BASE_URL}/User/${user}`,
    {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  commitRequestAccessTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/RequestAccess`, transaction, 
    {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  commitGrantAccessTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/GrantAccess`, transaction,
     {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  commitRejectAccessTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/RejectAccess`, transaction, 
    {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  commitViewAadhaarTransaction(transaction) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.post(`${this.COMPOSER_API_BASE_URL}/ViewAadhaar`, transaction,
     {headers: headers, withCredentials: true})
      .map(res => res.json());
  }

  getAllRequestedTransactions(transactions) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectRequestTransaction?txns=${transactions}`,
      {headers: headers})
        .map(res => res.json());
  }

  getAllGrantTransactions(transactions) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectGrantTransaction?txns=${transactions}`,
      {headers: headers})
        .map(res => res.json());
  }

  getAllRejectTransactions(transactions) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectRejectTransaction?txns=${transactions}`,
      {headers: headers})
        .map(res => res.json());
  }

  getUsers(users) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/queries/selectRelevantUsers?users=${users}`,
      {headers: headers, withCredentials: true})
        .map(res => res.json());
  }

  getAadhaar(aadhaarNumber) {
    const headers = new Headers();
    // headers.append('X-Access-Token', this.ACCESS_TOKEN);
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      `${this.COMPOSER_API_BASE_URL}/Aadhaar/${aadhaarNumber}`, 
      {headers: headers, withCredentials: true})
        .map(res => res.json());
  }
}
