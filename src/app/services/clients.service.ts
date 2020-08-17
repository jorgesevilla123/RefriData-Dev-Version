import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Client } from "../clients";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private ClientsUrl = 'http://localhost:4200/api/clients';

  constructor(
    private http: HttpClient
  ) { }



  clientsEditForm: FormGroup = new FormGroup({
    _id: new FormControl(),
    name: new FormControl(),
    cedula: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    constantBuyer: new FormControl()

  })

  clientsForm: FormGroup = new FormGroup({
    name: new FormControl(),
    cedula: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    constantBuyer: new FormControl(false)


  })


  getClients(){
    return this.http.get<Client[]>(`${this.ClientsUrl}/getClients`).pipe();
  }


  getOneClient(id: string | number){
    return this.getClients().pipe(
      map((clients: Client[]) => clients.find(client => client._id === id))
    );

  }

  addClient(formData: FormData){
    return this.http.post(`${this.ClientsUrl}/addClient`, formData).subscribe(
      product => console.log(product)
    )
  }

  updateClient(client: FormData){
    const id = client.get('_id');
    const url = `${this.ClientsUrl}/updateClient/${id}`;
    return this.http.put(url, client).subscribe(
      client => console.log(client),
      error => console.log(error)

    )
  }



  deleteClient(client: Client | string){
    const id = typeof client === 'string' ? client : client._id;
    const url = `${this.ClientsUrl}/deleteClient/${id}`;
    return this.http.delete(url).subscribe(
      client => console.log(client),
      error => console.log(error)




      
    )

  }


  searchClient(keyLetter: string): Observable<Client[]>{
    if(!keyLetter.trim()){
      return of([])

    }
    return this.http.get<Client[]>(`${this.ClientsUrl}/searchClient?name=${keyLetter}`).pipe(
      tap(L => L.length ? 
        console.log('found products matching') :
        console.log('No products matching')),
        catchError(this.handleError<Client[]>('searchClient', [])
        )
    )
  }

  populateForm(client: Client){
    this.clientsEditForm.patchValue({
      _id: client._id,
      name: client.name,
      cedula: client.cedula,
      email: client.email,
      phoneNumber: client.phoneNumber
    })
  }

  buyProduct(client, product){
    console.log(product);
    const id = client._id
    const url = `${this.ClientsUrl}/buyProduct/${id}`;
    return this.http.put(url, product).subscribe(
      result => console.log(result),
      error => console.log(error)

    )


  }

  addToCart(client, product){
    const id = client._id
    const url = `${this.ClientsUrl}/addToCart/${id}`;
    return this.http.put(url, product).subscribe(
      
    )

  }





  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
