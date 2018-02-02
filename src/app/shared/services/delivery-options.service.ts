import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DeliveryOption } from '../models/delivery-option.model';
import { CachingServiceBase } from './caching.service';

@Injectable()
export class DeliveryOptionsDataService extends CachingServiceBase {
    private deliveryOptions: Observable<DeliveryOption[]>;

    public constructor(private http: Http) {
        super();
    }

    public all(): Observable<DeliveryOption[]> {
        return this.cache<DeliveryOption[]>(() => this.deliveryOptions,
            (val: Observable<DeliveryOption[]>) => this.deliveryOptions = val,
            () => this.http
                .get('./assets/json/delivery-options.json')
                .map((response) => response.json()
                    .map((item) => {
                        const model = new DeliveryOption();
                        model.updateFrom(item);
                        return model;
                    })));

    }
}
